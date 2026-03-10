<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;
use Illuminate\Support\Carbon;

class AnalyticsStatsOverview extends BaseWidget
{
    protected ?string $pollingInterval = '60s';

    protected function getStats(): array
    {
        try {
            // Fetch data for the last 7 days
            $analyticsData = Analytics::fetchVisitorsAndPageViews(Period::days(7));

            // Calculate totals
            $totalVisitors = $analyticsData->sum('visitors');
            $totalPageViews = $analyticsData->sum('pageViews');
            $activeUsers = $analyticsData->sum('activeUsers') ?? 0; // if available in structure

            // Get previous period for comparison (last 7 days vs previous 7 days)
            // Implementation of comparison logic is complex without fetching separate data, 
            // generally analytics package supports basic fetch.

            return [
                Stat::make('Visitors (7 Days)', number_format($totalVisitors))
                    ->description('Total unique visitors')
                    ->descriptionIcon('heroicon-m-user-group')
                    ->color('primary'),

                Stat::make('Page Views (7 Days)', number_format($totalPageViews))
                    ->description('Total page views')
                    ->descriptionIcon('heroicon-m-eye')
                    ->color('success'),

                // Add more stats if API supports it easily, otherwise stick to basic
            ];
        } catch (\Exception $e) {
            // Fallback if analytics content is not configured
            return [
                Stat::make('Analytics Error', 'Not Configured')
                    ->description('Check your Google Analytics credentials')
                    ->color('danger'),
            ];
        }
    }
}
