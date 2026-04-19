<?php

namespace App\Providers\Filament;

use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;

use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class OfficePanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        $primaryColor = Color::Amber;
        $brandName = config('app.name');
        $brandLogo = null;
        $panelFavicon = asset('favicon.ico');

        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
                $settings = app(\App\Settings\GeneralSettings::class);
                $brandName = $settings->site_name ?: config('app.name');
                if ($settings->site_logo) {
                    $brandLogo = asset('storage/' . $settings->site_logo);
                }
                if ($settings->site_favicon) {
                    $panelFavicon = asset('storage/' . ltrim((string) $settings->site_favicon, '/'));
                }
                if ($settings->theme_color) {
                    $primaryColor = $settings->theme_color;
                }
            }
        } catch (\Throwable $e) {
            // Fail silently if settings table or class not ready
        }

        return $panel
            ->default()
            ->id('office')
            ->path('office')
            ->login()
            ->favicon($panelFavicon)
            ->brandName($brandName)
            ->brandLogo($brandLogo)
            ->brandLogoHeight('3rem')
            ->colors([
                'primary' => $primaryColor,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                //
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->plugins([
                FilamentShieldPlugin::make()
                    ->navigationGroup('Akses Management')
                    ->navigationSort(99),
                \Awcodes\Curator\CuratorPlugin::make()
                    ->label('Media')
                    ->pluralLabel('Media Library')
                    ->navigationGroup('Content')
                    ->navigationSort(10),
            ]);
    }
}


