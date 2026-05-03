<?php

namespace App\Filament\Widgets;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;

class AnalyticsByCityWidget extends BaseWidget
{
    protected static ?string $heading = 'Users by City (30 Hari)';

    protected ?string $pollingInterval = '300s';

    protected static ?int $sort = 4;

    protected int|string|array $columnSpan = 1;

    protected string|int|null $defaultTableRecordsPerPageSelectOption = 5;

    public function table(Table $table): Table
    {
        return $table
            ->records(fn() => $this->getPaginatedCityData())
            ->columns([
                Tables\Columns\TextColumn::make('rank')
                    ->label('#')
                    ->width('40px'),
                Tables\Columns\TextColumn::make('city')
                    ->label('Kota'),
                Tables\Columns\TextColumn::make('activeUsers')
                    ->label('Users')
                    ->numeric(),
            ])
            ->paginated([5, 10, 20]);
    }

    protected function getCityData(): Collection
    {
        try {
            return Analytics::get(
                period: Period::days(30),
                metrics: ['activeUsers'],
                dimensions: ['city'],
                maxResults: 50,
                orderBy: [OrderBy::metric('activeUsers', true)],
            )
                ->filter(fn($row) => $row['city'] !== '(not set)')
                ->values()
                ->map(fn($row, $index) => [
                    'id' => $index + 1,
                    'rank' => $index + 1,
                    'city' => $row['city'],
                    'activeUsers' => $row['activeUsers'],
                ]);
        } catch (\Throwable $e) {
            return collect();
        }
    }

    protected function getPaginatedCityData(): LengthAwarePaginator
    {
        $all = $this->getCityData();
        $perPage = $this->getTableRecordsPerPage() ?: 5;
        $page = $this->getTablePage();

        return new LengthAwarePaginator(
            items: $all->forPage($page, $perPage)->values(),
            total: $all->count(),
            perPage: $perPage,
            currentPage: $page,
        );
    }
}
