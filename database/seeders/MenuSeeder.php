<?php

namespace Database\Seeders;

use App\Models\Menu;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::updateOrCreate(
            ['slug' => 'main-menu'],
            [
                'name' => 'Main Menu',
                'locations' => ['header', 'mobile'], // sesuai options di form
                'is_active' => true,
                'items' => [
                    ['label' => 'Home', 'url' => '/', 'target' => '_self', 'is_button' => false],
                    ['label' => 'Property', 'url' => '/property', 'target' => '_self', 'is_button' => false],
                    ['label' => 'Event & CSR', 'url' => '/event-csr', 'target' => '_self', 'is_button' => false],
                    ['label' => 'Artikel', 'url' => '/artikel', 'target' => '_self', 'is_button' => false],
                    ['label' => 'About Us', 'url' => '/about', 'target' => '_self', 'is_button' => false],
                    ['label' => 'Login', 'url' => '/login', 'target' => '_self', 'is_button' => true],
                ],
            ]
        );
    }
}
