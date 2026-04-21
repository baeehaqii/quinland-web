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

    $properties = \App\Models\Property::query()
        ->latest('id')
        ->get()
        ->map(fn(\App\Models\Property $p) => [
            'id' => (string) $p->id,
            'name' => $p->nama_property ?: 'Property ' . $p->id,
            'location' => $p->alamat ?: '-',
            'slug' => $p->slug ?: \Illuminate\Support\Str::slug((string) ($p->nama_property ?: 'property-' . $p->id)),
            'kategori' => $p->kategori ?: 'Lainnya',
            'image' => collect($p->gambar_utama ?? [])
                ->filter(fn($path) => filled($path))
                ->map(fn($path) => ltrim((string) $path, '/'))
                ->values()
                ->all(),
            'tipe_rumah' => is_array($p->tipe_rumah) ? $p->tipe_rumah : [],
        ])
        ->values()
        ->all();

    $articles = \App\Models\BlogPost::published()
        ->with('category')
        ->latest('published_at')
        ->limit(4)
        ->get()
        ->map(fn(\App\Models\BlogPost $p) => [
            'id' => $p->id,
            'title' => $p->title,
            'excerpt' => $p->excerpt,
            'image' => $p->image
                ? (str_starts_with($p->image, 'http') ? $p->image : '/storage/' . ltrim($p->image, '/'))
                : null,
            'date' => $p->published_at ? $p->published_at->format('d M Y') : $p->created_at->format('d M Y'),
            'category' => $p->category?->name ?: 'Blog',
            'slug' => $p->slug,
        ]);

    $events = \App\Models\Event::where('is_published', true)
        ->latest('event_date')
        ->limit(3)
        ->get()
        ->map(fn(\App\Models\Event $e) => [
            'id' => $e->id,
            'title' => $e->title,
            'description' => $e->description,
            'image' => $e->image ? '/storage/' . ltrim($e->image, '/') : null,
            'date' => $e->event_date ? $e->event_date->format('d M Y') : '-',
            'category' => 'Event',
            'slug' => $e->slug,
        ]);

    return Inertia::render('welcome', [
        'page' => $page,
        'properties' => $properties,
        'articles' => $articles,
        'events' => $events,
        'faqs' => \App\Models\Faq::where('is_active', true)->orderBy('sort_order')->get(),
        'partners' => \App\Models\Partner::where('is_active', true)->orderBy('sort_order')->get()->map(function ($p) {
            $logo = $p->logo;
            if ($logo && !str_starts_with($logo, 'http')) {
                $logo = '/storage/' . ltrim($logo, '/');
            }
            return [
                'id' => $p->id,
                'name' => $p->name,
                'logo' => $logo,
                'website_url' => $p->website_url,
            ];
        }),
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
                'kategori' => $property->kategori,
            ];
        })
        ->values()
        ->all();

    // Removed dummy data fallback as requested

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

    return Inertia::render('Property', [
        'page' => $page,
        'properties' => $properties
    ]);
})->name('property.index');

