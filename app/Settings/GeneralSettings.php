<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;
    public ?string $site_logo;
    public ?string $site_favicon;
    public string $theme_color;
    public ?string $site_description;

    public ?string $site_meta_title;
    public ?string $site_meta_description;
    public ?string $site_meta_keywords;

    public ?string $site_og_title;
    public ?string $site_og_description;
    public ?string $site_og_image;

    public ?string $header_scripts;
    public ?string $body_scripts;

    public static function group(): string
    {
        return 'general';
    }
}
