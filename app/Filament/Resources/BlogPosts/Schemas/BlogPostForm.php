<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use App\Models\BlogCategory;
use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Group;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Set;
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
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),

                                TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true),

                                Textarea::make('excerpt')
                                    ->rows(2)
                                    ->columnSpanFull(),

                                RichEditor::make('content')
                                    ->required()
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),

                        Section::make('SEO Details')
                            ->schema([
                                TextInput::make('seo_title')
                                    ->placeholder('Default to Title'),
                                Textarea::make('seo_description')
                                    ->placeholder('Default to Excerpt'),
                            ])
                            ->collapsed(),
                    ])
                    ->columnSpan(['lg' => 2]),

                Group::make()
                    ->schema([
                        Section::make('Status & Visibility')
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
                                    ->label('Publish Date'),
                            ]),

                        Section::make('Associations')
                            ->schema([
                                Select::make('author_id')
                                    ->relationship('author', 'name')
                                    ->searchable()
                                    ->required()
                                    ->default(auth()->id()),

                                Select::make('blog_category_id')
                                    ->relationship('category', 'name')
                                    ->searchable()
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

                        Section::make('Image')
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->directory('blog-posts'),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }
}
