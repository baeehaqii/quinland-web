import React from 'react';
import { Head } from '@inertiajs/react';

interface PageProps {
    page: {
        id: number;
        title: string;
        slug: string;
        content: string;
        seo_title?: string;
        seo_description?: string;
    };
}

export default function Page({ page }: PageProps) {
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
                    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {page.title}
                            </h1>
                        </header>

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </article>
                </div>
            </div>
        </>
    );
}
