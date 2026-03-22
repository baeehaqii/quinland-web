<?php

namespace App\Filament\Resources\UnitBisnis;

use App\Filament\Resources\UnitBisnis\Pages\CreateUnitBisnis;
use App\Filament\Resources\UnitBisnis\Pages\EditUnitBisnis;
use App\Filament\Resources\UnitBisnis\Pages\ListUnitBisnis;
use App\Filament\Resources\UnitBisnis\Schemas\UnitBisnisForm;
use App\Filament\Resources\UnitBisnis\Tables\UnitBisnisTable;
use App\Models\UnitBisnis;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class UnitBisnisResource extends Resource
{
    protected static ?string $model = UnitBisnis::class;

    protected static string | BackedEnum | null $navigationIcon = Heroicon::OutlinedBuildingOffice2;

    protected static string | UnitEnum | null $navigationGroup = 'Master Data';

    public static function form(Schema $schema): Schema
    {
        return UnitBisnisForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UnitBisnisTable::configure($table);
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
            'index' => ListUnitBisnis::route('/'),
            'create' => CreateUnitBisnis::route('/create'),
            'edit' => EditUnitBisnis::route('/{record}/edit'),
        ];
    }
}
