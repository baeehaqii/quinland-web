<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;
use Awcodes\Curator\Models\Media;

class EventCsrPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Try to find the hero image from Curator Media (fallback to first available or null)
        $heroImage = Media::where('name', 'event-csr-hero')->first();
        if (!$heroImage) {
            $heroImage = Media::first();
        }

        $content = [
            [
                'type' => 'page_hero',
                'data' => [
                    'image_id' => $heroImage ? $heroImage->id : null,
                    'title' => 'Event & CSR',
                    'description' => 'Berbagai kegiatan event properti eksklusif dan program tanggung jawab sosial Quinland Grup untuk masyarakat dan lingkungan.',
                ]
            ],
            [
                'type' => 'events',
                'data' => [
                    'title' => 'Special Events',
                    'description' => 'Discover our upcoming special events, from property expos to exclusive launching programs that offer various benefits for you.',
                    'cta_label' => 'See All',
                    'cta_url' => '/events',
                ]
            ],
            [
                'type' => 'csr',
                'data' => [
                    'title' => 'Komitmen Kami untuk Masyarakat',
                    'description' => 'Quinland Grup percaya bahwa pembangunan yang berkelanjutan tidak hanya soal properti, tetapi juga tentang membangun kehidupan yang lebih baik bagi masyarakat sekitar.',
                    'cta_label' => 'Selengkapnya',
                    'cta_url' => '/csr',
                ]
            ]
        ];

        Page::updateOrCreate(
            ['slug' => 'event-csr'],
            [
                'title' => 'Event & CSR',
                'is_active' => true,
                'is_home' => false,
                'content' => $content,
            ]
        );
    }
}
