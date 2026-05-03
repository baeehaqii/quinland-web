<?php

namespace App\Filament\Widgets;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Collection;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;

class AnalyticsTopPagesWidget extends BaseWidget
{
    protected static ?string $heading = 'Views by Page (30 Hari)';

    protected ?string $pollingInterval = '300s';

    protected static ?int $sort = 5;

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->records(fn() => $this->getPageData())
            ->columns([
                Tables\Columns\TextColumn::make('rank')
                    ->label('#')
                    ->width('40px'),
                Tables\Columns\TextColumn::make('pageTitle')
                    ->label('Halaman'),
                Tables\Columns\TextColumn::make('pagePath')
                    ->label('Path')
                    ->color('gray'),
                Tables\Columns\TextColumn::make('screenPageViews')
                    ->label('Views')
                    ->numeric(),
                Tables\Columns\TextColumn::make('activeUsers')
                    ->label('Users')
                    ->numeric(),
            ])
            ->paginated([5, 10, 25])
            ->defaultPaginationPageOption(5);
    }

    protected function getPageData(): Collection
    {
        try {
            return Analytics::get(
                period: Period::days(30),
                metrics: ['screenPageViews', 'activeUsers'],
                dimensions: ['pageTitle', 'pagePath'],
                maxResults: 25,
                orderBy: [OrderBy::metric('screenPageViews', true)],
            )
                ->values()
                ->map(fn($row, $index) => [
                    'id' => $index + 1,
                    'rank' => $index + 1,
                    'pageTitle' => $row['pageTitle'] ?? '-',
                    'pagePath' => $row['pagePath'] ?? '-',
                    'screenPageViews' => $row['screenPageViews'] ?? 0,
                    'activeUsers' => $row['activeUsers'] ?? 0,
                ]);
        } catch (\Throwable $e) {
            return collect();
        }
    }
}
