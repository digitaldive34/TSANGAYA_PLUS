import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    HeartHandshake,
    MapPin,
    UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface WelfareSupport {
    id: number;
    support_type: string;
    description: string;
    date_provided: string;
    notes: string | null;
    recorded_by: {
        name: string;
    };
}

interface WelfareNeed {
    id: number;
    category: string;
    description: string;
    status: string;
    identified_date: string;
    created_at: string;
    learner: {
        id: number;
        learner_code: string;
        full_name: string;
        centre: {
            name: string;
        };
    };
    recorded_by: {
        name: string;
    };
    supports: WelfareSupport[];
}

interface WelfareShowProps {
    welfareNeed: WelfareNeed;
}

export default function WelfareShow({ welfareNeed }: WelfareShowProps) {
    const statusVariant =
        welfareNeed.status === 'Resolved'
            ? 'default'
            : welfareNeed.status === 'In Progress'
              ? 'secondary'
              : 'outline';

    const handleStatusChange = (status: string) => {
        router.patch(
            `/programme-officer/welfare/${welfareNeed.id}/status`,
            { status },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Welfare Details" />

            <div className="space-y-6 p-6">
                {/* Page Header */}
                {/* Page Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/programme-officer/welfare">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Welfare Details
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                View the learner's welfare concern and support
                                history.
                            </p>
                        </div>
                    </div>

                    <Button asChild>
                        <Link
                            href={`/programme-officer/welfare/${welfareNeed.id}/supports/create`}
                        >
                            <HeartHandshake className="mr-2 h-4 w-4" />
                            Record Support
                        </Link>
                    </Button>
                </div>

                {/* Welfare Information */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <HeartHandshake className="h-5 w-5" />
                                    {welfareNeed.category}
                                </CardTitle>
                                <CardDescription>
                                    Welfare record #{welfareNeed.id}
                                </CardDescription>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant={statusVariant}>
                                    {welfareNeed.status}
                                </Badge>

                                <Select
                                    value={welfareNeed.status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger className="w-37.5">
                                        <SelectValue placeholder="Change status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Open">
                                            Open
                                        </SelectItem>
                                        <SelectItem value="In Progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="Resolved">
                                            Resolved
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Description
                            </p>
                            <p className="mt-1 text-sm leading-6">
                                {welfareNeed.description}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Date Identified
                                    </p>
                                    <p className="font-medium">
                                        {welfareNeed.identified_date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <UserRound className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Recorded By
                                    </p>
                                    <p className="font-medium">
                                        {welfareNeed.recorded_by.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Learner Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Learner Information</CardTitle>
                        <CardDescription>
                            Details of the learner associated with this welfare
                            record.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Full Name
                            </p>
                            <p className="font-medium">
                                {welfareNeed.learner.full_name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Learner Code
                            </p>
                            <p className="font-medium">
                                {welfareNeed.learner.learner_code}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 sm:col-span-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Tsangaya Centre
                                </p>
                                <p className="font-medium">
                                    {welfareNeed.learner.centre.name}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Support History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Support History</CardTitle>
                        <CardDescription>
                            Assistance recorded for this welfare concern.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {welfareNeed.supports.length === 0 ? (
                            <div className="py-8 text-center">
                                <HeartHandshake className="mx-auto h-10 w-10 text-muted-foreground/50" />
                                <p className="mt-3 font-medium">
                                    No support recorded yet
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Support provided will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {welfareNeed.supports.map((support) => (
                                    <div
                                        key={support.id}
                                        className="rounded-lg border p-4"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="font-semibold">
                                                {support.support_type}
                                            </h3>
                                            <span className="text-sm text-muted-foreground">
                                                {support.date_provided}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm">
                                            {support.description}
                                        </p>

                                        {support.notes && (
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Notes: {support.notes}
                                            </p>
                                        )}

                                        <p className="mt-3 text-xs text-muted-foreground">
                                            Recorded by:{' '}
                                            {support.recorded_by.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
