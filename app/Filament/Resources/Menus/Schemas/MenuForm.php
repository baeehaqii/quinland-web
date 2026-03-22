<?php

namespace App\Filament\Resources\Menus\Schemas;

use Filament\Schemas\Schema;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Menu Details')
                    ->schema([
                        \Filament\Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn(\Filament\Schemas\Components\Utilities\Set $set, ?string $state) => $set('slug', \Illuminate\Support\Str::slug($state))),

                        \Filament\Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        \Filament\Forms\Components\Select::make('locations')
                            ->multiple()
                            ->options([
                                'header' => 'Header Navigation',
                                'footer' => 'Footer Navigation',
                                'sidebar' => 'Sidebar Navigation',
                                'mobile' => 'Mobile Menu',
                            ])
                            ->required(),

                        \Filament\Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                    ])
                    ->columns(2),

                \Filament\Schemas\Components\Section::make('Menu Items')
                    ->schema([
                        \Filament\Forms\Components\Repeater::make('items')
                            ->label('Menu Items')
                            ->schema([
                                \Filament\Forms\Components\TextInput::make('label')
                                    ->required()
                                    ->columnSpan(1),
                                \Filament\Forms\Components\TextInput::make('url')
                                    ->label('URL')
                                    ->columnSpan(1),
                                \Filament\Forms\Components\Select::make('target')
                                    ->options([
                                        '_self' => 'Same Tab',
                                        '_blank' => 'New Tab',
                                    ])
                                    ->default('_self')
                                    ->columnSpan(1),
                                \Filament\Forms\Components\Toggle::make('is_button')
                                    ->label('As Buttonn')
                                    ->default(false)
                                    ->columnSpan(1),

                                \Filament\Forms\Components\Repeater::make('children')
                                    ->label('Sub Items')
                                    ->schema([
                                        \Filament\Schemas\Components\Grid::make(3)
                                            ->schema([
                                                \Filament\Forms\Components\TextInput::make('label')
                                                    ->required()
                                                    ->columnSpan(1),
                                                \Filament\Forms\Components\TextInput::make('url')
                                                    ->label('URL')
                                                    ->columnSpan(1),
                                                \Filament\Forms\Components\Select::make('target')
                                                    ->options([
                                                        '_self' => 'Same Tab',
                                                        '_blank' => 'New Tab',
                                                    ])
                                                    ->default('_self')
                                                    ->columnSpan(1),
                                            ]),
                                    ])
                                    ->collapsible()
                                    ->itemLabel(fn(array $state): ?string => $state['label'] ?? null)
                                    ->columnSpanFull(),
                            ])
                            ->columns(4)
                            ->collapsible()
                            ->itemLabel(fn(array $state): ?string => $state['label'] ?? null),
                    ])
                    ->collapsible()
                    ->columnSpanFull(),
            ]);
    }
}
