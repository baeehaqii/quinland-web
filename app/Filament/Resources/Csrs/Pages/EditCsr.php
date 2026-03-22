<?php

namespace App\Filament\Resources\Csrs\Pages;

use App\Filament\Resources\Csrs\CsrResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCsr extends EditRecord
{
    protected static string $resource = CsrResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
