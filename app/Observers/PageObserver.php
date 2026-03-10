<?php

namespace App\Observers;

use App\Models\Page;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     */
    public function created(Page $page): void
    {
        $this->generateReactComponent($page);
    }

    /**
     * Handle the Page "updated" event.
     */
    public function updated(Page $page): void
    {
        // Regenerate component if slug changed
        if ($page->wasChanged('slug')) {
            $this->generateReactComponent($page);
        }
    }

    /**
     * Generate React component for the page
     */
    protected function generateReactComponent(Page $page): void
    {
        $componentName = Str::studly($page->slug);
        $filePath = resource_path("js/pages/{$componentName}.tsx");

        // Don't overwrite existing custom components
        if (File::exists($filePath)) {
            return;
        }

        $template = $this->getReactTemplate($componentName, $page);

        File::ensureDirectoryExists(dirname($filePath));
        File::put($filePath, $template);
    }

    /**
     * Get React component template
     */
    protected function getReactTemplate(string $componentName, Page $page): string
    {
        return <<<TSX
import React from 'react';
import { Head } from '@inertiajs/react';

interface {$componentName}Props {
    page: {
        id: number;
        title: string;
        slug: string;
        content: string;
        seo_title?: string;
        seo_description?: string;
    };
}

/**
 * {$page->title} Page
 * 
 * Auto-generated component for page: {$page->slug}
 * 
 * INSTRUCTIONS FOR DEVELOPER:
 * 1. Customize the layout and design below
 * 2. The 'page' prop contains all data from the database
 * 3. Use Tailwind CSS for styling
 * 4. Remove this comment block when done
 */
export default function {$componentName}({ page }: {$componentName}Props) {
    return (
        <>
            <Head>
                <title>{page.seo_title || page.title}</title>
                {page.seo_description && (
                    <meta name="description" content={page.seo_description} />
                )}
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <header className="mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {page.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Customize this component in resources/js/pages/{$componentName}.tsx
                        </p>
                    </header>

                    {/* Main Content */}
                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </article>

                    {/* 
                        TODO: Add custom sections here
                        Examples:
                        - Team members grid
                        - Contact form
                        - FAQ accordion
                        - Image gallery
                        - etc.
                    */}
                </div>
            </div>
        </>
    );
}

TSX;
    }

    /**
     * Handle the Page "deleted" event.
     */
    public function deleted(Page $page): void
    {
        // Optionally: Ask before deleting or just leave the component
        // For safety, we'll leave the component file intact
    }
}
