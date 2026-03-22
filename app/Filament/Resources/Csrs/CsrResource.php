<?php

namespace App\Filament\Resources\Csrs;

use App\Filament\Resources\Csrs\Pages\CreateCsr;
use App\Filament\Resources\Csrs\Pages\EditCsr;
use App\Filament\Resources\Csrs\Pages\ListCsrs;
use App\Filament\Resources\Csrs\Schemas\CsrForm;
use App\Filament\Resources\Csrs\Tables\CsrsTable;
use App\Models\Csr;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CsrResource extends Resource
{
    protected static ?string $model = Csr::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHeart;

    protected static \UnitEnum|string|null $navigationGroup = 'Content';

    public static function form(Schema $schema): Schema
    {
        return CsrForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CsrsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCsrs::route('/'),
            'create' => CreateCsr::route('/create'),
            'edit' => EditCsr::route('/{record}/edit'),
        ];
    }
}
