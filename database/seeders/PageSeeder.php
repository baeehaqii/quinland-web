<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hero1 = \Awcodes\Curator\Models\Media::where('name', 'hero-bg')->first();
        $hero2 = \Awcodes\Curator\Models\Media::where('name', 'hero-bg-2')->first();
        $hero3 = \Awcodes\Curator\Models\Media::where('name', 'hero-bg-3')->first();
        
        $about_hero = \Awcodes\Curator\Models\Media::where('name', 'like', '%about-hero%')->first();
        $about_team = \Awcodes\Curator\Models\Media::where('name', 'like', '%about-team%')->first();
        $office = \Awcodes\Curator\Models\Media::where('name', 'like', '%office%')->first();

        // Create the initial slides array
        $slides = [];
        if ($hero1) {
            $slides[] = [
                'image_id' => $hero1->id,
                'alt' => 'Modern city skyline with glass skyscrapers',
                'tagline' => 'Buy. Sell. Rent.',
                'heading' => 'Real Estate Done Right',
                'cta_label' => 'Explore Properties',
                'cta_url' => '/property',
            ];
        }
        if ($hero2) {
            $slides[] = [
                'image_id' => $hero2->id,
                'alt' => 'Luxury residential neighborhood with modern houses',
                'tagline' => 'Find Your Dream Home.',
                'heading' => 'Where Comfort Meets Elegance',
                'cta_label' => 'Contact Us',
                'cta_url' => '/about',
            ];
        }
        if ($hero3) {
            $slides[] = [
                'image_id' => $hero3->id,
                'alt' => 'Modern luxury apartment with pool and tropical landscape',
                'tagline' => 'Invest. Grow. Prosper.',
                'heading' => 'Premium Properties Await You',
                'cta_label' => 'View Projects',
                'cta_url' => '/property',
            ];
        }

        $homeContent = [];
        if (count($slides) > 0) {
            $homeContent[] = [
                'type' => 'hero',
                'data' => [
                    'slides' => $slides
                ]
            ];
        }

        $homeContent[] = [
            'type' => 'partners',
            'data' => [
                'title' => 'Kenali Mitra Kami',
                'description' => 'Kami berkolaborasi dengan perbankan terpercaya untuk memberikan solusi pembiayaan yang komprehensif bagi konsumen Kami.',
                'cta_label' => 'Lihat Selengkapnya',
                'cta_url' => '/partners',
            ]
        ];

        $aboutContent = [
            [
                'type' => 'page_hero',
                'data' => [
                    'image_id' => $about_hero?->id ?? $hero1?->id,
                    'title' => 'Quinland',
                    'description' => 'Pengembang properti terpercaya yang menghadirkan hunian berkualitas untuk masyarakat Indonesia',
                ]
            ],
            [
                'type' => 'about_section',
                'data' => [
                    'title' => 'Tentang Kami',
                    'heading' => 'Membangun Masa Depan, Menciptakan Kebahagiaan',
                    'description_1' => 'Quinland adalah perusahaan pengembang properti yang berkomitmen menghadirkan hunian berkualitas untuk masyarakat Indonesia. Sejak berdiri pada tahun 2022, Quinland terus berkembang dengan menghadirkan berbagai proyek perumahan yang dirancang tidak hanya sebagai tempat tinggal, tetapi juga sebagai aset masa depan.',
                    'description_2' => 'Kami percaya bahwa setiap orang berhak memiliki rumah yang layak, nyaman, dan bernilai. Oleh karena itu, Quinland hadir dengan visi besar: menjadi developer properti terpercaya yang menghadirkan hunian berkualitas, inovatif, dan berkelanjutan bagi seluruh lapisan masyarakat.',
                    'stats_years' => '4+',
                    'stats_projects' => '5+',
                    'stats_families' => '1K+',
                    'image_id' => $about_team?->id ?? $hero2?->id,
                ]
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
                            'title' => 'Quality',
                            'description' => 'Quinland Berkomitmen untuk menghadirkan produk perumahan yang berkualitas.'
                        ],
                        [
                            'title' => 'Inovation',
                            'description' => 'Dalam Mengembangkan Produknya, kami mengedapankan inovasi yang menjadikan Unique Selling Point dari produk Perumahan Quinland.'
                        ],
                        [
                            'title' => 'Land',
                            'description' => 'Lahan atau Tanah, sebagai tempat untuk Kami memulai membangun kehidupan yang lebih unggul.'
                        ]
                    ]
                ]
            ],
            [
                'type' => 'office_section',
                'data' => [
                    'section_subtitle' => 'Kantor Kami',
                    'section_heading' => 'Kunjungi Kantor Quinland',
                    'image_id' => $office?->id ?? $hero3?->id,
                    'office_name' => 'Kantor Pusat',
                    'address' => 'Jl. Raya Kediri - Blitar, Setonorejo, Kec. Kras, Kabupaten Kediri, Jawa Timur 64172',
                    'phone' => '+62 812-3456-7890',
                    'email' => 'hello@quinland.co.id',
                    'operational_hours' => 'Senin - Jumat, 08:00 - 17:00 WIB'
                ]
            ]
        ];

        $pages = [
            [
                'title' => 'Home',
                'slug' => 'home',
                'is_active' => true,
                'is_home' => true,
                'content' => $homeContent,
            ],
            [
                'title' => 'Property',
                'slug' => 'property',
                'is_active' => true,
                'is_home' => false,
            ],
            [
                'title' => 'Event & CSR',
                'slug' => 'event-csr',
                'is_active' => true,
                'is_home' => false,
            ],
            [
                'title' => 'Artikel',
                'slug' => 'artikel',
                'is_active' => true,
                'is_home' => false,
            ],
            [
                'title' => 'About Us',
                'slug' => 'about',
                'is_active' => true,
                'is_home' => false,
                'content' => $aboutContent,
            ],
        ];

        foreach ($pages as $page) {
            \App\Models\Page::updateOrCreate(
                ['slug' => $page['slug']],
                [
                    'title' => $page['title'],
                    'is_active' => $page['is_active'],
                    'is_home' => $page['is_home'],
                    'content' => $page['content'] ?? null,
                ]
            );
        }
    }
}
