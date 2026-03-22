<?php

namespace App\Http\Middleware;

use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = app(GeneralSettings::class);
        $headerMenu = \App\Models\Menu::where('is_active', true)
            ->whereJsonContains('locations', 'header')
            ->first();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'menu' => $headerMenu ? $headerMenu->items : [],
            'settings' => [
                'site_name' => $settings->site_name ?? config('app.name'),
                'site_logo' => $settings->site_logo
                    ? Storage::disk('public')->url($settings->site_logo)
                    : null,
            ],
            'events' => fn () => \App\Models\Event::where('is_published', true)->orderBy('event_date', 'asc')->get()->map(function($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => $event->event_date ? $event->event_date->format('d M Y') : '-',
                    'image' => $event->image ? '/storage/' . $event->image : null,
                ];
            }),
            'faqs' => fn () => \App\Models\Faq::where('is_active', true)->orderBy('sort_order')->get()->map(function($faq) {
                return [
                    'id' => $faq->id,
                    'question' => $faq->question,
                    'answer' => $faq->answer,
                ];
            }),
            'partners' => fn () => \App\Models\Partner::where('is_active', true)->orderBy('sort_order')->get()->map(function($partner) {
                return [
                    'id' => $partner->id,
                    'name' => $partner->name,
                    'logo' => $partner->logo ? '/storage/' . $partner->logo : null,
                    'website_url' => $partner->website_url,
                ];
            }),
        ];
    }
}

