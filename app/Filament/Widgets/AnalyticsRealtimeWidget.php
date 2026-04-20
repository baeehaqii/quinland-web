<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\MinuteRange;
use Google\Analytics\Data\V1beta\RunRealtimeReportRequest;
use Spatie\Analytics\AnalyticsClient;

class AnalyticsRealtimeWidget extends BaseWidget
{
    protected ?string $pollingInterval = '30s';

    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        try {
            $client = app(AnalyticsClient::class);
            $propertyId = config('analytics.property_id');

            // Active users last 29 minutes (Standard GA4 max = 29)
            $response30 = $client->runRealtimeReport([
                'property' => "properties/{$propertyId}",
                'minute_ranges' => [(new MinuteRange)->setStartMinutesAgo(29)->setEndMinutesAgo(0)],
                'metrics' => [new Metric(['name' => 'activeUsers'])],
            ]);

            $active30 = 0;
            foreach ($response30->getRows() as $row) {
                $active30 += (int) $row->getMetricValues()[0]->getValue();
            }

            // Active users last 5 minutes
            $response5 = $client->runRealtimeReport([
                'property' => "properties/{$propertyId}",
                'minute_ranges' => [(new MinuteRange)->setStartMinutesAgo(5)->setEndMinutesAgo(0)],
                'metrics' => [new Metric(['name' => 'activeUsers'])],
            ]);

            $active5 = 0;
            foreach ($response5->getRows() as $row) {
                $active5 += (int) $row->getMetricValues()[0]->getValue();
            }

            return [
                Stat::make('Aktif (30 Menit)', (string) $active30)
                    ->description('Pengguna aktif ~30 menit terakhir')
                    ->descriptionIcon('heroicon-m-signal')
                    ->color($active30 > 0 ? 'success' : 'gray'),

                Stat::make('Aktif (5 Menit)', (string) $active5)
                    ->description('Pengguna aktif 5 menit terakhir')
                    ->descriptionIcon('heroicon-m-bolt')
                    ->color($active5 > 0 ? 'warning' : 'gray'),
            ];
        } catch (\Throwable $e) {
            return [
                Stat::make('Realtime', 'Error')
                    ->description($e->getMessage())
                    ->color('danger'),
            ];
        }
    }
}
