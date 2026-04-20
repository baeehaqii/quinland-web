<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;

class AnalyticsByPlatformWidget extends ChartWidget
{
    protected ?string $heading = 'Users by Platform (30 Hari)';

    protected ?string $pollingInterval = '300s';

    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 1;

    protected function getData(): array
    {
        try {
            $data = Analytics::get(
                period: Period::days(30),
                metrics: ['activeUsers'],
                dimensions: ['deviceCategory'],
                maxResults: 10,
                orderBy: [OrderBy::metric('activeUsers', true)],
            );

            $labels = $data->pluck('deviceCategory')->map(fn($v) => ucfirst($v))->toArray();
            $values = $data->pluck('activeUsers')->toArray();

            $colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

            return [
                'datasets' => [
                    [
                        'label' => 'Users',
                        'data' => $values,
                        'backgroundColor' => array_slice($colors, 0, count($values)),
                    ],
                ],
                'labels' => $labels,
            ];
        } catch (\Throwable $e) {
            return ['datasets' => [], 'labels' => []];
        }
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