Route::get('/property/{slug}', function ($slug) {
    $propertyModel = \App\Models\Property::query()
        ->where('slug', $slug)
        ->first();

    if ($propertyModel) {
        $images = collect($propertyModel->gambar_utama ?? [])
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

        $tipeRumah = is_array($propertyModel->tipe_rumah) ? $propertyModel->tipe_rumah : [];
        $tipeRumah = array_map(function ($t) {
            return [
                'name' => $t['name'] ?? '',
                'sqft' => isset($t['sqft']) ? (int) $t['sqft'] : null,
                'bedrooms' => isset($t['bedrooms']) ? (int) $t['bedrooms'] : null,
                'bathrooms' => isset($t['bathrooms']) ? (int) $t['bathrooms'] : null,
                'description' => $t['description'] ?? '',
                'gambar_denah' => isset($t['gambar_denah']) ? '/storage/' . ltrim((string) $t['gambar_denah'], '/') : null,
            ];
        }, $tipeRumah);

        $propertyProgress = is_array($propertyModel->property_progress) ? $propertyModel->property_progress : [];
        $propertyProgress = array_map(function ($p) {
            return [
                'month' => $p['month'] ?? '',
                'label' => $p['label'] ?? '',
                'percentage' => isset($p['percentage']) ? (int) $p['percentage'] : 0,
                'image' => isset($p['image']) ? '/storage/' . ltrim((string) $p['image'], '/') : null,
            ];
        }, $propertyProgress);

        $fasilitasProperty = is_array($propertyModel->fasilitas_property) ? $propertyModel->fasilitas_property : [];

        $propertyData = [
            'name' => $propertyModel->nama_property ?: 'Property ' . $propertyModel->id,
            'slug' => $propertyModel->slug ?: \Illuminate\Support\Str::slug((string) ($propertyModel->nama_property ?: 'property-' . $propertyModel->id)),
            'category' => $propertyModel->kategori,
            'price' => $propertyModel->harga_mulai ? 'Rp ' . number_format((int) $propertyModel->harga_mulai, 0, ',', '.') : '-',
            'images' => $images,
            'description' => $propertyModel->deskripsi_property ?: 'Deskripsi properti belum tersedia.',
            'alamat' => $propertyModel->alamat ?: '',
            'whatsapp_number' => $propertyModel->whatsapp_number,
            'fasilitas_property' => $fasilitasProperty,
            'tipe_rumah' => $tipeRumah,
            'lokasi_maps_embed' => $propertyModel->lokasi_maps_embed,
            'property_progress' => $propertyProgress,
        ];
        $propertyId = $propertyModel->id;
    } else {
        abort(404);
    }

    $otherProperties = \App\Models\Property::query()
        ->where('id', '!=', $propertyId)
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

    // Removed dummy other properties fallback
    $otherProperties = collect($otherProperties)->filter(fn($o) => (string) $o['id'] !== (string) $propertyId)->values()->all();

    return Inertia::render('PropertyDetail', [
        'property' => $propertyData,
        'otherProperties' => $otherProperties,
        'propertyId' => $propertyId, // Pass the propertyId to the frontend
    ]);
})->name('property.show');

Route::post('/booking', function (\Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'nama' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'email' => 'required|email|max:255',
        'date' => 'required|date',
        'property_id' => 'required|exists:properties,id',
    ]);

    \App\Models\Booking::create($validated);

    return back()->with('success', 'Booking berhasil disimpan.');
})->name('booking.store');

Route::get('/event-csr', function () {
    $events = \App\Models\Event::where('is_published', true)
        ->orderBy('event_date', 'desc')
        ->get()
        ->map(function (\App\Models\Event $event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'image' => $event->image ? '/storage/' . ltrim($event->image, '/') : null,
                'date' => $event->event_date ? $event->event_date->format('d M Y') : '-',
                'category' => 'Event',
                'slug' => $event->slug,
            ];
        });

    $csrs = \App\Models\Csr::where('is_published', true)
        ->orderBy('date', 'desc')
        ->get()
        ->map(function (\App\Models\Csr $csr) {
            return [
                'id' => $csr->id,
                'title' => $csr->title,
                'description' => $csr->description,
                'image' => $csr->image ? '/storage/' . ltrim($csr->image, '/') : null,
                'date' => $csr->date ? $csr->date->format('M Y') : 'Ongoing',
                'category' => 'Program CSR',
                'slug' => $csr->slug,
            ];
        });

    return Inertia::render('EventCsr', [
        'events' => $events,
        'csrs' => $csrs,
        'media' => [
            'event_csr_hero' => MediaHelper::url('event-csr-hero', '/storage/media/event-csr-hero.jpg'),
        ],
    ]);
})->name('event-csr.index');

