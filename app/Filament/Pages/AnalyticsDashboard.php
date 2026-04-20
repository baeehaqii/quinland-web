<?php

namespace App\Filament\Pages;

use BackedEnum;
use Filament\Pages\Dashboard;
use App\Filament\Widgets\AnalyticsRealtimeWidget;
use App\Filament\Widgets\AnalyticsOverviewWidget;
use App\Filament\Widgets\AnalyticsByPlatformWidget;
use App\Filament\Widgets\AnalyticsByCityWidget;
use App\Filament\Widgets\AnalyticsTopPagesWidget;

class AnalyticsDashboard extends Dashboard
{
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-presentation-chart-line';
    protected static ?string $navigationLabel = 'Google Analyticss';
    protected static \UnitEnum|string|null $navigationGroup = 'Settings';
    protected static ?string $title = 'Google Analytics Dashboard';

    // Override Dashboard's default '/' path
    protected static string $routePath = 'analytics';

    // Slug is still used for the route NAME
    protected static ?string $slug = 'analytics';

    protected static ?int $navigationSort = 100;

    protected static bool $shouldRegisterNavigation = false;

    public function getColumns(): int|array
    {
        return 2;
    }

    public function getWidgets(): array
    {
        return [
            AnalyticsRealtimeWidget::class,
            AnalyticsOverviewWidget::class,
            AnalyticsByPlatformWidget::class,
            AnalyticsByCityWidget::class,
            AnalyticsTopPagesWidget::class,
        ];
    }
}
