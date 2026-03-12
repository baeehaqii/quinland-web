<?php

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
        'page' => $page
    ]);
})->name('home');

Route::get('/property', function () {
    // 1. Ambil data page yang slug-nya 'property'
    $page = \App\Models\Page::where('slug', 'property')->where('is_active', true)->first();

    // 2. Logic buat narik gambar dari Curator (biar gambarnya muncul, bukan cuma ID)
    if ($page && is_array($page->content)) {
        $content = $page->content;
        foreach ($content as &$block) {
            if ($block['type'] === 'hero' && isset($block['data']['slides'])) {
                foreach ($block['data']['slides'] as &$slide) {
                    if (isset($slide['image_id'])) {
                        $media = \Awcodes\Curator\Models\Media::find($slide['image_id']);
                        // Masukkan path gambar asli ke dalam key 'image_url'
                        $slide['image_url'] = $media ? '/storage/' . $media->path : '/storage/media/property-hero.jpg';
                    }
                }
            }
        }
        $page->content = $content;
    }

    // 3. Ambil juga data properties buat ngerender kartu-kartu rumahnya
    $properties = \App\Models\Property::all(); // Pastikan model Property sudah ada

    return Inertia::render('Property', [
        'page' => $page,
        'properties' => $properties
    ]);
})->name('property.index');

Route::get('/property/{slug}', function () {
    return Inertia::render('PropertyDetail');
})->name('property.show');

Route::get('/event-csr', function () {
    return Inertia::render('EventCsr');
})->name('event-csr.index');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about.index');

Route::get('/artikel', function () {
    return Inertia::render('Artikel');
})->name('artikel.index');

Route::get('/{slug}', [App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
