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
                                    ]),

                                \Filament\Forms\Components\Builder\Block::make('partners')
                                    ->label('Partners Section')
                                    ->icon('heroicon-o-building-library')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->default('Meet Our Partners')
                                            ->required(),
                                        Textarea::make('description')
                                            ->label('Section Description')
                                            ->default('We collaborate with trusted financial institutions to provide comprehensive real estate solutions and financing options for our clients.')
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
                                        TextInput::make('cta_label')
                                            ->label('CTA Button Label')
                                            ->default('See All')
                                            ->nullable(),
                                        TextInput::make('cta_url')
                                            ->label('CTA Button URL')
                                            ->default('/events')
                                            ->nullable(),
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
