<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'locations' => 'array',
        'items' => 'array',
        'is_active' => 'boolean',
    ];

    protected static function booted()
    {
        static::saved(function ($menu) {
            $menu->generateMissingPages();
        });
    }

    public function generateMissingPages()
    {
        if (!is_array($this->items))
            return;

        $itemsToProcess = $this->extractAllUrls($this->items);

        foreach ($itemsToProcess as $item) {
            $url = $item['url'] ?? '';
            $label = $item['label'] ?? 'New Page';

            // Generate hanya untuk path internal (e.g. /promo, /about-us) 
            // Exclude root (/) atau url external (http)
            if (!str_starts_with($url, '/') || strlen($url) <= 1)
                continue;

            // Pastikan Page terdaftar di database agar muncul di Resource Pages
            $slug = ltrim($url, '/');
            \App\Models\Page::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $label,
                    // jangan men-toggle is_active apabila update supaya tidak menimpa settingan user jika dinonaktifkan
                ]
            );

            // Jika ada prefix url seperti /v0-ui-quinland/pages (meskipun Inertia meloadnya dari JS pages)
            $componentName = \Illuminate\Support\Str::studly(str_replace('/', '-', $slug));

            // Lokasi ideal Inertia.js (sesuai setting PageController yg menggunakan resource_path("js/pages/{$componentName}.tsx"))
            $path = resource_path("js/pages/{$componentName}.tsx");

            if (!file_exists($path)) {
                $content = self::getTsxTemplate($componentName, $label);
                \Illuminate\Support\Facades\File::put($path, $content);
            }
        }
    }

    private function extractAllUrls(array $items)
    {
        $urls = [];
        foreach ($items as $item) {
            $urls[] = $item;
            if (isset($item['children']) && is_array($item['children'])) {
                $urls = array_merge($urls, $this->extractAllUrls($item['children']));
            }
        }
        return $urls;
    }

    private static function getTsxTemplate($componentName, $label)
    {
        return <<<TSX
import React from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar";
import { Footer } from "@/v0-ui-quinland/components/layout/footer";

export default function {$componentName}() {
    return (
        <>
            <Head title="{$label}" />
            <Navbar />

            <main className="min-h-screen bg-background pt-32 pb-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <h1 className="text-4xl font-bold text-foreground">{$label}</h1>
                    <p className="mt-4 text-muted-foreground">
                        This page was automatically generated.
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}
TSX;
    }
}
