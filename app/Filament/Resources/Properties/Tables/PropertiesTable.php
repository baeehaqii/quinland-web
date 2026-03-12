<?php

namespace App\Filament\Resources\Properties\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class PropertiesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                // Thumbnail foto pertama dari gambar_utama
                ImageColumn::make('gambar_utama')
                    ->label('Foto')
                    ->disk('public')
                    ->getStateUsing(
                        fn($record) => is_array($record->gambar_utama)
                        ? ($record->gambar_utama[0] ?? null)
                        : null
                    )
                    ->circular(false)
                    ->square(),

                TextColumn::make('nama_property')
                    ->label('Nama Properti')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable()
                    ->copyable()
                    ->color('gray'),

                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Residential' => 'success',
                        'Apartment' => 'info',
                        'Komersial' => 'warning',
                        'Townhouse' => 'primary',
                        'Ruko' => 'gray',
                        default => 'gray',
                    }),

                TextColumn::make('harga_mulai')
                    ->label('Harga Mulai')
                    ->numeric()
                    ->prefix('Rp ')
                    ->formatStateUsing(
                        fn($state) => $state
                        ? number_format($state, 0, ',', '.')
                        : '-'
                    )
                    ->sortable(),

                TextColumn::make('unitBisnis.nama_unit_bisnis')
                    ->label('Unit Bisnis')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('nama_penanggung_jawab_property')
                    ->label('PIC')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Diperbarui')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('kategori')
                    ->label('Kategori')
                    ->options([
                        'Residential' => 'Residential',
                        'Apartment' => 'Apartment',
                        'Komersial' => 'Komersial',
                        'Townhouse' => 'Townhouse',
                        'Ruko' => 'Ruko',
                    ]),

                SelectFilter::make('unit_bisnis_id')
                    ->label('Unit Bisnis')
                    ->relationship('unitBisnis', 'nama_unit_bisnis'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
