<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use App\Models\BlogCategory;
use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Group;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->schema([
                        Section::make()
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->placeholder('Masukkan judul artikel')
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),

                                TextInput::make('slug')
                                    ->required()
                                    ->placeholder('url-artikel-otomatis-dari-judul')
                                    ->unique(ignoreRecord: true),

                                Textarea::make('excerpt')
                                    ->label('Ringkasan Artikel')
                                    ->helperText('Deskripsi singkat artikel yang ditampilkan di halaman daftar blog. Idealnya 1–2 kalimat.')
                                    ->placeholder('Tuliskan ringkasan singkat artikel ini...')
                                    ->rows(2)
                                    ->columnSpanFull(),

                                RichEditor::make('content')
                                    ->required()
                                    ->disableToolbarButtons(['code', 'codeBlock', 'attachFiles'])
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),

                        Section::make('SEO Details')
                            ->schema([
                                TextInput::make('seo_title')
                                    ->placeholder('Biarkan kosong untuk menggunakan judul artikel'),
                                Textarea::make('seo_description')
                                    ->placeholder('Biarkan kosong untuk menggunakan ringkasan artikel'),
                            ])
                            ->collapsed(),
                    ])
                    ->columnSpan(['lg' => 2]),

                Group::make()
                    ->schema([
                        Section::make('Status & Visibilitas')
                            ->schema([
                                Select::make('status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Published',
                                        'archived' => 'Archived',
                                    ])
                                    ->default('draft')
                                    ->required(),

                                DateTimePicker::make('published_at')
                                    ->label('Tanggal Publikasi')
                                    ->placeholder('Pilih tanggal & waktu publikasi'),

                                Toggle::make('cta_whatsapp')
                                    ->label('Tampilkan tombol CTA WhatsApp')
                                    ->helperText('Menampilkan tombol ajakan untuk menghubungi via WhatsApp di akhir artikel.')
                                    ->default(false),
                            ]),

                        Section::make('Penulis & Kategori')
                            ->schema([
                                Select::make('author_id')
                                    ->label('Penulis')
                                    ->relationship('author', 'name')
                                    ->searchable()
                                    ->required()
                                    ->default(auth()->id()),

                                Select::make('blog_category_id')
                                    ->label('Kategori')
                                    ->relationship('category', 'name')
                                    ->placeholder('Pilih kategori')
                                    ->createOptionForm([
                                        TextInput::make('name')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),
                                        TextInput::make('slug')
                                            ->required()
                                            ->maxLength(255)
                                            ->unique('blog_categories', 'slug'),
                                    ])
                                    ->createOptionUsing(function (array $data) {
                                        return BlogCategory::create($data)->id;
                                    }),
                            ]),

                        Section::make('Gambar')
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png'])
                                    ->maxSize(1024)
                                    ->helperText('Format: JPG, JPEG, PNG. Maks. 1 MB.')
                                    ->directory('blog-posts'),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }
}
