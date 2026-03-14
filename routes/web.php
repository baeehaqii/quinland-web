<?php

use App\Support\Curator\MediaHelper;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $page = \App\Models\Page::where('slug', 'home')->where('is_active', true)->first();

    if ($page && is_array($page->content)) {
        $content = $page->content;
        foreach ($content as &$block) {
            if ($block['type'] === 'hero' && isset($block['data']['slides'])) {
                foreach ($block['data']['slides'] as &$slide) {
                    if (isset($slide['image_id'])) {
                        $media = \Awcodes\Curator\Models\Media::find($slide['image_id']);
                        $slide['image'] = $media ? '/storage/' . $media->path : '/storage/media/hero-bg.jpg';
                    }
                }
            }
        }
        $page->content = $content;
    }

    return Inertia::render('welcome', [
        'page' => $page,
        'media' => [
            'hero_bg_1' => MediaHelper::url('hero-bg', '/storage/media/hero-bg.jpg'),
            'hero_bg_2' => MediaHelper::url('hero-bg-2', '/storage/media/hero-bg-2.jpg'),
            'hero_bg_3' => MediaHelper::url('hero-bg-3', '/storage/media/hero-bg-3.jpg'),
            'about_cover' => MediaHelper::url('about-team', '/storage/media/about-team.jpg'),
            'event_1' => MediaHelper::url('event-1', '/storage/media/event-1.jpg'),
            'event_2' => MediaHelper::url('event-2', '/storage/media/event-2.jpg'),
            'event_3' => MediaHelper::url('event-3', '/storage/media/event-3.jpg'),
            'blog_1' => MediaHelper::url('blog-1', '/storage/media/blog-1.jpg'),
            'blog_2' => MediaHelper::url('blog-2', '/storage/media/blog-2.jpg'),
            'blog_3' => MediaHelper::url('blog-3', '/storage/media/blog-3.jpg'),
            'blog_4' => MediaHelper::url('blog-4', '/storage/media/blog-4.jpg'),
            'property_1' => MediaHelper::url('property-1', '/storage/media/property-1.jpg'),
            'property_2' => MediaHelper::url('property-2', '/storage/media/property-2.jpg'),
            'property_3' => MediaHelper::url('property-3', '/storage/media/property-3.jpg'),
        ],
    ]);
})->name('home');

Route::get('/property', function () {
    // 1. Ambil data page yang slug-nya 'property'
    $page = \App\Models\Page::where('slug', 'property')->where('is_active', true)->first();

    // Fallback jika page tidak ditemukan atau content-nya kosong (mencegah layar "Loading content...")
    if (!$page) {
        $page = (object) [
            'title' => 'Properti Kami',
            'slug' => 'property',
            'content' => [
                [
                    'type' => 'hero',
                    'data' => [
                        'slides' => [
                            [
                                'heading' => 'Temukan Rumah Impian Anda',
                                'tagline' => 'Koleksi properti eksklusif dengan desain modern dan lokasi strategis.',
                                'alt' => 'Hero Slide',
                                'image_url' => '/storage/media/property-hero.jpg'
                            ]
                        ]
                    ]
                ],
                [
                    'type' => 'properties',
                    'data' => [
                        'title' => 'Daftar Properti',
                        'description' => 'Jelajahi berbagai pilihan hunian terbaik dari kami.'
                    ]
                ]
            ]
        ];
    } else if (is_null($page->content) || empty($page->content)) {
        // Jika record Page ada tapi Content-nya null di database
        $page->content = [
            [
                'type' => 'hero',
                'data' => [
                    'slides' => [
                        [
                            'heading' => 'Hunian Eksklusif Quinland',
                            'tagline' => 'Memberikan kenyamanan dan kualitas hidup terbaik bagi keluarga Anda.',
                            'alt' => 'Hero Slide',
                            'image_url' => '/storage/media/property-hero.jpg'
                        ]
                    ]
                ]
            ],
            [
                'type' => 'properties',
                'data' => [
                    'title' => 'Properti Unggulan',
                    'description' => 'Pilihan rumah dengan fasilitas lengkap dan nilai investasi tinggi.'
                ]
            ]
        ];
    }

    // 2. Logic buat narik gambar dari Curator (biar gambarnya muncul, bukan cuma ID)
    if ($page && is_array($page->content)) {
        $content = $page->content;
        foreach ($content as &$block) {
            if ($block['type'] === 'hero' && isset($block['data']['slides'])) {
                foreach ($block['data']['slides'] as &$slide) {
                    if (isset($slide['image_id'])) {
                        $media = \Awcodes\Curator\Models\Media::find($slide['image_id']);
                        $slide['image_url'] = $media ? '/storage/' . $media->path : '/storage/media/property-hero.jpg';
                    }
                }
            }
        }
        $page->content = $content;
    }

    // 3. Ambil juga data properties buat ngerender kartu-kartu rumahnya
    $properties = \App\Models\Property::query()
        ->latest('id')
        ->get()
        ->map(function (\App\Models\Property $property) {
            $images = collect($property->gambar_utama ?? [])
                ->filter(fn($path) => filled($path))
                ->map(fn($path) => ltrim((string) $path, '/'))
                ->values()
                ->all();

            return [
                'id' => (string) $property->id,
                'name' => $property->nama_property ?: 'Property ' . $property->id,
                'location' => $property->alamat ?: '-',
                'slug' => $property->slug ?: \Illuminate\Support\Str::slug((string) ($property->nama_property ?: 'property-' . $property->id)),
                'image' => $images,
                'tipe_rumah' => is_array($property->tipe_rumah) ? $property->tipe_rumah : [],
            ];
        })
        ->values()
        ->all();

    // Tampilkan data dummy jika data real belum ada di database
    if (empty($properties)) {
        $properties = [
            [
                'id' => 1,
                'name' => 'Grand Quinland Residence',
                'location' => 'Jakarta Selatan',
                'slug' => 'grand-quinland-residence',
                'image' => ['media/property-1.jpg'],
                'tipe_rumah' => [['sqft' => 120, 'bedrooms' => 3, 'bathrooms' => 2]]
            ],
            [
                'id' => 2,
                'name' => 'Quinland Garden',
                'location' => 'Bandung, Jawa Barat',
                'slug' => 'quinland-garden',
                'image' => ['media/property-2.jpg'],
                'tipe_rumah' => [['sqft' => 90, 'bedrooms' => 2, 'bathrooms' => 1]]
            ],
            [
                'id' => 3,
                'name' => 'The Quinland Hills',
                'location' => 'Bogor, Jawa Barat',
                'slug' => 'the-quinland-hills',
                'image' => ['media/property-3.jpg'],
                'tipe_rumah' => [['sqft' => 150, 'bedrooms' => 4, 'bathrooms' => 3]]
            ]
        ];
    }

    return Inertia::render('Property', [
        'page' => $page,
        'properties' => $properties
    ]);
})->name('property.index');

