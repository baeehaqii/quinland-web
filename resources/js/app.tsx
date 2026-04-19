import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Quinland';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />

                <a
                    href="https://wa.me/6281215550665"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat WhatsApp"
                    className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
                >
                    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
                        <path d="M20.52 3.48A11.77 11.77 0 0012.16 0C5.65 0 .36 5.29.36 11.8c0 2.08.54 4.1 1.58 5.88L0 24l6.53-1.9a11.74 11.74 0 005.63 1.43h.01c6.51 0 11.8-5.3 11.8-11.81 0-3.15-1.23-6.1-3.45-8.24zm-8.36 18.06h-.01a9.75 9.75 0 01-4.96-1.36l-.36-.21-3.87 1.13 1.15-3.77-.23-.38a9.78 9.78 0 01-1.5-5.16c0-5.4 4.39-9.8 9.79-9.8 2.61 0 5.06 1.01 6.9 2.87a9.73 9.73 0 012.86 6.93c0 5.4-4.39 9.8-9.77 9.8zm5.37-7.34c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.14-.17.2-.35.22-.64.08-.29-.15-1.22-.45-2.33-1.44a8.8 8.8 0 01-1.62-2.01c-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.14-.17.2-.3.29-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.03 1-1.03 2.44 0 1.44 1.06 2.83 1.2 3.03.15.2 2.08 3.18 5.03 4.46.7.3 1.26.48 1.69.62.71.22 1.35.19 1.86.12.57-.08 1.72-.7 1.96-1.37.24-.68.24-1.25.17-1.37-.07-.12-.27-.2-.56-.35z" />
                    </svg>
                </a>
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
