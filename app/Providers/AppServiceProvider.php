<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use App\Jobs\ConvertImageToWebp;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (str_starts_with(config('app.url'), 'https://')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        $this->configureDefaults();

        // Auto-generate React components for Pages
        \App\Models\Page::observe(\App\Observers\PageObserver::class);

        // Auto-convert uploaded images to WebP after save
        $this->registerImageConversion();
    }

    /**
     * Dispatch WebP conversion jobs when image columns are saved.
     * Runs in the background queue so it never slows down the request.
     */
    protected function registerImageConversion(): void
    {
        // [Model class => column name]
        $imageFields = [
            \App\Models\BlogPost::class => 'image',
            \App\Models\BlogCategory::class => 'image',
            \App\Models\Event::class => 'image',
            \App\Models\Csr::class => 'image',
            \App\Models\Partner::class => 'logo',
        ];

        foreach ($imageFields as $modelClass => $column) {
            $modelClass::saved(static function ($model) use ($modelClass, $column) {
                $path = $model->{$column};

                if (!$path || str_ends_with(strtolower($path), '.webp')) {
                    return;
                }

                if ($model->wasRecentlyCreated || $model->wasChanged($column)) {
                    ConvertImageToWebp::dispatch($path, $modelClass, $model->getKey(), $column);
                }
            });
        }
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
