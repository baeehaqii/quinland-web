<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi User')
                    ->schema([
                        TextEntry::make('name')
                            ->label('Nama'),

                        TextEntry::make('email')
                            ->label('Email'),

                        TextEntry::make('email_verified_at')
                            ->label('Email Terverifikasi')
                            ->dateTime('d M Y, H:i')
                            ->placeholder('-'),

                        TextEntry::make('created_at')
                            ->label('Dibuat')
                            ->dateTime('d M Y, H:i')
                            ->placeholder('-'),
                    ])
                    ->columns(2),

                Section::make('Roles & Permissions')
                    ->schema([
                        TextEntry::make('roles.name')
                            ->label('Role')
                            ->badge()
                            ->placeholder('Belum ada role'),
                    ]),
            ]);
    }
}
