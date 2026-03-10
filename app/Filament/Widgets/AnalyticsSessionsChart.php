<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;
use Illuminate\Support\Carbon;

class AnalyticsSessionsChart extends ChartWidget
{
    protected ?string $heading = 'Sessions (Last 7 Days)';

    protected ?string $pollingInterval = '60s';

    protected function getData(): array
    {
        try {
            $analyticsData = Analytics::fetchVisitorsAndPageViews(Period::days(7));

            // Expected data structure from Spatie: collection of ['date' => ..., 'visitors' => ..., 'pageViews' => ...]
            // Note: Key names depend on Google Analytics configuration but usually 'date', 'visitors', 'pageViews' with Spatie package presets.

            $dates = $analyticsData->pluck('date')->map(fn($date) => $date->format('M d'));
            $visitors = $analyticsData->pluck('visitors');
            $pageViews = $analyticsData->pluck('pageViews');

            return [
                'datasets' => [
                    [
                        'label' => 'Visitors',
                        'data' => $visitors->toArray(),
                        'borderColor' => '#3b82f6', // blue-500
                        'backgroundColor' => '#3b82f6',
                    ],
                    [
                        'label' => 'Page Views',
                        'data' => $pageViews->toArray(),
                        'borderColor' => '#10b981', // green-500
                        'backgroundColor' => '#10b981',
                    ],
                ],
                'labels' => $dates->toArray(),
            ];
        } catch (\Exception $e) {
            return [
                'datasets' => [],
                'labels' => [],
            ];
        }
    }

    protected function getType(): string
    {
        return 'line';
    }
}
