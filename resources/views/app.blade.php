<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    @php
        $siteFaviconUrl = null;
        $headerScripts = null;
        $bodyScripts = null;

        // ─── Open Graph defaults ────────────────────────────────────────────────
        $siteName = 'Quinland Grup';
        $ogTitle = 'Quinland Group - For a Better Life';
        $ogDescription = 'Developer properti terpercaya yang menghadirkan hunian berkualitas, inovatif, dan berkelanjutan.';
        $ogImage = null;
        $ogUrl = url()->current();
        $ogType = 'website';

        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
                $settings = app(\App\Settings\GeneralSettings::class);

                if (filled($settings->site_favicon)) {
                    $siteFaviconUrl = asset('storage/' . ltrim((string) $settings->site_favicon, '/'));
                }

                $headerScripts = $settings->header_scripts ?? null;
                $bodyScripts = $settings->body_scripts ?? null;

                // Site-level OG defaults from settings
                if (filled($settings->site_name)) {
                    $siteName = $settings->site_name;
                }
                if (filled($settings->site_og_title)) {
                    $ogTitle = $settings->site_og_title;
                }
                if (filled($settings->site_og_description)) {
                    $ogDescription = $settings->site_og_description;
                }

                // Prefer dedicated OG image, fall back to site logo
                if (filled($settings->site_og_image)) {
                    $ogImage = asset('storage/' . ltrim((string) $settings->site_og_image, '/'));
                } elseif (filled($settings->site_logo)) {
                    $ogImage = asset('storage/' . ltrim((string) $settings->site_logo, '/'));
                }
            }
        } catch (\Throwable $e) {
            // Keep fallback values when settings are not available.
        }

        // ─── Per-page OG overrides using Inertia props ──────────────────────────
        // React's <Head> runs client-side only; crawlers need these tags in raw HTML.
        $inertiaComponent = $page['component'] ?? '';
        $inertiaProps = $page['props'] ?? [];

        if ($inertiaComponent === 'ArtikelDetail' && isset($inertiaProps['article'])) {
            $art = $inertiaProps['article'];
            $ogType = 'article';
            $ogTitle = ($art['title'] ?? $ogTitle) . ' | ' . $siteName;
            $ogDescription = $art['excerpt'] ?? $ogDescription;
            if (!empty($art['og_image'])) {
                $ogImage = str_starts_with($art['og_image'], 'http')
                    ? $art['og_image']
                    : url($art['og_image']);
            }
            if (!empty($art['og_url'])) {
                $ogUrl = $art['og_url'];
            }

        } elseif ($inertiaComponent === 'EventCsrDetail' && isset($inertiaProps['item'])) {
            $ev = $inertiaProps['item'];
            $ogTitle = ($ev['title'] ?? $ogTitle) . ' | ' . $siteName;
            $ogDescription = $ev['description'] ?? $ev['excerpt'] ?? $ogDescription;
            if (!empty($ev['image'])) {
                $img = $ev['image'];
                $ogImage = str_starts_with($img, 'http') ? $img : url($img);
            }

        } elseif ($inertiaComponent === 'PropertyDetail' && isset($inertiaProps['property'])) {
            $prop = $inertiaProps['property'];
            $ogTitle = ($prop['name'] ?? $ogTitle) . ' | ' . $siteName;
            $ogDescription = strip_tags($prop['description'] ?? $ogDescription);
            $images = $prop['images'] ?? [];
            if (!empty($images[0])) {
                $img = $images[0];
                $ogImage = str_starts_with($img, 'http') ? $img : url('/storage/' . ltrim($img, '/'));
            }

        } elseif (isset($inertiaProps['page']) && is_array($inertiaProps['page'])) {
            $pg = $inertiaProps['page'];
            $pageTitle = $pg['seo_title'] ?? $pg['title'] ?? null;
            if ($pageTitle) {
                $ogTitle = $pageTitle . ' | ' . $siteName;
            }
            if (!empty($pg['seo_description'])) {
                $ogDescription = $pg['seo_description'];
            }
            // Pages use the site logo/OG image (already set above)
        }

        // Sanitise description: strip HTML tags, cap at 200 chars
        $ogDescription = mb_strimwidth(strip_tags($ogDescription ?? ''), 0, 200, '...');
    @endphp

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>Quinland Group - For a Better Life</title>

    {{-- Server-rendered meta description (visible to crawlers) --}}
    <meta name="description" content="{{ $ogDescription }}" />

    {{-- Open Graph --}}
    <meta property="og:type" content="{{ $ogType }}" />
    <meta property="og:site_name" content="{{ $siteName }}" />
    <meta property="og:title" content="{{ $ogTitle }}" />
    <meta property="og:description" content="{{ $ogDescription }}" />
    <meta property="og:url" content="{{ $ogUrl }}" />
    @if ($ogImage)
        <meta property="og:image" content="{{ $ogImage }}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    @endif

    {{-- Twitter / X Card --}}
    <meta name="twitter:card" content="{{ $ogImage ? 'summary_large_image' : 'summary' }}" />
    <meta name="twitter:title" content="{{ $ogTitle }}" />
    <meta name="twitter:description" content="{{ $ogDescription }}" />
    @if ($ogImage)
        <meta name="twitter:image" content="{{ $ogImage }}" />
    @endif

    @if ($siteFaviconUrl)
        <link rel="icon" href="{{ $siteFaviconUrl }}" sizes="any">
        <link rel="apple-touch-icon" href="{{ $siteFaviconUrl }}">
    @else
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    @endif

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    @if ($headerScripts)
        {!! $headerScripts !!}
    @endif
</head>

<body class="font-sans antialiased">
    @if ($bodyScripts)
        {!! $bodyScripts !!}
    @endif

    @inertia
</body>

</html>