<?php

namespace App\Filament\Resources\Csrs\Pages;

use App\Filament\Resources\Csrs\CsrResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCsrs extends ListRecords
{
    protected static string $resource = CsrResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
