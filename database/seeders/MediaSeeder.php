<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Awcodes\Curator\Models\Media;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sourceDir = public_path('images');
        $destinationDisk = 'public';
        $destinationDir = 'media';
        
        // Ensure destination dir exists
        if (!Storage::disk($destinationDisk)->exists($destinationDir)) {
            Storage::disk($destinationDisk)->makeDirectory($destinationDir);
        }

        if (!File::exists($sourceDir)) {
            $this->command->warn("Directory {$sourceDir} does not exist. Skipping media seeding.");
            return;
        }

        $files = File::files($sourceDir);
        
        foreach ($files as $file) {
            $filename = $file->getFilename();
            $name = pathinfo($filename, PATHINFO_FILENAME);
            $ext = strtolower($file->getExtension());
            
            // Skip non-images
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif'])) {
                continue;
            }

            $size = $file->getSize();
            $mimeType = File::mimeType($file->getPathname());
            
            // Get image dimensions if possible
            $width = null;
            $height = null;
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                $imageSize = @getimagesize($file->getPathname());
                if ($imageSize) {
                    $width = $imageSize[0];
                    $height = $imageSize[1];
                }
            }

            // Copy file to storage
            $destinationPath = $destinationDir . '/' . $filename;
            Storage::disk($destinationDisk)->put($destinationPath, File::get($file->getPathname()));

            // Create or update media record
            Media::updateOrCreate(
                ['name' => $name, 'ext' => $ext],
                [
                    'disk' => $destinationDisk,
                    'directory' => $destinationDir,
                    'visibility' => 'public',
                    'path' => $destinationPath,
                    'width' => $width,
                    'height' => $height,
                    'size' => $size,
                    'type' => $mimeType,
                    'alt' => ucwords(str_replace('-', ' ', $name)),
                    'title' => ucwords(str_replace('-', ' ', $name)),
                ]
            );
        }
        
        $this->command->info('Media library seeded successfully from public/images.');
    }
}
