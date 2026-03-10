<?php

namespace App\Filament\Resources\Properties\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PropertyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // ── Informasi Dasar ────────────────────────────────────────────
                Section::make('Informasi Dasar')
                    ->description('Identitas dan informasi umum properti.')
                    ->schema([
                        Select::make('unit_bisnis_id')
                            ->label('Unit Bisnis')
                            ->relationship('unitBisnis', 'name')
                            ->searchable()
                            ->preload()
                            ->columnSpan(1),

                        Select::make('kategori')
                            ->label('Kategori')
                            ->options([
                                'Residential' => 'Residential',
                                'Apartment' => 'Apartment',
                                'Komersial' => 'Komersial',
                                'Townhouse' => 'Townhouse',
                                'Ruko' => 'Ruko',
                            ])
                            ->columnSpan(1),

                        TextInput::make('nama_property')
                            ->label('Nama Properti')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(
                                fn(callable $set, $state) =>
                                $set('slug', \Illuminate\Support\Str::slug($state))
                            )
                            ->columnSpan(1),

                        TextInput::make('slug')
                            ->label('Slug (URL)')
                            ->unique(ignoreRecord: true)
                            ->helperText('Diisi otomatis dari nama properti.')
                            ->columnSpan(1),

                        TextInput::make('nama_penanggung_jawab_property')
                            ->label('Penanggung Jawab')
                            ->columnSpan(1),

                        TextInput::make('whatsapp_number')
                            ->label('Nomor WhatsApp')
                            ->placeholder('+6281234567890')
                            ->helperText('Digunakan untuk tombol booking.')
                            ->columnSpan(1),

                        TextInput::make('harga_mulai')
                            ->label('Harga Mulai (Rp)')
                            ->numeric()
                            ->prefix('Rp')
                            ->helperText('Contoh: 3062284000')
                            ->columnSpan(1),

                        Textarea::make('alamat')
                            ->label('Alamat')
                            ->rows(2)
                            ->columnSpan(1),

                        Textarea::make('deskripsi_property')
                            ->label('Deskripsi Properti')
                            ->rows(5)
                            ->columnSpanFull(),

                        Textarea::make('promo_unit_rumah')
                            ->label('Promo Unit Rumah')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                // ── Gallery Foto Utama ─────────────────────────────────────────
                Section::make('Gallery Foto Utama')
                    ->description('Foto-foto properti yang ditampilkan di halaman detail (ImageGallery).')
                    ->schema([
                        FileUpload::make('gambar_utama')
                            ->label('Foto Properti')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->disk('public')
                            ->directory('properties/gallery')
                            ->visibility('public')
                            ->imageEditor()
                            ->columnSpanFull(),
                    ]),

                // ── Fasilitas ─────────────────────────────────────────────────
                Section::make('Fasilitas')
                    ->description('Fasilitas yang tersedia di kawasan properti.')
                    ->schema([
                        Repeater::make('fasilitas_property')
                            ->label('Daftar Fasilitas')
                            ->schema([
                                TextInput::make('label')
                                    ->label('Nama Fasilitas')
                                    ->required()
                                    ->placeholder('Contoh: Swimming Pool'),
                            ])
                            ->addActionLabel('Tambah Fasilitas')
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),

                // ── Tipe Rumah ────────────────────────────────────────────────
                Section::make('Tipe Rumah')
                    ->description('Data tipe rumah beserta spesifikasi dan denah.')
                    ->schema([
                        Repeater::make('tipe_rumah')
                            ->label('Daftar Tipe Rumah')
                            ->schema([
                                TextInput::make('name')
                                    ->label('Nama Tipe')
                                    ->placeholder('Contoh: Type 88')
                                    ->required()
                                    ->columnSpan(1),

                                TextInput::make('sqft')
                                    ->label('Luas (m²)')
                                    ->numeric()
                                    ->columnSpan(1),

                                TextInput::make('bedrooms')
                                    ->label('Kamar Tidur')
                                    ->numeric()
                                    ->columnSpan(1),

                                TextInput::make('bathrooms')
                                    ->label('Kamar Mandi')
                                    ->numeric()
                                    ->columnSpan(1),

                                Textarea::make('description')
                                    ->label('Deskripsi Tipe')
                                    ->rows(2)
                                    ->columnSpanFull(),

                                FileUpload::make('gambar_denah')
                                    ->label('Gambar Denah')
                                    ->image()
                                    ->disk('public')
                                    ->directory('properties/denah')
                                    ->visibility('public')
                                    ->imageEditor()
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->addActionLabel('Tambah Tipe Rumah')
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),

                // ── Lokasi ────────────────────────────────────────────────────
                Section::make('Lokasi')
                    ->description('Embed URL Google Maps untuk tab Lokasi di halaman detail.')
                    ->schema([
                        Textarea::make('lokasi_maps_embed')
                            ->label('Google Maps Embed URL')
                            ->placeholder('https://www.google.com/maps/embed?pb=...')
                            ->helperText('Salin URL dari Google Maps → Share → Embed a map → src="..."')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                // ── Property Progress ─────────────────────────────────────────
                Section::make('Property Progress')
                    ->description('Foto perkembangan pembangunan per bulan.')
                    ->schema([
                        Repeater::make('property_progress')
                            ->label('Progress per Bulan')
                            ->schema([
                                TextInput::make('month')
                                    ->label('Bulan')
                                    ->placeholder('Contoh: Oktober 2025')
                                    ->required()
                                    ->columnSpan(1),

                                TextInput::make('label')
                                    ->label('Keterangan')
                                    ->placeholder('Contoh: Land Clearing & Foundation')
                                    ->columnSpan(1),

                                TextInput::make('percentage')
                                    ->label('Persentase (%)')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(100)
                                    ->suffix('%')
                                    ->columnSpan(1),

                                FileUpload::make('image')
                                    ->label('Foto Progress')
                                    ->image()
                                    ->disk('public')
                                    ->directory('properties/progress')
                                    ->visibility('public')
                                    ->columnSpan(1),
                            ])
                            ->columns(2)
                            ->addActionLabel('Tambah Progress')
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
