<?php

declare(strict_types=1);

namespace App\Support\Curator;

use Awcodes\Curator\Concerns\UrlProvider;
use Awcodes\Curator\Providers\GlideUrlProvider;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;

class ResilientUrlProvider implements UrlProvider
{
    protected static function shouldBypassGlide(): bool
    {
        return (bool) config('curator.bypass_glide', true);
    }

    protected static function directUrl(string $path): string
    {
        $disk = (string) config('curator.default_disk', config('filesystems.default', 'public'));

        /** @var FilesystemAdapter $filesystem */
        $filesystem = Storage::disk($disk);

        return $filesystem->url($path);
    }

    public static function getThumbnailUrl(string $path): string
    {
        if (static::shouldBypassGlide()) {
            return static::directUrl($path);
        }

        return GlideUrlProvider::getThumbnailUrl($path);
    }

    public static function getMediumUrl(string $path): string
    {
        if (static::shouldBypassGlide()) {
            return static::directUrl($path);
        }

        return GlideUrlProvider::getMediumUrl($path);
    }

    public static function getLargeUrl(string $path): string
    {
        if (static::shouldBypassGlide()) {
            return static::directUrl($path);
        }

        return GlideUrlProvider::getLargeUrl($path);
    }
}
