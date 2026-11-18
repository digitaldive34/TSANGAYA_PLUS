import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Activity } from 'lucide-react';

import ActivityTimeline, {
    type ActivityEntry,
} from '@/components/activity-timeline';
import DataTableFilters from '@/components/data-table-filters';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    activities: {
        data: ActivityEntry[];
        links: PaginationLink[];
        total: number;
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

export default function TeacherActivities({ activities, filters }: Props) {
    const [search, setSearch] = useState(filters.search);

    const applySearch = () =>
        router.get(
            '/programme-officer/monitoring/activities',
            { search: search || undefined },
            { preserveState: true, preserveScroll: true },
        );

    const clearSearch = () => {
        setSearch('');
        router.get('/programme-officer/monitoring/activities');
    };

    return (
        <>
            <Head title="Teacher Activity" />

            <div className="space-y-5 p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <Activity className="size-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Teacher Activity
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Follow teaching updates, attendance, and assessment
                            activity across the programme.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity Timeline</CardTitle>
                        <CardDescription>
                            {activities.total} teacher activities recorded.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <DataTableFilters
                            search={search}
                            searchPlaceholder="Search teacher, activity, or description"
                            onSearchChange={setSearch}
                            onApply={applySearch}
                            onClear={clearSearch}
                        />

                        <ActivityTimeline
                            activities={activities.data}
                            emptyMessage={
                                search
                                    ? 'No teacher activities match this search.'
                                    : 'Teacher actions will appear here when recorded.'
                            }
                        />

                        {activities.last_page > 1 && (
                            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                                <p className="text-sm text-muted-foreground">
                                    Page {activities.current_page} of{' '}
                                    {activities.last_page}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {activities.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                            asChild={!!link.url}
                                        >
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    preserveScroll
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
