import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Menu,
    BookOpen,
    ClipboardCheck,
    GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet';

export default function Welcome() {
    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen scroll-smooth bg-white text-slate-900">
                {/* Navigation */}
                <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-slate-900"
                        >
                            TSANGAYA<span className="text-amber-600">+</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-8 md:flex">
                            <a
                                href="#home"
                                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                            >
                                Home
                            </a>

                            <a
                                href="#about"
                                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                            >
                                About
                            </a>

                            <a
                                href="#support"
                                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                            >
                                What We Do
                            </a>

                            <a
                                href="#how-it-works"
                                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                            >
                                How It Works
                            </a>
                        </nav>

                        {/* Login */}
                        <div className="flex items-center gap-3">
                            <Button asChild className="hidden sm:inline-flex">
                                <Link href="/login">Log in</Link>
                            </Button>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="md:hidden"
                                        aria-label="Open navigation menu"
                                    >
                                        <Menu className="size-5" />
                                    </Button>
                                </SheetTrigger>

                                <SheetContent
                                    side="right"
                                    className="w-75 sm:w-87.5"
                                >
                                    <SheetHeader>
                                        <SheetTitle className="text-left text-xl font-bold">
                                            TSANGAYA
                                            <span className="text-amber-600">
                                                +
                                            </span>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <nav className="mt-8 flex flex-col gap-6">
                                        {[
                                            { label: 'Home', href: '#home' },
                                            { label: 'About', href: '#about' },
                                            {
                                                label: 'What We Do',
                                                href: '#support',
                                            },
                                            {
                                                label: 'How It Works',
                                                href: '#how-it-works',
                                            },
                                        ].map((item) => (
                                            <SheetClose asChild key={item.href}>
                                                <a
                                                    href={item.href}
                                                    className="text-base font-medium text-slate-700 transition hover:text-amber-600"
                                                >
                                                    {item.label}
                                                </a>
                                            </SheetClose>
                                        ))}

                                        <SheetClose asChild>
                                            <Button
                                                asChild
                                                className="mt-2 w-full"
                                            >
                                                <Link href="/login">
                                                    Staff Login
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main id="home">
                    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Hero Content */}
                            <div>
                                <p className="text-sm font-semibold tracking-wide text-amber-600">
                                    FOUNDATIONAL LITERACY • NUMERACY •
                                    THOUGHTFUL SCHEDULING
                                </p>

                                <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                    Supporting learning.
                                    <span className="block text-slate-700">
                                        Strengthening futures.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                                    TSANGAYA+ supports Tsangaya scheduling
                                    optimisation so basic literacy, numeracy and
                                    other foundational modern education can
                                    complement Quranic learning.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Button asChild size="lg">
                                        <Link href="/login">
                                            Log in to the platform
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>

                                    <Button asChild variant="outline" size="lg">
                                        <a href="#about">Learn more</a>
                                    </Button>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative">
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <img
                                        src="/images/tsangaya-hero.jpeg"
                                        alt="Learners participating in a classroom"
                                        className="h-112.5 w-full object-cover sm:h-137.5"
                                    />
                                </div>

                                {/* Small Information Card */}
                                <div className="absolute -bottom-6 -left-4 hidden max-w-xs rounded-xl border border-slate-200 bg-white p-5 shadow-lg sm:block">
                                    <p className="text-sm font-semibold text-slate-900">
                                        Learning that fits the Tsangaya day
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Coordinate foundational lessons with
                                        existing learning commitments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section
                        id="about"
                        className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-24"
                    >
                        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
                            <div>
                                <p className="text-sm font-semibold tracking-widest text-amber-600">
                                    ABOUT TSANGAYA+
                                </p>

                                <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Foundational learning alongside Quranic
                                    education.
                                </h2>

                                <p className="mt-6 text-base leading-8 text-slate-600">
                                    TSANGAYA+ is built around a practical goal:
                                    help reduce the number of out-of-school
                                    children by making foundational education
                                    accessible through Tsangaya communities,
                                    while Quranic education remains respected.
                                </p>

                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    TSANGAYA+ focuses on optimising Tsangaya
                                    schedules to make room for foundational
                                    literacy, numeracy and other basic modern
                                    education without replacing Quranic
                                    learning.
                                </p>

                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    We aim to help reduce the number of
                                    out-of-school children by supporting access
                                    to foundational learning through better
                                    coordinated schedules.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
                                <h3 className="text-xl font-bold text-slate-900">
                                    Our purpose
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    To make foundational literacy and numeracy
                                    accessible through Tsangaya schedules that
                                    respect Quranic education.
                                </p>

                                <div className="mt-8 space-y-6">
                                    {[
                                        {
                                            number: '01',
                                            title: 'Thoughtful scheduling',
                                            description:
                                                'Coordinate basic education sessions with existing Tsangaya and Quranic learning.',
                                        },
                                        {
                                            number: '02',
                                            title: 'Foundational skills',
                                            description:
                                                'Make space for literacy, numeracy and other essential modern learning.',
                                        },
                                        {
                                            number: '03',
                                            title: 'Wider access',
                                            description:
                                                'Support efforts to reach children who are out of school with a pathway to learning.',
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.number}
                                            className="flex gap-4"
                                        >
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-sm font-bold text-amber-700">
                                                {item.number}
                                            </span>

                                            <div>
                                                <h4 className="font-semibold text-slate-900">
                                                    {item.title}
                                                </h4>
                                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What We Do Section */}
                    <section
                        id="support"
                        className="bg-white px-6 py-20 lg:px-8 lg:py-24"
                    >
                        <div className="mx-auto max-w-7xl">
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-sm font-semibold tracking-widest text-amber-600">
                                    WHAT WE DO
                                </p>

                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    A practical way to integrate foundational
                                    education.
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600">
                                    TSANGAYA+ is centred on coordinating
                                    foundational education with existing
                                    Tsangaya schedules, not replacing Quranic
                                    learning.
                                </p>
                            </div>

                            <div className="mt-14 grid gap-6 md:grid-cols-3">
                                <Card className="border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <CardHeader>
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                            <BookOpen className="size-6" />
                                        </div>

                                        <CardTitle className="pt-3 text-xl">
                                            Scheduling That Fits
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm leading-7 text-slate-600">
                                            Plan literacy and numeracy sessions
                                            around Tsangaya commitments so
                                            foundational lessons complement
                                            Quranic education.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <CardHeader>
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                            <ClipboardCheck className="size-6" />
                                        </div>

                                        <CardTitle className="pt-3 text-xl">
                                            Foundational Learning
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm leading-7 text-slate-600">
                                            Introduce basic literacy, numeracy
                                            and other modern education within an
                                            organised learning programme.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <CardHeader>
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                            <GraduationCap className="size-6" />
                                        </div>

                                        <CardTitle className="pt-3 text-xl">
                                            Participation
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm leading-7 text-slate-600">
                                            Use learner records and attendance
                                            to understand participation and
                                            identify where follow-up may help.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section
                        id="how-it-works"
                        className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-24"
                    >
                        <div className="mx-auto max-w-7xl">
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-sm font-semibold tracking-widest text-amber-600">
                                    HOW IT WORKS
                                </p>

                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Coordinating learning around each learner.
                                </h2>

                                <p className="mt-5 leading-8 text-slate-600">
                                    Administrators, programme officers and
                                    teachers can coordinate schedules and
                                    participation while keeping Quranic
                                    education respected.
                                </p>
                            </div>

                            <div className="mt-14 grid gap-8 md:grid-cols-3">
                                {[
                                    {
                                        number: '01',
                                        title: 'Administration',
                                        description:
                                            'Administrators plan and assign foundational learning sessions around the Tsangaya schedule.',
                                    },
                                    {
                                        number: '02',
                                        title: 'Learner Support',
                                        description:
                                            'Programme officers maintain learner records and help identify children who may benefit from access to the programme.',
                                    },
                                    {
                                        number: '03',
                                        title: 'Teaching & Monitoring',
                                        description:
                                            'Teachers deliver literacy, numeracy and other planned lessons, and record attendance and progress.',
                                    },
                                ].map((step) => (
                                    <Card
                                        key={step.number}
                                        className="border-slate-200 bg-white shadow-sm"
                                    >
                                        <CardHeader>
                                            <span className="text-sm font-bold tracking-widest text-amber-600">
                                                STEP {step.number}
                                            </span>

                                            <CardTitle className="pt-2 text-xl">
                                                {step.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-sm leading-7 text-slate-600">
                                                {step.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <Button asChild size="lg">
                                    <Link href="/login">
                                        Access the platform
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Our Impact Section */}
                    <section className="bg-white px-6 py-20 lg:px-8 lg:py-24">
                        <div className="mx-auto max-w-7xl">
                            <div className="grid items-center gap-12 lg:grid-cols-2">
                                <div>
                                    <p className="text-sm font-semibold tracking-widest text-amber-600">
                                        OUR INTENDED IMPACT
                                    </p>

                                    <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">
                                        Making foundational learning reachable
                                        through Tsangaya.
                                    </h2>

                                    <p className="mt-6 leading-8 text-slate-600">
                                        We aim to reduce the number of
                                        out-of-school children by creating
                                        practical opportunities to learn
                                        foundational skills within Tsangaya
                                        communities.
                                    </p>

                                    <p className="mt-4 leading-8 text-slate-600">
                                        Better coordinated schedules can make
                                        space for basic literacy, numeracy and
                                        modern education without displacing
                                        Quranic learning.
                                    </p>

                                    <Button asChild className="mt-8" size="lg">
                                        <Link href="/login">
                                            Get started
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-slate-900 p-7 text-white sm:col-span-2">
                                        <p className="text-sm font-medium text-amber-400">
                                            OUR VISION
                                        </p>
                                        <h3 className="mt-3 text-2xl leading-relaxed font-semibold">
                                            Foundational literacy and numeracy,
                                            scheduled alongside respected
                                            Quranic education.
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                        <h3 className="font-semibold text-slate-900">
                                            Coordinated schedules
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Plan lessons around existing
                                            Tsangaya commitments.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                        <h3 className="font-semibold text-slate-900">
                                            More access to learning
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Help more children participate in
                                            foundational education.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section className="bg-slate-900 px-6 py-20 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <p className="text-sm font-semibold tracking-widest text-amber-400">
                                BE PART OF THE JOURNEY
                            </p>

                            <h2 className="mt-4 text-3xl leading-tight font-bold text-white sm:text-4xl">
                                Foundational learning, in harmony with Quranic
                                education.
                            </h2>

                            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
                                TSANGAYA+ supports Tsangaya communities to
                                coordinate basic literacy, numeracy and modern
                                education with existing Quranic learning.
                            </p>

                            <Button
                                asChild
                                size="lg"
                                className="mt-8 bg-slate-900 text-white hover:bg-slate-800"
                            >
                                <Link href="/login">
                                    Access the platform
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-slate-950 px-6 py-12 text-white lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                            <div className="lg:col-span-2">
                                <Link
                                    href="/"
                                    className="text-2xl font-bold tracking-tight"
                                >
                                    TSANGAYA
                                    <span className="text-amber-500">+</span>
                                </Link>

                                <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
                                    Integrating foundational literacy and
                                    numeracy into Tsangaya schedules while
                                    respecting Quranic education.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold">Quick Links</h3>

                                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                                    <li>
                                        <a
                                            href="#home"
                                            className="transition hover:text-white"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#about"
                                            className="transition hover:text-white"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#support"
                                            className="transition hover:text-white"
                                        >
                                            What We Do
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#how-it-works"
                                            className="transition hover:text-white"
                                        >
                                            How It Works
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold">Platform</h3>

                                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                                    <li>
                                        <Link
                                            href="/login"
                                            className="transition hover:text-white"
                                        >
                                            Staff Login
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            href="#about"
                                            className="transition hover:text-white"
                                        >
                                            Our Mission
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-slate-800 pt-6">
                            <p className="text-center text-sm text-slate-500">
                                © {new Date().getFullYear()} TSANGAYA+. All
                                rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
