<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.site_name', 'Quinland');
        $this->migrator->add('general.site_logo', null);
        $this->migrator->add('general.theme_color', '#F59E0B');
        $this->migrator->add('general.site_description', 'Sistem Informasi Manajemen');
    }
};
