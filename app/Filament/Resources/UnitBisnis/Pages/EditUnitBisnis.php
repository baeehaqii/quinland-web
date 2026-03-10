<?php

namespace App\Filament\Resources\UnitBisnis\Pages;

use App\Filament\Resources\UnitBisnis\UnitBisnisResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditUnitBisnis extends EditRecord
{
    protected static string $resource = UnitBisnisResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