Route::get('/property/{slug}', function () {
    $property = \App\Models\Property::query()
        ->where('slug', request()->route('slug'))
        ->firstOrFail();

    $images = collect($property->gambar_utama ?? [])
        ->filter(fn($path) => filled($path))
        ->map(fn($path) => '/storage/' . ltrim((string) $path, '/'))
        ->values()
        ->all();

    if (empty($images)) {
        $images = \Awcodes\Curator\Models\Media::query()
            ->latest('id')
            ->limit(3)
            ->pluck('path')
            ->map(fn($path) => '/storage/' . ltrim((string) $path, '/'))
            ->values()
            ->all();
    }

    $otherProperties = \App\Models\Property::query()
        ->where('id', '!=', $property->id)
        ->latest('id')
        ->limit(3)
        ->get()
        ->map(function (\App\Models\Property $item) {
            return [
                'id' => (string) $item->id,
                'name' => $item->nama_property ?: 'Property ' . $item->id,
                'location' => $item->alamat ?: '-',
                'slug' => $item->slug ?: \Illuminate\Support\Str::slug((string) ($item->nama_property ?: 'property-' . $item->id)),
                'image' => collect($item->gambar_utama ?? [])
                    ->filter(fn($path) => filled($path))
                    ->map(fn($path) => ltrim((string) $path, '/'))
                    ->values()
                    ->all(),
                'tipe_rumah' => is_array($item->tipe_rumah) ? $item->tipe_rumah : [],
            ];
        })
        ->values()
        ->all();

    return Inertia::render('PropertyDetail', [
        'property' => [
            'name' => $property->nama_property ?: 'Property ' . $property->id,
            'slug' => $property->slug ?: \Illuminate\Support\Str::slug((string) ($property->nama_property ?: 'property-' . $property->id)),
            'category' => $property->kategori,
            'price' => $property->harga_mulai ? 'Rp ' . number_format((int) $property->harga_mulai, 0, ',', '.') : '-',
            'images' => $images,
            'description' => $property->deskripsi_property ?: 'Deskripsi properti belum tersedia.',
        ],
        'otherProperties' => $otherProperties,
    ]);
})->name('property.show');

Route::get('/event-csr', function () {
    return Inertia::render('EventCsr', [
        'media' => [
            'event_csr_hero' => MediaHelper::url('event-csr-hero', '/storage/media/event-csr-hero.jpg'),
            'csr_1' => MediaHelper::url('csr-1', '/storage/media/csr-1.jpg'),
            'csr_2' => MediaHelper::url('csr-2', '/storage/media/csr-2.jpg'),
            'csr_3' => MediaHelper::url('csr-3', '/storage/media/csr-3.jpg'),
            'csr_4' => MediaHelper::url('csr-4', '/storage/media/csr-4.jpg'),
            'event_1' => MediaHelper::url('event-1', '/storage/media/event-1.jpg'),
            'event_2' => MediaHelper::url('event-2', '/storage/media/event-2.jpg'),
            'event_3' => MediaHelper::url('event-3', '/storage/media/event-3.jpg'),
        ],
    ]);
})->name('event-csr.index');

Route::get('/about', function () {
    return Inertia::render('About', [
        'media' => [
            'about_hero' => MediaHelper::url('about-hero', '/storage/media/about-hero.jpg'),
            'about_team' => MediaHelper::url('about-team', '/storage/media/about-team.jpg'),
            'office' => MediaHelper::url('office', '/storage/media/office.jpg'),
            'property_1' => MediaHelper::url('property-1', '/storage/media/property-1.jpg'),
            'property_2' => MediaHelper::url('property-2', '/storage/media/property-2.jpg'),
            'property_3' => MediaHelper::url('property-3', '/storage/media/property-3.jpg'),
        ],
    ]);
})->name('about.index');

Route::get('/artikel', function () {
    return Inertia::render('Artikel', [
        'media' => [
            'blog_1' => MediaHelper::url('blog-1', '/storage/media/blog-1.jpg'),
            'blog_2' => MediaHelper::url('blog-2', '/storage/media/blog-2.jpg'),
            'blog_3' => MediaHelper::url('blog-3', '/storage/media/blog-3.jpg'),
            'blog_4' => MediaHelper::url('blog-4', '/storage/media/blog-4.jpg'),
        ],
    ]);
})->name('artikel.index');

Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
