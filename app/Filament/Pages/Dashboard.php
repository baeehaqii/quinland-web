<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\SiteStatsWidget;
use App\Filament\Widgets\AnalyticsRealtimeWidget;
use App\Filament\Widgets\AnalyticsOverviewWidget;
use App\Filament\Widgets\AnalyticsByPlatformWidget;
use App\Filament\Widgets\AnalyticsByCityWidget;
use App\Filament\Widgets\AnalyticsTopPagesWidget;
use BackedEnum;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-home';

    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?string $title = 'Dashboard';

    protected static ?int $navigationSort = -1;

    public function getColumns(): int|array
    {
        return 2;
    }

    public function getWidgets(): array
    {
        return [
            SiteStatsWidget::class,
            AnalyticsRealtimeWidget::class,
            AnalyticsOverviewWidget::class,
            AnalyticsByPlatformWidget::class,
            AnalyticsByCityWidget::class,
            AnalyticsTopPagesWidget::class,
        ];
    }
}
