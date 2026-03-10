import React from 'react';
import { Head } from '@inertiajs/react';
import { Navbar } from "@/v0-ui-quinland/components/layout/navbar";
import { Footer } from "@/v0-ui-quinland/components/layout/footer";

export default function Login() {
    return (
        <>
            <Head title="Login" />
            <Navbar />

            <main className="min-h-screen bg-background pt-32 pb-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <h1 className="text-4xl font-bold text-foreground">Login</h1>
                    <p className="mt-4 text-muted-foreground">
                        This page was automatically generated.
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}