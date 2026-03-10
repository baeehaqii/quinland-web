<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use BackedEnum;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;
use Filament\Actions\Action;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Concerns\InteractsWithFormActions;
use Filament\Pages\Page;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use UnitEnum;

class ManageSettings extends Page implements HasForms
{
    use InteractsWithForms;
    use InteractsWithFormActions;
    use HasPageShield;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string|UnitEnum|null $navigationGroup = 'Akses Management';

    protected static ?string $title = 'Pengaturan Umum';

    protected static ?string $navigationLabel = 'Pengaturan Situs';

    protected static ?int $navigationSort = 100;

    public ?array $data = [];

    public function mount(GeneralSettings $settings): void
    {
        $this->form->fill([
            'site_name' => $settings->site_name,
            'site_logo' => $settings->site_logo,
            'site_favicon' => $settings->site_favicon,
            'theme_color' => $settings->theme_color,
            'site_description' => $settings->site_description,
            'site_meta_title' => $settings->site_meta_title,
            'site_meta_description' => $settings->site_meta_description,
            'site_meta_keywords' => $settings->site_meta_keywords,
            'site_og_title' => $settings->site_og_title,
            'site_og_description' => $settings->site_og_description,
            'site_og_image' => $settings->site_og_image,
            'header_scripts' => $settings->header_scripts,
            'body_scripts' => $settings->body_scripts,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Settings')
                    ->tabs([
                        Tab::make('Umum')
                            ->schema([
                                Section::make('Informasi Dasar')
                                    ->description('Atur identitas aplikasi Anda di sini.')
                                    ->schema([
                                        TextInput::make('site_name')
                                            ->label('Nama Situs')
                                            ->required()
                                            ->columnSpanFull(),

                                        Textarea::make('site_description')
                                            ->label('Deskripsi Singkat')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ])->columns(2),

                                Section::make('Tampilan & Tema')
                                    ->description('Sesuaikan warna dan logo untuk branding.')
                                    ->schema([
                                        FileUpload::make('site_logo')
                                            ->label('Logo Situs')
                                            ->image()
                                            ->disk('public')
                                            ->directory('settings')
                                            ->visibility('public')
                                            ->imageEditor()
                                            ->columnSpan(1),

                                        FileUpload::make('site_favicon')
                                            ->label('Favicon')
                                            ->image()
                                            ->disk('public')
                                            ->directory('settings')
                                            ->visibility('public')
                                            ->imageEditor()
                                            ->columnSpan(1),

                                        ColorPicker::make('theme_color')
                                            ->label('Warna Tema Utama')
                                            ->required()
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('SEO Website')
                            ->schema([
                                Section::make('Metadata (Global)')
                                    ->description('Pengaturan Metadata SEO Global.')
                                    ->schema([
                                        TextInput::make('site_meta_title')
                                            ->label('Meta Title')
                                            ->placeholder('Judul Website Default')
                                            ->columnSpanFull(),
                                        Textarea::make('site_meta_description')
                                            ->label('Meta Description')
                                            ->placeholder('Deskripsi Website Default')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        TextInput::make('site_meta_keywords')
                                            ->label('Meta Keywords')
                                            ->placeholder('keyword1, keyword2')
                                            ->columnSpanFull(),
                                    ]),

                                Section::make('Social Media (Open Graph)')
                                    ->description('Tampilan saat dibagikan di sosial media.')
                                    ->schema([
                                        FileUpload::make('site_og_image')
                                            ->label('OG Image (Default)')
                                            ->image()
                                            ->disk('public')
                                            ->directory('settings')
                                            ->visibility('public')
                                            ->imageEditor()
                                            ->columnSpanFull(),
                                        TextInput::make('site_og_title')
                                            ->label('OG Title')
                                            ->placeholder('Judul Open Graph Default')
                                            ->columnSpanFull(),
                                        Textarea::make('site_og_description')
                                            ->label('OG Description')
                                            ->placeholder('Deskripsi Open Graph Default')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Tab::make('Scripts & Tracking')
                            ->schema([
                                Section::make('Tracking & Scripts')
                                    ->description('Tambahkan script eksternal seperti GTM, Pixel, dll.')
                                    ->schema([
                                        Textarea::make('header_scripts')
                                            ->label('Header Scripts')
                                            ->placeholder('<script>...</script>')
                                            ->rows(5)
                                            ->columnSpanFull(),
                                        Textarea::make('body_scripts')
                                            ->label('Body Scripts')
                                            ->placeholder('<script>...</script>')
                                            ->rows(5)
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                    ])
                    ->persistTabInQueryString()
            ])
            ->statePath('data');
    }

    public function content(Schema $schema): Schema
    {
        return $schema
            ->components([
                $this->getFormContentComponent(),
            ]);
    }

    public function getFormContentComponent(): Component
    {
        return Form::make([EmbeddedSchema::make('form')])
            ->id('form')
            ->livewireSubmitHandler('save')
            ->footer([
                Actions::make($this->getFormActions())
                    ->alignment($this->getFormActionsAlignment())
                    ->fullWidth($this->hasFullWidthFormActions())
                    ->sticky($this->areFormActionsSticky())
                    ->key('form-actions'),
            ]);
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Simpan Perubahan')
                ->submit('save'),
        ];
    }

    public function save(GeneralSettings $settings): void
    {
        try {
            $data = $this->form->getState();

            $settings->site_name = $data['site_name'];
            $settings->site_logo = $data['site_logo'];
            $settings->site_favicon = $data['site_favicon'];
            $settings->theme_color = $data['theme_color'];
            $settings->site_description = $data['site_description'] ?? '';
            $settings->site_meta_title = $data['site_meta_title'] ?? '';
            $settings->site_meta_description = $data['site_meta_description'] ?? '';
            $settings->site_meta_keywords = $data['site_meta_keywords'] ?? '';
            $settings->site_og_title = $data['site_og_title'] ?? '';
            $settings->site_og_description = $data['site_og_description'] ?? '';
            $settings->site_og_image = $data['site_og_image'];
            $settings->header_scripts = $data['header_scripts'] ?? '';
            $settings->body_scripts = $data['body_scripts'] ?? '';

            $settings->save();

            Notification::make()
                ->title('Pengaturan berhasil disimpan')
                ->success()
                ->send();

            $this->redirect(static::getUrl());
        } catch (\Exception $exception) {
            Notification::make()
                ->title('Gagal menyimpan pengaturan')
                ->body($exception->getMessage())
                ->danger()
                ->send();
        }
    }
}
