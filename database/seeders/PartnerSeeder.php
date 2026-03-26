<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Partner;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = [
            [
                'name' => 'Bank Jateng',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bank-jateng-QMMxuG7BosLy1zSnB8cy8RiU5FRrg2.png',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Bank Syariah Indonesia',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bsi-G2mI8fIWOgc5zi2gfqwEZqpRPA8zFI.png',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Bank Central Asia',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bca-AfNttX4cBHDcM5LEA3Jz3MMlk1HRYg.png',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Bank Gunung Slamet',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bgs-C2fN1vusGPbW74YaU7aoeJE5523v2o.png',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Bank Syariah Nasional',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bsn-xF3QmMq973UJZfOgBIP7j2JEn6HNUS.png',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Bank Tabungan Negara',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/btn-Tm80F7Md7AOThlTqJh6uXSo7PPxyKx.png',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Bank Rakyat Indonesia',
                'logo' => 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bri-J27QIg8v7oEnl0E7dheUf9vKpwUZs9.png',
                'sort_order' => 7,
                'is_active' => true,
            ],
        ];

        foreach ($partners as $partner) {
            Partner::updateOrCreate(
                ['name' => $partner['name']],
                $partner
            );
        }
    }
}