Route::get('/about', function () {
    $page = \App\Models\Page::where('slug', 'about')->where('is_active', true)->first();

    if ($page && is_array($page->content)) {
        $content = $page->content;

        foreach ($content as &$block) {
            if (!isset($block['data']) || !is_array($block['data'])) {
                continue;
            }

            if (isset($block['data']['image_id']) && is_numeric($block['data']['image_id'])) {
                $media = \Awcodes\Curator\Models\Media::find((int) $block['data']['image_id']);

                if ($media?->path) {
                    $block['data']['image_url'] = '/storage/' . ltrim((string) $media->path, '/');
                }
            }
        }

        $page->content = $content;
    }

    $properties = \App\Models\Property::query()
        ->latest('id')
        ->limit(3)
        ->get()
        ->map(fn(\App\Models\Property $p) => [
            'id' => (string) $p->id,
            'name' => $p->nama_property ?: 'Property ' . $p->id,
            'location' => $p->alamat ?: '-',
            'slug' => $p->slug ?: \Illuminate\Support\Str::slug((string) ($p->nama_property ?: 'property-' . $p->id)),
            'image' => collect($p->gambar_utama ?? [])
                ->filter(fn($path) => filled($path))
                ->map(fn($path) => ltrim((string) $path, '/'))
                ->values()
                ->all(),
            'tipe_rumah' => is_array($p->tipe_rumah) ? $p->tipe_rumah : [],
        ])
        ->values()
        ->all();

    return Inertia::render('About', [
        'page' => $page,
        'properties' => $properties,
        'media' => [
            'about_hero' => MediaHelper::url('about-hero', '/storage/media/about-hero.jpg'),
            'about_team' => MediaHelper::url('about-team', '/storage/media/about-team.jpg'),
            'office' => MediaHelper::url('office', '/storage/media/office.jpg'),
        ],
    ]);
})->name('about.index');

Route::get('/artikel', function () {
    $articles = \App\Models\BlogPost::published()
        ->with('category')
        ->latest('published_at')
        ->get()
        ->map(fn(\App\Models\BlogPost $post) => [
            'id' => $post->id,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'image' => $post->image
                ? (str_starts_with($post->image, 'http') ? $post->image : '/storage/' . ltrim($post->image, '/'))
                : null,
            'date' => $post->published_at ? $post->published_at->format('d M Y') : $post->created_at->format('d M Y'),
            'category' => $post->category?->name ?: 'Uncategorized',
            'slug' => $post->slug,
        ]);

    $categories = \App\Models\BlogCategory::where('is_visible', true)
        ->orderBy('name')
        ->pluck('name');

    return Inertia::render('Artikel', [
        'articles' => $articles,
        'categories' => $categories,
        'media' => [
            'blog_hero' => MediaHelper::url('blog-1', '/storage/media/blog-1.jpg'),
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
            $latestItems = $latest->map(function ($m) {
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
            $item = collect($dummyEvents)->filter(fn($e) => (string) $e['id'] === $slug || $e['slug'] === $slug)->first();
            if (!$item)
                abort(404);
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
            $latestItems = $latest->map(function ($m) {
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
            $item = collect($dummyCsrs)->filter(fn($c) => (string) $c['id'] === $slug || $c['slug'] === $slug)->first();
            if (!$item)
                abort(404);
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
        $imageUrl = $model->image
            ? (str_starts_with($model->image, 'http') ? $model->image : url('/storage/' . ltrim($model->image, '/')))
            : null;

        $item = [
            'id' => $model->id,
            'title' => $model->title,
            'excerpt' => $model->excerpt,
            'content' => $model->content,
            'image' => $imageUrl ? (str_starts_with($imageUrl, 'http') ? $imageUrl : '/storage/' . ltrim($model->image, '/')) : null,
            'og_image' => $imageUrl,
            'og_url' => route('artikel.show', $model->slug),
            'date' => $model->published_at ? $model->published_at->format('d M Y') : $model->created_at->format('d M Y'),
            'category' => $model->category?->name ?: 'Blog',
            'author' => $model->author?->name ?: 'Quinland Editorial Team',
            'slug' => $model->slug,
            'cta_whatsapp' => (bool) $model->cta_whatsapp,
        ];

        $latest = \App\Models\BlogPost::published()
            ->where('id', '!=', $model->id)
            ->latest('published_at')
            ->limit(3)
            ->get();

        $latestItems = $latest->map(function ($m) {
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

        $item = collect($dummyArticles)->filter(fn($a) => (string) $a['id'] === $slug || $a['slug'] === $slug)->first();
        if (!$item)
            abort(404);
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

Route::get('/proyek', function () {
    $page = \App\Models\Page::where('slug', 'proyek')->where('is_active', true)->first();

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
                'kategori' => $property->kategori,
                'harga_mulai' => $property->harga_mulai ? 'Rp ' . number_format((int) $property->harga_mulai, 0, ',', '.') : null,
                'tipe_rumah' => is_array($property->tipe_rumah) ? $property->tipe_rumah : [],
            ];
        })
        ->values()
        ->all();

    return Inertia::render('Proyek', [
        'page' => $page,
        'properties' => $properties,
    ]);
})->name('proyek.index');

Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
