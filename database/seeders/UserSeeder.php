<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Zia',
                'email' => 'zia@quinland.co.id',
                'password' => 'Quinland#@',
            ],
            [
                'name' => 'Baehaqi',
                'email' => 'baehaqi@quinland.co.id',
                'password' => 'Quinland#@',
            ],
        ];

        $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'super_admin']);

        foreach ($users as $userData) {
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // Assign role supaya bisa login ke Filament Panel Shield
            $user->assignRole($role);
        }
    }
}

