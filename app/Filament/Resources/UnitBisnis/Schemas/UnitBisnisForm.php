<?php

namespace App\Filament\Resources\UnitBisnis\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UnitBisnisForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_unit_bisnis'),
                Textarea::make('alamat')
                    ->columnSpanFull(),
                TextInput::make('direktur'),
                DatePicker::make('tanggal_berdiri'),
                Toggle::make('is_active'),
            ]);
    }
}
