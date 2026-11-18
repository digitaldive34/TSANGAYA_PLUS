import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-svh bg-slate-50 lg:grid lg:grid-cols-2">
            {/* Left Branding Panel */}
            <div className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
                <img
                    src="/images/tsangaya-hero.jpeg"
                    alt="Learners in a Tsangaya learning environment"
                    className="absolute inset-0 size-full object-cover opacity-25"
                />

                <div className="absolute inset-0 bg-linear-to-br from-slate-950/95 via-slate-900/80 to-slate-950/90" />

                <div className="relative z-10">
                    <Link
                        href={home()}
                        className="text-3xl font-bold tracking-tight text-white"
                    >
                        TSANGAYA<span className="text-amber-500">+</span>
                    </Link>

                    <p className="mt-2 text-sm text-slate-300">
                        Foundational Literacy • Numeracy • Quranic Education
                    </p>
                </div>

                <div className="relative z-10 max-w-xl">
                    <p className="text-sm font-semibold tracking-widest text-amber-500">
                        WELCOME TO TSANGAYA+
                    </p>

                    <h2 className="mt-5 text-4xl leading-tight font-bold text-white xl:text-5xl">
                        Making room for foundational learning.
                        <span className="block text-amber-500">
                            Alongside Quranic education.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
                        A platform for coordinating basic literacy, numeracy and
                        modern education within Tsangaya schedules, while
                        respecting Quranic learning.
                    </p>
                </div>
            </div>

            {/* Login Panel */}
            <div className="flex min-h-svh flex-col items-center justify-center px-6 py-10 sm:px-10">
                <div className="mb-10 w-full max-w-md lg:hidden">
                    <Link
                        href={home()}
                        className="text-2xl font-bold tracking-tight text-slate-900"
                    >
                        TSANGAYA<span className="text-amber-600">+</span>
                    </Link>

                    <p className="mt-2 text-sm text-slate-500">
                        Foundational Literacy • Numeracy • Quranic Education
                    </p>
                </div>

                <div className="w-full max-w-md">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                        <div className="mb-8">
                            <p className="text-sm font-semibold tracking-widest text-amber-600">
                                STAFF PORTAL
                            </p>

                            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                {title}
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {description}
                            </p>
                        </div>

                        {children}
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href={home()}
                            className="text-sm font-medium text-slate-500 transition hover:text-amber-600"
                        >
                            ← Back to homepage
                        </Link>
                    </div>
                </div>

                <p className="mt-10 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} TSANGAYA+. All rights reserved.
                </p>
            </div>
        </div>
    );
}
