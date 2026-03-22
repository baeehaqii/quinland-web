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
        'csrs' => \App\Models\Csr::where('is_published', true)->orderBy('date', 'desc')->get()->map(function($csr) {
            return [
                'id' => $csr->id,
                'title' => $csr->title,
                'description' => $csr->description,
                'image' => $csr->image ? '/storage/' . ltrim($csr->image, '/') : null,
                'date' => $csr->date ? $csr->date->format('M Y') : 'Ongoing',
                'category' => 'Program CSR'
            ];
        })
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

Route::get('/event-csr/{type}/{slug}', function ($type, $slug) {
    if ($type === 'event') {
        $model = \App\Models\Event::where('slug', $slug)->first();
        if ($model) {
            $latest = \App\Models\Event::where('is_published', true)->where('id', '!=', $model->id)->latest('event_date')->limit(3)->get();
            $item = [
                'id' => $model->id,
                'title' => $model->title,
                'description' => $model->description,
                'content' => $model->content,
                'image' => $model->image ? '/storage/' . ltrim($model->image, '/') : null,
                'date' => $model->event_date ? $model->event_date->format('M d, Y') : '-',
                'category' => 'Event',
                'slug' => $model->slug
            ];
            $latestItems = $latest->map(function($m) {
                return [
                    'id' => $m->id,
                    'title' => $m->title,
                    'description' => $m->description,
                    'image' => $m->image ? '/storage/' . ltrim($m->image, '/') : null,
                    'date' => $m->event_date ? $m->event_date->format('M d, Y') : '-',
                    'category' => 'Event',
                    'slug' => $m->slug
                ];
            })->toArray();
        } else {
            // Dummy Fallback
            $dummyEvents = [
                ['id' => 1, 'title' => "BCA Expoversary", 'description' => "Temukan promo eksklusif Sinar Mas Land di BCA Expoversary 2026. Dapatkan diskon, DP ringan, bunga rendah, dan hadiah menarik untuk properti impian Anda.", 'image' => "/storage/media/event-1.jpg", 'date' => "28 Feb 2026", 'category' => 'Event', 'slug' => "1", 'content' => '<p>Temukan promo eksklusif Sinar Mas Land di BCA Expoversary 2026. Dapatkan diskon, DP ringan, bunga rendah, dan hadiah menarik untuk properti impian Anda.</p>'],
                ['id' => 2, 'title' => "BRI Expo", 'description' => "Temukan properti impian lebih mudah di BRI Expo 2025. Sinar Mas Land hadir dengan kemudahan dan promo menarik untuk hunian keluarga Anda.", 'image' => "/storage/media/event-2.jpg", 'date' => "31 Agt 2025", 'category' => 'Event', 'slug' => "2", 'content' => '<p>Temukan properti impian lebih mudah di BRI Expo 2025. Sinar Mas Land hadir dengan kemudahan dan promo menarik untuk hunian keluarga Anda.</p>'],
                ['id' => 3, 'title' => "BNI EXPO", 'description' => "Temukan hunian impian di BNI wondrX 2025 bersama Sinar Mas Land. Nikmati promo eksklusif, bunga rendah, cashback, dan lucky draw menarik!", 'image' => "/storage/media/event-3.jpg", 'date' => "17 Agt 2025", 'category' => 'Event', 'slug' => "3", 'content' => '<p>Temukan hunian impian di BNI wondrX 2025 bersama Sinar Mas Land. Nikmati promo eksklusif, bunga rendah, cashback, dan lucky draw menarik!</p>']
            ];
            $item = collect($dummyEvents)->filter(fn($e) => (string)$e['id'] === $slug || $e['slug'] === $slug)->first();
            if (!$item) abort(404);
            $latestItems = collect($dummyEvents)->where('id', '!=', $item['id'])->take(3)->values()->toArray();
        }
    } else {
        $model = \App\Models\Csr::where('slug', $slug)->first();
        if ($model) {
            $latest = \App\Models\Csr::where('is_published', true)->where('id', '!=', $model->id)->latest('date')->limit(3)->get();
            $item = [
                'id' => $model->id,
                'title' => $model->title,
                'description' => $model->description,
                'content' => $model->content,
                'image' => $model->image ? '/storage/' . ltrim($model->image, '/') : null,
                'date' => $model->date ? $model->date->format('M Y') : 'Ongoing',
                'category' => 'CSR',
                'slug' => $model->slug
            ];
            $latestItems = $latest->map(function($m) {
                return [
                    'id' => $m->id,
                    'title' => $m->title,
                    'description' => $m->description,
                    'image' => $m->image ? '/storage/' . ltrim($m->image, '/') : null,
                    'date' => $m->date ? $m->date->format('M Y') : 'Ongoing',
                    'category' => 'CSR',
                    'slug' => $m->slug
                ];
            })->toArray();
        } else {
            // Dummy Fallback
            $dummyCsrs = [
                ['id' => 1, 'title' => "Rumah untuk Semua", 'description' => "Program pembangunan rumah layak huni bagi keluarga kurang mampu di berbagai wilayah Indonesia.", 'image' => "/storage/media/csr-1.jpg", 'category' => "Housing", 'date' => "Ongoing", 'slug' => "1", 'content' => '<p>Program pembangunan rumah layak huni bagi keluarga kurang mampu di berbagai wilayah Indonesia. Bersama relawan dan mitra, kami membantu mewujudkan hunian yang aman dan nyaman.</p>'],
                ['id' => 2, 'title' => "Quinland Green Initiative", 'description' => "Inisiatif penanaman 10.000 pohon di kawasan perumahan dan area publik untuk menciptakan lingkungan hijau.", 'image' => "/storage/media/csr-2.jpg", 'category' => "Lingkungan", 'date' => "Jan - Des 2026", 'slug' => "2", 'content' => '<p>Inisiatif penanaman 10.000 pohon di kawasan perumahan dan area publik untuk menciptakan lingkungan hijau yang berkelanjutan bagi generasi mendatang.</p>'],
                ['id' => 3, 'title' => "Beasiswa Pendidikan Anak Bangsa", 'description' => "Program beasiswa pendidikan bagi anak-anak berprestasi dari keluarga prasejahtera.", 'image' => "/storage/media/csr-3.jpg", 'category' => "Pendidikan", 'date' => "Tahun Ajaran 2026", 'slug' => "3", 'content' => '<p>Program beasiswa pendidikan bagi anak-anak berprestasi dari keluarga prasejahtera di sekitar kawasan pengembangan Quinland Grup.</p>'],
                ['id' => 4, 'title' => "Layanan Kesehatan Masyarakat", 'description' => "Kegiatan pemeriksaan kesehatan gratis dan penyuluhan gizi untuk warga di sekitar proyek pengembangan.", 'image' => "/storage/media/csr-4.jpg", 'category' => "Kesehatan", 'date' => "Quarterly", 'slug' => "4", 'content' => '<p>Kegiatan pemeriksaan kesehatan gratis dan penyuluhan gizi untuk warga di sekitar proyek pengembangan, bekerja sama dengan rumah sakit dan tenaga medis profesional.</p>']
            ];
            $item = collect($dummyCsrs)->filter(fn($c) => (string)$c['id'] === $slug || $c['slug'] === $slug)->first();
            if (!$item) abort(404);
            $latestItems = collect($dummyCsrs)->where('id', '!=', $item['id'])->take(3)->values()->toArray();
        }
    }

    return Inertia::render('EventCsrDetail', [
        'item' => $item,
        'latestItems' => $latestItems,
        'type' => $type,
        'media' => [
            'event_csr_hero' => MediaHelper::url('event-csr-hero', '/storage/media/event-csr-hero.jpg'),
        ]
    ]);
})->name('event-csr.show');

