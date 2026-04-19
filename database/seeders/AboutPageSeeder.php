<?php

namespace Database\Seeders;

use App\Models\Page;
use Awcodes\Curator\Models\Media;
use Illuminate\Database\Seeder;

class AboutPageSeeder extends Seeder
{
    public function run(): void
    {
        $findMediaId = function (array $keywords): ?int {
            $query = Media::query();

            $query->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->orWhere('name', 'like', "%{$keyword}%")
                        ->orWhere('path', 'like', "%{$keyword}%");
                }
            });

            return $query->latest('id')->value('id');
        };

        $aboutHeroId = $findMediaId(['about-hero', 'about_hero']);
        $aboutTeamId = $findMediaId(['about-team', 'about_team']);
        $officeId = $findMediaId(['office', 'kantor']);

        $aboutContent = [
            [
                'type' => 'page_hero',
                'data' => [
                    'image_id' => $aboutHeroId,
                    'title' => 'Tentang Quinland Group',
                    'description' => 'Developer properti terpercaya yang menghadirkan hunian berkualitas, inovatif, dan berkelanjutan bagi seluruh lapisan masyarakat.',
                ],
            ],
            [
                'type' => 'about_section',
                'data' => [
                    'title' => 'Tentang Kami',
                    'heading' => 'For a Better Life',
                    'description_1' => 'Quinland Group adalah perusahaan pengembang properti yang didirikan oleh Zaldy Musa Muzaky, S.E. pada tahun 2022. Berawal dari bisnis ritel elektronik dan penjualan tempat tidur sejak 2013 yang berhasil menguasai wilayah Brebes bagian selatan, Quinland kini hadir sebagai developer properti terpercaya di Jawa Tengah.',
                    'description_2' => '"For a Better Life" adalah komitmen kami untuk menghadirkan hunian yang tidak hanya layak secara fisik, tetapi juga mendukung kualitas hidup yang lebih baik. Melalui lokasi strategis, desain fungsional, kualitas bangunan terpercaya, dan lingkungan nyaman - kami percaya rumah adalah fondasi untuk tumbuh, bermimpi, dan menjalani hidup yang lebih bermakna.',
                    'stats_years' => '4+',
                    'stats_projects' => '5',
                    'stats_families' => '495+',
                    'image_id' => $aboutTeamId,
                ],
            ],
            [
                'type' => 'vision_mission',
                'data' => [
                    'section_subtitle' => 'Visi & Misi',
                    'section_heading' => 'Landasan Kami Berkarya',
                    'vision_title' => 'Visi Kami',
                    'vision_description' => 'Menjadi developer properti terpercaya yang menghadirkan hunian berkualitas, inovatif, dan berkelanjutan bagi seluruh lapisan masyarakat.',
                    'mission_title' => 'Misi Kami',
                    'missions' => [
                        [
                            'description' => 'Mengembangkan hunian yang berkualitas tinggi dengan mengutamakan kenyamanan, keamanan, dan standar konstruksi terbaik.',
                        ],
                        [
                            'description' => 'Mendorong inovasi dalam desain, teknologi bangunan, dan layanan untuk menciptakan pengalaman tinggal yang modern dan fungsional.',
                        ],
                        [
                            'description' => 'Mewujudkan pembangunan berkelanjutan melalui penggunaan material ramah lingkungan, efisiensi energi, serta tata ruang yang memperhatikan ekosistem.',
                        ],
                    ],
                ],
            ],
            [
                'type' => 'office_section',
                'data' => [
                    'section_subtitle' => 'Kantor Kami',
                    'section_heading' => 'Kunjungi Kantor Quinland',
                    'image_id' => $officeId,
                    'office_name' => 'Quinland Group',
                    'address' => 'Jl. Rumono RT 6 RW 2, Jatisawit, Kec. Bumiayu, Kab. Brebes, Jawa Tengah',
                    'phone' => '+62 812-3456-7890',
                    'email' => 'hello@quinland.co.id',
                    'operational_hours' => 'Senin - Jumat, 08:00 - 17:00 WIB',
                ],
            ],
        ];

        Page::updateOrCreate(
            ['slug' => 'about'],
            [
                'title' => 'About Us',
                'is_active' => true,
                'is_home' => false,
                'content' => $aboutContent,
            ],
        );
    }
}
