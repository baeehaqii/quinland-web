<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ConvertImageToWebp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;

    public int $timeout = 60;

    public function __construct(
        public readonly string $storagePath,
        public readonly string $modelClass,
        public readonly int|string $modelId,
        public readonly string $column,
        public readonly string $disk = 'public',
    ) {
    }

    public function handle(): void
    {
        // Already WebP — nothing to do
        if (str_ends_with(strtolower($this->storagePath), '.webp')) {
            return;
        }

        if (!Storage::disk($this->disk)->exists($this->storagePath)) {
            return;
        }

        $absolutePath = Storage::disk($this->disk)->path($this->storagePath);
        $newRelativePath = preg_replace('/\.[^.]+$/', '.webp', $this->storagePath);
        $newAbsolutePath = Storage::disk($this->disk)->path($newRelativePath);

        try {
            $manager = new ImageManager(new Driver());
            $manager->read($absolutePath)
                ->toWebp(quality: 80)
                ->save($newAbsolutePath);
        } catch (\Throwable $e) {
            logger()->warning('WebP conversion failed', [
                'path' => $this->storagePath,
                'error' => $e->getMessage(),
            ]);

            return;
        }

        // Update the model column and delete the original file
        $model = $this->modelClass::find($this->modelId);

        if ($model && $model->{$this->column} === $this->storagePath) {
            $model->updateQuietly([$this->column => $newRelativePath]);
            Storage::disk($this->disk)->delete($this->storagePath);
        }
    }
}
