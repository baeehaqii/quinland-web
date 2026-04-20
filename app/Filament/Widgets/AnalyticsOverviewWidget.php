<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class AnalyticsOverviewWidget extends BaseWidget
{
    protected ?string $pollingInterval = '300s';

    protected static ?int $sort = 2;

    protected function getStats(): array
    {
        try {
            $period = Period::days(30);

            $activeUsers = Analytics::get(
                period: $period,
                metrics: ['activeUsers'],
            )->sum('activeUsers');

            $newUsers = Analytics::get(
                period: $period,
                metrics: ['newUsers'],
            )->sum('newUsers');

            $pageViews = Analytics::get(
                period: $period,
                metrics: ['screenPageViews'],
            )->sum('screenPageViews');

            return [
                Stat::make('Active Users (30 Hari)', number_format($activeUsers))
                    ->description('Total pengguna aktif')
                    ->descriptionIcon('heroicon-m-user-group')
                    ->color('primary'),

                Stat::make('New Users (30 Hari)', number_format($newUsers))
                    ->description('Pengguna baru')
                    ->descriptionIcon('heroicon-m-user-plus')
                    ->color('success'),

                Stat::make('Page Views (30 Hari)', number_format($pageViews))
                    ->description('Total halaman dilihat')
                    ->descriptionIcon('heroicon-m-eye')
                    ->color('info'),
            ];
        } catch (\Throwable $e) {
            return [
                Stat::make('Analytics', 'Error')
                    ->description($e->getMessage())
                    ->color('danger'),
            ];
        }
    }
}
