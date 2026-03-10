<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.site_meta_title', 'Quinland - Properti Terbaik');
        $this->migrator->add('general.site_meta_description', 'Quinland adalah platform properti terpercaya.');
        $this->migrator->add('general.site_meta_keywords', 'properti, rumah, jual beli');
        $this->migrator->add('general.site_og_title', 'Quinland');
        $this->migrator->add('general.site_og_description', 'Quinland adalah platform properti terpercaya.');
        $this->migrator->add('general.site_og_image', null);
        $this->migrator->add('general.header_scripts', '');
        $this->migrator->add('general.body_scripts', '');
    }
};
