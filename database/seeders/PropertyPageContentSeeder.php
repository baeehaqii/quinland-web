<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;
use Awcodes\Curator\Models\Media;

class PropertyPageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyHero = Media::where('name', 'like', '%property-hero%')->first() 
            ?? Media::where('name', 'property-1')->first();

        $content = [
            [
                'type' => 'hero',
                'data' => [
                    'slides' => [
                        [
                            'image_id' => $propertyHero?->id,
                            'alt' => 'Quinland Property Heritage',
                            'tagline' => 'Temukan Properti Kami, Dari Hunian dan Investasi Premium ke Rumah Subsidi, Kami hadir untuk Setiap Tahap kehidupan Anda',
                            'heading' => 'Jelajahi Properti Kami',
                            'cta_label' => 'Lihat Properti',
                            'cta_url' => '#all-properties',
                        ]
                    ]
                ]
            ],
            [
                'type' => 'properties',
                'data' => [
                    'title' => 'Jelajahi Properti Kami',
                    'description' => 'Temukan Properti Kami, Dari Hunian dan Investasi Premium ke Rumah Subsidi, Kami hadir untuk Setiap Tahap kehidupan Anda',
                    'features' => [
                        ['feature' => 'Komersial'],
                        ['feature' => 'FLPP'],
                        ['feature' => 'Mix'],
                    ]
                ]
            ]
        ];

        $page = Page::updateOrCreate(
            ['slug' => 'property'],
            [
                'title' => 'Property',
                'is_active' => true,
                'is_home' => false,
                'content' => $content,
            ]
        );
    }
}
