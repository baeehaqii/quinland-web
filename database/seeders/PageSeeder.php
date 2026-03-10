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
