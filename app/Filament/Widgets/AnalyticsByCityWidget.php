<?php

namespace App\Filament\Widgets;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
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

    public function table(Table $table): Table
    {
        return $table
            ->records(fn() => $this->getCityData())
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
            ->paginated(false);
    }

    protected function getCityData(): Collection
    {
        try {
            return Analytics::get(
                period: Period::days(30),
                metrics: ['activeUsers'],
                dimensions: ['city'],
                maxResults: 20,
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
}
