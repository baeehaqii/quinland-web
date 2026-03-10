<?php

namespace App\Filament\Resources\Menus\Pages;

use App\Filament\Resources\Menus\MenuResource;
use Filament\Resources\Pages\CreateRecord;

class CreateMenu extends CreateRecord
{
    protected static string $resource = MenuResource::class;

    protected function afterCreate(): void
    {
        $menu = $this->record;

        // Cek apakah menu dibuat untuk 'header' (Navbar)
        // Check if the menu is assigned to 'header' (Navbar)
        if (is_array($menu->locations) && in_array('header', $menu->locations)) {
            \App\Models\Page::firstOrCreate(
                ['slug' => $menu->slug],
                [
                    'title' => $menu->name,
                    'content' => null,
                    'is_active' => true,
                ]
            );
        }
    }
}
