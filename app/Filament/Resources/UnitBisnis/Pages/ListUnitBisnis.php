<?php

namespace App\Filament\Resources\UnitBisnis\Pages;

use App\Filament\Resources\UnitBisnis\UnitBisnisResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListUnitBisnis extends ListRecords
{
    protected static string $resource = UnitBisnisResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
