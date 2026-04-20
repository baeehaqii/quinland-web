<?php

namespace App\Filament\Widgets;

use App\Models\BlogPost;
use App\Models\Booking;
use App\Models\Property;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SiteStatsWidget extends BaseWidget
{
    protected ?string $pollingInterval = '60s';

    protected static ?int $sort = 1;

    protected int|string|array $columnSpan = 'full';

    protected function getStats(): array
    {
        $totalProperties = Property::count();
        $totalPublished = BlogPost::published()->count();
        $totalBookings = Booking::count();
        $bookingsThisMonth = Booking::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        return [
            Stat::make('Total Property', number_format($totalProperties))
                ->description('Semua property terdaftar')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary'),

            Stat::make('Artikel Dipublish', number_format($totalPublished))
                ->description('Blog post aktif')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success'),

            Stat::make('Total Booking', number_format($totalBookings))
                ->description($bookingsThisMonth . ' booking bulan ini')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('warning'),
        ];
    }
}