Route::get('/artikel/{slug}', function ($slug) {
    $model = \App\Models\BlogPost::where('slug', $slug)->published()->first();
    
    if ($model) {
        $item = [
            'id' => $model->id,
            'title' => $model->title,
            'excerpt' => $model->excerpt,
            'content' => $model->content,
            'image' => $model->image ? (str_starts_with($model->image, 'http') ? $model->image : '/storage/' . ltrim($model->image, '/')) : null,
            'date' => $model->published_at ? $model->published_at->format('d M Y') : $model->created_at->format('d M Y'),
            'category' => $model->category?->name ?: 'Blog',
            'slug' => $model->slug
        ];
        
        $latest = \App\Models\BlogPost::published()
            ->where('id', '!=', $model->id)
            ->latest('published_at')
            ->limit(3)
            ->get();
            
        $latestItems = $latest->map(function($m) {
            return [
                'id' => $m->id,
                'title' => $m->title,
                'image' => $m->image ? (str_starts_with($m->image, 'http') ? $m->image : '/storage/' . ltrim($m->image, '/')) : null,
                'date' => $m->published_at ? $m->published_at->format('d M Y') : $m->created_at->format('d M Y'),
                'slug' => $m->slug
            ];
        })->toArray();
    } else {
        // Dummy Fallback
        $dummyArticles = [
            ['id' => 1, 'title' => "Rumah Dijual di Tangerang untuk Keluarga Nyaman & Aman", 'excerpt' => "Cari rumah dijual di Tangerang untuk keluarga?", 'image' => "/storage/media/blog-1.jpg", 'date' => "19 Feb 2026", 'category' => "Blog", 'slug' => '1', 'content' => '<p>Konten artikel lengkap tentang rumah di Tangerang...</p>'],
            ['id' => 2, 'title' => "Amadeus Signature, Rumah di Bogor untuk Investasi Jangka Panjang", 'excerpt' => "Rumah di Bogor Amadeus Signature menawarkan desain premium...", 'image' => "/storage/media/blog-2.jpg", 'date' => "17 Feb 2026", 'category' => "Blog", 'slug' => '2', 'content' => '<p>Konten artikel lengkap tentang Amadeus Signature...</p>'],
            ['id' => 3, 'title' => "Aerium Residence, Apartemen untuk Milenial, Pet Friendly & Modern", 'excerpt' => "Apartemen Jakarta Barat Aerium hadir dengan konsep pet-friendly...", 'image' => "/storage/media/blog-3.jpg", 'date' => "16 Feb 2026", 'category' => "Blog", 'slug' => '3', 'content' => '<p>Konten artikel lengkap tentang Aerium Residence...</p>'],
            ['id' => 4, 'title' => "Tips Memilih Rumah Idaman dengan Budget Terbatas", 'excerpt' => "Panduan lengkap memilih rumah impian...", 'image' => "/storage/media/blog-4.jpg", 'date' => "15 Feb 2026", 'category' => "Tips", 'slug' => '4', 'content' => '<p>Konten artikel lengkap tentang tips memilih rumah...</p>'],
        ];
        
        $item = collect($dummyArticles)->filter(fn($a) => (string)$a['id'] === $slug || $a['slug'] === $slug)->first();
        if (!$item) abort(404);
        $latestItems = collect($dummyArticles)->where('id', '!=', $item['id'])->take(3)->values()->toArray();
    }

    return Inertia::render('ArtikelDetail', [
        'article' => $item,
        'latestArticles' => $latestItems,
        'media' => [
            'artikel_hero' => MediaHelper::url('blog-1', '/storage/media/blog-1.jpg'),
        ]
    ]);
})->name('artikel.show');

Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
