<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Property;
use App\Models\UnitBisnis;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        // Hapus data lama
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Property::truncate();
        UnitBisnis::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // ─── Unit Bisnis ───────────────────────────────────────────────
        $zahindo = UnitBisnis::create([
            'nama_unit_bisnis' => 'PT. Zahindo Properti Sukses',
            'alamat'           => 'Jl. Rumono No.29 RT.02/RW.02, Desa Jatisawit, Kecamatan Bumiayu, Brebes',
            'direktur'         => 'Zaldy Musa Muzaky, S.E.',
            'tanggal_berdiri'  => '2022-01-01',
            'is_active'        => true,
        ]);

        $bumikarta = UnitBisnis::create([
            'nama_unit_bisnis' => 'PT. Bumikarta Inti Nusa',
            'alamat'           => 'Perumahan Sapphire Regency, Blok P1, Kel. Kalierang, Kec. Bumiayu, Brebes',
            'direktur'         => 'Zaldy Musa Muzaky, S.E.',
            'tanggal_berdiri'  => '2023-02-09',
            'is_active'        => true,
        ]);

        $zamzami = UnitBisnis::create([
            'nama_unit_bisnis' => 'PT. Zamzami Abadi Properti',
            'alamat'           => 'Jln. Pangeran Diponegoro No.413, RT.02/RW.02, Desa Kalierang, Kecamatan Bumiayu, Brebes',
            'direktur'         => 'Zaldy Musa Muzaky, S.E.',
            'tanggal_berdiri'  => '2024-01-01',
            'is_active'        => true,
        ]);

        // ─── Properties ────────────────────────────────────────────────
        $properties = [

            // 1. Quinland (2022) — PT. Zahindo Properti Sukses
            [
                'unit_bisnis_id'                  => $zahindo->id,
                'nama_property'                   => 'Quinland',
                'slug'                            => 'quinland',
                'kategori'                        => 'Komersial',
                'nama_penanggung_jawab_property'  => 'Marketing Quinland',
                'whatsapp_number'                 => '6281219166606',
                'harga_mulai'                     => 350000000,
                'alamat'                          => 'Jl. Rumono RT 6 RW 2, Jatisawit, Kec. Bumiayu, Brebes',
                'deskripsi_property'              => 'Proyek perdana Quinland Group yang hadir sejak 2022. Hunian modern dengan konsep one gate system di kawasan Jatisawit, Bumiayu. Luas lahan 3.993 m² dengan total 22 unit eksklusif.',
                'promo_unit_rumah'                => 'Sisa 1 unit! Segera miliki hunian terbaik di kawasan Bumiayu.',
                'fasilitas_property'              => [
                    'One Gate System',
                    'Security 24 Jam',
                    'Barrier Gate',
                    'CCTV',
                    'Gazebo',
                ],
                'tipe_rumah'                      => [
                    [
                        'nama_tipe'     => 'Tipe 45/98',
                        'luas_bangunan' => 45,
                        'luas_tanah'    => 98,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 54/112',
                        'luas_bangunan' => 54,
                        'luas_tanah'    => 112,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                ],
                'property_progress' => [
                    ['label' => 'Land Clearing',  'percentage' => 100],
                    ['label' => 'Infrastruktur',   'percentage' => 100],
                    ['label' => 'Bangunan',        'percentage' => 100],
                ],
                'gambar_utama' => [],
            ],

            // 2. Quinland Village (2023) — PT. Bumikarta Inti Nusa
            [
                'unit_bisnis_id'                  => $bumikarta->id,
                'nama_property'                   => 'Quinland Village',
                'slug'                            => 'quinland-village',
                'kategori'                        => 'Komersial',
                'nama_penanggung_jawab_property'  => 'Marketing Quinland',
                'whatsapp_number'                 => '6281219166606',
                'harga_mulai'                     => 200000000,
                'alamat'                          => 'Karangdempul RT 05, RW 07, Desa Jatisawit, Bumiayu, Brebes',
                'deskripsi_property'              => 'Quinland Village hadir di 2023 dengan total 106 unit hunian di atas lahan seluas 13.997 m². Dilengkapi fasilitas lengkap: masjid, playground, dan kolam renang anak untuk kenyamanan seluruh keluarga.',
                'promo_unit_rumah'                => 'Sisa 23 unit! Miliki hunian impian dengan fasilitas lengkap di Quinland Village.',
                'fasilitas_property'              => [
                    'One Gate System',
                    'Security 24 Jam',
                    'Barrier Gate',
                    'CCTV',
                    'Gazebo',
                    'Masjid',
                    'Playground',
                    'Kolam Renang Anak',
                ],
                'tipe_rumah'                      => [
                    [
                        'nama_tipe'     => 'Tipe 32/60',
                        'luas_bangunan' => 32,
                        'luas_tanah'    => 60,
                        'kamar_tidur'   => 2,
                        'kamar_mandi'   => 1,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 32/72',
                        'luas_bangunan' => 32,
                        'luas_tanah'    => 72,
                        'kamar_tidur'   => 2,
                        'kamar_mandi'   => 1,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 40/72',
                        'luas_bangunan' => 40,
                        'luas_tanah'    => 72,
                        'kamar_tidur'   => 2,
                        'kamar_mandi'   => 1,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 50/84',
                        'luas_bangunan' => 50,
                        'luas_tanah'    => 84,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 50/91',
                        'luas_bangunan' => 50,
                        'luas_tanah'    => 91,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                ],
                'property_progress' => [
                    ['label' => 'Land Clearing',  'percentage' => 100],
                    ['label' => 'Infrastruktur',   'percentage' => 100],
                    ['label' => 'Bangunan',        'percentage' => 90],
                ],
                'gambar_utama' => [],
            ],

            // 3. Quinland Midtown (2024) — PT. Zamzami Abadi Properti
            [
                'unit_bisnis_id'                  => $zamzami->id,
                'nama_property'                   => 'Quinland Midtown',
                'slug'                            => 'quinland-midtown',
                'kategori'                        => 'Komersial',
                'nama_penanggung_jawab_property'  => 'Marketing Quinland',
                'whatsapp_number'                 => '6281219166606',
                'harga_mulai'                     => 450000000,
                'alamat'                          => 'Jl. Rumono RT 6 RW 2, Jatisawit, Kec. Bumiayu, Brebes',
                'deskripsi_property'              => 'Quinland Midtown menghadirkan konsep hunian eksklusif 1 lantai mezzanine bergaya European Classic di 2024. Total 24 unit premium di atas lahan 3.490 m² dengan desain modern dan ruang terbuka hijau yang asri.',
                'promo_unit_rumah'                => 'Sisa 18 unit! Hunian eksklusif konsep mezzanine bergaya European Classic.',
                'fasilitas_property'              => [
                    'One Gate System',
                    'Security 24 Jam',
                    'CCTV',
                    'Ruang Terbuka Hijau',
                ],
                'tipe_rumah'                      => [
                    [
                        'nama_tipe'     => 'Tipe 50/84',
                        'luas_bangunan' => 50,
                        'luas_tanah'    => 84,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 64/84',
                        'luas_bangunan' => 64,
                        'luas_tanah'    => 84,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 64/93',
                        'luas_bangunan' => 64,
                        'luas_tanah'    => 93,
                        'kamar_tidur'   => 3,
                        'kamar_mandi'   => 2,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 86/96',
                        'luas_bangunan' => 86,
                        'luas_tanah'    => 96,
                        'kamar_tidur'   => 4,
                        'kamar_mandi'   => 3,
                    ],
                ],
                'property_progress' => [
                    ['label' => 'Land Clearing',  'percentage' => 100],
                    ['label' => 'Infrastruktur',   'percentage' => 100],
                    ['label' => 'Bangunan',        'percentage' => 75],
                ],
                'gambar_utama' => [],
            ],

            // 4. GriyaLand Sumbang (2025) — PT. Bumikarta Inti Nusa
            [
                'unit_bisnis_id'                  => $bumikarta->id,
                'nama_property'                   => 'GriyaLand Sumbang',
                'slug'                            => 'griyaland-sumbang',
                'kategori'                        => 'FLPP',
                'nama_penanggung_jawab_property'  => 'Marketing Quinland',
                'whatsapp_number'                 => '6281219166606',
                'harga_mulai'                     => 162000000,
                'alamat'                          => 'Jl. Raya Baturaden Timur, Desa Banteran RT 05/RW 07, Sumbang, Kabupaten Banyumas',
                'deskripsi_property'              => 'GriyaLand Sumbang hadir sebagai solusi hunian terjangkau (FLPP) di kawasan strategis Sumbang, Banyumas. Total 146 unit di lahan 16.033 m² dengan lingkungan yang sejuk dan akses mudah ke Purwokerto.',
                'promo_unit_rumah'                => 'Sisa 10 unit! Hunian subsidi berkualitas di kawasan Sumbang, Banyumas.',
                'fasilitas_property'              => [
                    'One Gate System',
                    'Security 24 Jam',
                    'CCTV',
                ],
                'tipe_rumah'                      => [
                    [
                        'nama_tipe'     => 'Tipe 30/60',
                        'luas_bangunan' => 30,
                        'luas_tanah'    => 60,
                        'kamar_tidur'   => 2,
                        'kamar_mandi'   => 1,
                    ],
                    [
                        'nama_tipe'     => 'Tipe 36/64',
                        'luas_bangunan' => 36,
                        'luas_tanah'    => 64,
                        'kamar_tidur'   => 2,
                        'kamar_mandi'   => 1,
                    ],
                ],
                'property_progress' => [
                    ['label' => 'Land Clearing',  'percentage' => 100],
                    ['label' => 'Infrastruktur',   'percentage' => 80],
                    ['label' => 'Bangunan',        'percentage' => 50],
                ],
                'gambar_utama' => [],
            ],

            // 5. GriyaLand Kembaran (2026, Coming Soon) — PT. Zahindo Properti Sukses
            [
                'unit_bisnis_id'                  => $zahindo->id,
                'nama_property'                   => 'GriyaLand Kembaran',
                'slug'                            => 'griyaland-kembaran',
                'kategori'                        => 'FLPP',
                'nama_penanggung_jawab_property'  => 'Marketing Quinland',
                'whatsapp_number'                 => '6281219166606',
                'harga_mulai'                     => 162000000,
                'alamat'                          => 'Desa Bantarwuni, Kecamatan Kembaran, Kabupaten Banyumas',
                'deskripsi_property'              => 'GriyaLand Kembaran adalah proyek terbaru Quinland Group yang akan hadir di 2026. Berlokasi strategis di Desa Bantarwuni, Kecamatan Kembaran, Banyumas dengan luas lahan 20.713 m² dan rencana 197 unit hunian berkualitas.',
                'promo_unit_rumah'                => 'Coming Soon 2026! Daftarkan minat Anda sekarang dan dapatkan penawaran perdana.',
                'fasilitas_property'              => [
                    'One Gate System',
                    'Security 24 Jam',
                    'CCTV',
                ],
                'tipe_rumah'                      => [],
                'property_progress' => [
                    ['label' => 'Perencanaan', 'percentage' => 100],
                    ['label' => 'Perizinan',   'percentage' => 80],
                    ['label' => 'Konstruksi',  'percentage' => 0],
                ],
                'gambar_utama' => [],
            ],
        ];

        foreach ($properties as $data) {
            Property::create($data);
        }
    }
}
