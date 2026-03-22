<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->disabled()
                    ->dehydrated(false)
                    ->helperText('Otomatis dibuat dari title.'),
                Textarea::make('description')
                    ->columnSpanFull(),
                \Filament\Forms\Components\RichEditor::make('content')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                DatePicker::make('event_date'),
                Toggle::make('is_published')
                    ->required(),
            ]);
    }
}
