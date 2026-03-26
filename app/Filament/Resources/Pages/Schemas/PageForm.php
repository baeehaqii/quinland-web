<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                \Filament\Schemas\Components\Group::make()
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, callable $set) {
                                if ($operation === 'create') {
                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                }
                            }),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->disabled(fn(?string $operation) => $operation !== 'create')
                            ->dehydrated(),
                    ])
                    ->columns(2),

                \Filament\Schemas\Components\Section::make('Content')
                    ->schema([
                        \Filament\Forms\Components\Builder::make('content')
                            ->label('Page Content Blocks')
                            ->blocks([
                                \Filament\Forms\Components\Builder\Block::make('hero')
                                    ->label('Hero Section')
                                    ->icon('heroicon-o-photo')
                                    ->schema([
                                        \Filament\Forms\Components\Repeater::make('slides')
                                            ->schema([
                                                \Awcodes\Curator\Components\Forms\CuratorPicker::make('image_id')
                                                    ->label('Background Image')
                                                    ->required(),
                                                TextInput::make('alt')
                                                    ->label('Image Alt Text')
                                                    ->required(),
                                                TextInput::make('tagline')
                                                    ->label('Tagline')
                                                    ->required(),
                                                TextInput::make('heading')
                                                    ->label('Heading')
                                                    ->required(),
                                                TextInput::make('cta_label')
                                                    ->label('CTA Button Label')
                                                    ->nullable(),
                                                TextInput::make('cta_url')
                                                    ->label('CTA Button URL')
                                                    ->nullable(),
                                            ])
                                            ->cloneable()
                                            ->collapsible()
                                            ->defaultItems(1),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('properties')
                                    ->label('Properties Section')
                                    ->icon('heroicon-o-building-office-2')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Explore Our Top-Rated Properties')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Section Description')
                                            ->default('Discover exceptional properties that are acclaimed for their high ratings and exceptional features.')
                                            ->rows(3),
                                        \Filament\Forms\Components\Repeater::make('features')
                                            ->schema([
                                                TextInput::make('feature')
                                                    ->label('Feature Name')
                                                    ->required(),
                                            ])
                                            ->cloneable()
                                            ->collapsible()
                                            ->defaultItems(0),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('partners')
                                    ->label('Partners Section')
                                    ->icon('heroicon-o-building-library')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Meet Our Partnerss')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Section Description')
                                            ->default('We collaboratee with trusted financial institutions to provide comprehensive real estate solutions and financing options for our clients.')
                                            ->rows(3),
                                        TextInput::make('cta_label')
                                            ->label('CTA Button Label')
                                            ->default('Learn More')
                                            ->nullable(),
                                        TextInput::make('cta_url')
                                            ->label('CTA Button URL')
                                            ->default('/partners')
                                            ->nullable(),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('news')
                                    ->label('Latest News Section')
                                    ->icon('heroicon-o-newspaper')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Latest News')
                                            ->required(),
                                        TextInput::make('cta_label')
                                            ->label('CTA Button Label')
                                            ->default('See All')
                                            ->nullable(),
                                        TextInput::make('cta_url')
                                            ->label('CTA Button URL')
                                            ->default('/artikel')
                                            ->nullable(),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('events')
                                    ->label('Special Events Section')
                                    ->icon('heroicon-o-calendar-days')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Special Events')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Section Description')
                                            ->default('Discover our upcoming special events and programs.')
                                            ->rows(3),
                                        TextInput::make('cta_label')
                                            ->label('CTA Button Label')
                                            ->default('See All')
                                            ->nullable(),
                                        TextInput::make('cta_url')
                                            ->label('CTA Button URL')
                                            ->default('/events')
                                            ->nullable(),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('csr')
                                    ->label('CSR Section')
                                    ->icon('heroicon-o-heart')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Corporate Social Responsibility')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Section Description')
                                            ->default('Quinland Grup percaya bahwa pembangunan yang berkelanjutan tidak hanya soal properti, tetapi juga tentang membangun kehidupan yang lebih baik bagi masyarakat sekitar.')
                                            ->rows(3),
                                        TextInput::make('cta_label')
                                            ->label('CTA Button Label')
                                            ->default('See All')
                                            ->nullable(),
                                        TextInput::make('cta_url')
                                            ->label('CTA Button URL')
                                            ->default('/csr')
                                            ->nullable(),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('page_hero')
                                    ->label('Page Hero Section')
                                    ->icon('heroicon-o-photo')
                                    ->schema([
                                        \Awcodes\Curator\Components\Forms\CuratorPicker::make('image_id')
                                            ->label('Background Image')
                                            ->required(),
                                        TextInput::make('title')
                                            ->label('Title')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Description')
                                            ->rows(3)
                                            ->required(),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('about_section')
                                    ->label('About Sectionn')
                                    ->icon('heroicon-o-information-circle')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Tentang Kami')
                                            ->required(),
                                        TextInput::make('heading')
                                            ->label('Heading')
                                            ->default('Membangun Masa Depan, Menciptakan Kebahagiaan')
                                            ->required(),
                                        Textarea::make('description_1')
                                            ->label('Description Paragraph 1')
                                            ->rows(3)
                                            ->required(),
                                        Textarea::make('description_2')
                                            ->label('Description Paragraph 2')
                                            ->rows(3),
                                        \Filament\Schemas\Components\Grid::make(3)
                                            ->schema([
                                                TextInput::make('stats_years')
                                                    ->label('Years of Experience')
                                                    ->default('4+'),
                                                TextInput::make('stats_projects')
                                                    ->label('Completed Projects')
                                                    ->default('5+'),
                                                TextInput::make('stats_families')
                                                    ->label('Happy Families')
                                                    ->default('1K+'),
                                            ]),
                                        \Awcodes\Curator\Components\Forms\CuratorPicker::make('image_id')
                                            ->label('About Image')
                                            ->required(),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('vision_mission')
                                    ->label('Vision & Mission Section')
                                    ->icon('heroicon-o-eye')
                                    ->schema([
                                        TextInput::make('section_subtitle')
                                            ->label('Section Subtitle')
                                            ->default('Visi & Misi'),
                                        TextInput::make('section_heading')
                                            ->label('Section Heading')
                                            ->default('Landasan Kami Berkarya'),
                                        TextInput::make('vision_title')
                                            ->label('Vision Title')
                                            ->default('Visi Kami'),
                                        Textarea::make('vision_description')
                                            ->label('Vision Description')
                                            ->rows(3),
                                        TextInput::make('mission_title')
                                            ->label('Mission Title')
                                            ->default('Misi Kami'),
                                        \Filament\Forms\Components\Repeater::make('missions')
                                            ->schema([
                                                TextInput::make('title')
                                                    ->label('Point Title'),
                                                Textarea::make('description')
                                                    ->label('Point Description'),
                                            ]),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('office_section')
                                    ->label('Office Section')
                                    ->icon('heroicon-o-building-office')
                                    ->schema([
                                        TextInput::make('section_subtitle')
                                            ->label('Section Subtitle')
                                            ->default('Kantor Kami'),
                                        TextInput::make('section_heading')
                                            ->label('Section Heading')
                                            ->default('Kunjungi Kantor Quinland'),
                                        \Awcodes\Curator\Components\Forms\CuratorPicker::make('image_id')
                                            ->label('Office Image')
                                            ->required(),
                                        TextInput::make('office_name')
                                            ->label('Office Name')
                                            ->default('Kantor Pusat'),
                                        Textarea::make('address')
                                            ->label('Address'),
                                        TextInput::make('phone')
                                            ->label('Phone Number'),
                                        TextInput::make('email')
                                            ->label('Email Address'),
                                        TextInput::make('operational_hours')
                                            ->label('Operational Hours'),
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('faq')
                                    ->label('FAQ Section')
                                    ->icon('heroicon-o-question-mark-circle')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Pertanyaan Umum')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Section Description')
                                            ->default('Berikut Beberapa Pertanyaan Umum yang sering ditanyakan, Jika Anda masih belum menemukan jawaban disini, Anda bisa menghubungi nomer Hotline Kami')
                                            ->rows(3),
                                    ]),
                            ])
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),

                \Filament\Schemas\Components\Section::make('SEO & Settings')
                    ->schema([
                        \Filament\Forms\Components\TextInput::make('seo_title')
                            ->label('SEO Title')
                            ->placeholder('Defaults to page title if empty'),

                        \Filament\Forms\Components\Textarea::make('seo_description')
                            ->label('SEO Description')
                            ->rows(3)
                            ->columnSpanFull(),

                        \Filament\Schemas\Components\Grid::make(3)
                            ->schema([
                                Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true),
                                Toggle::make('is_home')
                                    ->label('Set as Homepage')
                                    ->default(false),
                            ]),
                    ]),
            ]);
    }
}
