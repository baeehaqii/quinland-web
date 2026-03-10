<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function show(string $slug): Response
    {
        $page = Page::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Check if custom React component exists for this page
        $componentName = \Illuminate\Support\Str::studly($slug);
        $componentPath = resource_path("js/pages/{$componentName}.tsx");

        // Use custom component if exists, otherwise use generic Page component
        $component = file_exists($componentPath) ? $componentName : 'Page';

        return Inertia::render($component, [
            'page' => $page,
        ]);
    }
}
