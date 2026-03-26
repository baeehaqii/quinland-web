<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;
use App\Models\UnitBisnis;
use Illuminate\Support\Str;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ensure a Unit Bisnis exists
        $unitBisnis = UnitBisnis::firstOrCreate(
            ['nama_unit_bisnis' => 'Quinland Development'],
            [
                'alamat' => 'Kediri, Jawa Timur',
                'direktur' => 'Direktur Utama',
                'tanggal_berdiri' => '2022-01-01',
                'is_active' => true,
            ]
        );

        $properties = [
            [
                'nama_property' => 'Quinland Bumiayu',
                'kategori' => 'FLPP',
                'alamat' => 'Bumiayu, Purwokerto',
                'harga_mulai' => 162000000,
                'deskripsi_property' => 'Hunian subsidi (FLPP) berkualitas di kawasan Bumiayu dengan akses mudah ke pusat kota Purwokerto.',
            ],
            [
                'nama_property' => 'Quinland Midtown',
                'kategori' => 'Komersial',
                'alamat' => 'Purwokerto Selatan',
                'harga_mulai' => 450000000,
                'deskripsi_property' => 'Hunian modern dengan desain premium di tengah kota Purwokerto. Cocok untuk investasi dan tempat tinggal eksklusif.',
            ],
            [
                'nama_property' => 'Quinland Village',
                'kategori' => 'Komersial',
                'alamat' => 'Sokaraja, Banyumas',
                'harga_mulai' => 380000000,
                'deskripsi_property' => 'Konsep hunian villa yang asri dan tenang di kawasan Sokaraja, memberikan kenyamanan maksimal bagi keluarga.',
            ],
            [
                'nama_property' => 'Griyaland Sumbang',
                'kategori' => 'FLPP',
                'alamat' => 'Sumbang, Banyumas',
                'harga_mulai' => 162000000,
                'deskripsi_property' => 'Perumahan subsidi yang nyaman dengan lingkungan yang sejuk di kaki gunung Slamet.',
            ],
            [
                'nama_property' => 'Griyaland Kembaran',
                'kategori' => 'FLPP',
                'alamat' => 'Kembaran, Banyumas',
                'harga_mulai' => 162000000,
                'deskripsi_property' => 'Hunian terjangkau dengan kualitas bangunan terjamin di area berkembang Kembaran.',
            ],
        ];

        foreach ($properties as $index => $data) {
            Property::updateOrCreate(
                ['nama_property' => $data['nama_property']],
                array_merge($data, [
                    'unit_bisnis_id' => $unitBisnis->id,
                    'slug' => Str::slug($data['nama_property']),
                    'nama_penanggung_jawab_property' => 'Marketing Quinland',
                    'whatsapp_number' => '6281234567890',
                    'gambar_utama' => ['media/property-' . (($index % 3) + 1) . '.jpg'],
                    'tipe_rumah' => [
                        [
                            'nama_tipe' => 'Tipe 36/72',
                            'luas_bangunan' => 36,
                            'luas_tanah' => 72,
                            'kamar_tidur' => 2,
                            'kamar_mandi' => 1,
                        ]
                    ],
                    'fasilitas_property' => ['Taman Bermain', 'Masjid', 'One Gate System'],
                    'property_progress' => [
                        ['label' => 'Land Clearing', 'percentage' => 100],
                        ['label' => 'Infrastruktur', 'percentage' => 80],
                        ['label' => 'Bangunan', 'percentage' => 40],
                    ],
                ])
            );
        }
    }
}
