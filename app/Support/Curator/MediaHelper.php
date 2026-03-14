<?php

namespace App\Support\Curator;

use Awcodes\Curator\Models\Media;

class MediaHelper
{
    /**
     * Get media URL by name or return fallback.
     *
     * @param string $name
     * @param string $fallback
     * @return string
     */
    public static function url(string $name, string $fallback): string
    {
        $media = Media::query()
            ->where('name', $name)
            ->latest('id')
            ->first();

        return $media ? '/storage/' . ltrim((string) $media->path, '/') : $fallback;
    }
}
