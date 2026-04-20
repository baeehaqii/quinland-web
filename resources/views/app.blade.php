<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    @php
        $siteFaviconUrl = null;
        $headerScripts = null;
        $bodyScripts = null;

        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
                $settings = app(\App\Settings\GeneralSettings::class);

                if (filled($settings->site_favicon)) {
                    $siteFaviconUrl = asset('storage/' . ltrim((string) $settings->site_favicon, '/'));
                }

                $headerScripts = $settings->header_scripts ?? null;
                $bodyScripts = $settings->body_scripts ?? null;
            }
        } catch (\Throwable $e) {
            // Keep fallback favicon when settings are not available.
        }
    @endphp

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>Quinland Group - For a Better Life</title>

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