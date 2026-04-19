<?php

namespace App\Filament\Pages;

use BackedEnum;
use Filament\Pages\Dashboard;
use App\Filament\Widgets\AnalyticsStatsOverview;
use App\Filament\Widgets\AnalyticsSessionsChart;

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

    public function getWidgets(): array
    {
        return [
            AnalyticsStatsOverview::class,
            AnalyticsSessionsChart::class,
        ];
    }
}
