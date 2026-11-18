import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Activity as ActivityIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

import ActivityTimeline, {
    type ActivityEntry,
} from '@/components/activity-timeline';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DataTableFilters from '@/components/data-table-filters';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedActivities {
    data: ActivityEntry[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
}

interface Props {
    activities: PaginatedActivities;
    filters: {
        search: string;
        role: string;
    };
}

export default function ActivityIndex({ activities, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const [role, setRole] = useState(filters.role || 'all');
    const applyFilters = () =>
        router.get(
            '/admin/activities',
            {
                search: search || undefined,
                role: role === 'all' ? undefined : role,
            },
            { preserveState: true, preserveScroll: true },
        );
    const clearFilters = () => {
        setSearch('');
        setRole('all');
        router.get('/admin/activities');
    };

    return (
        <>
            <Head title="Activity Monitoring" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                        <ActivityIcon className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Activity Monitoring
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Monitor activities performed across TSANGAYA+.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>System Activities</CardTitle>
                        <CardDescription>
                            A chronological feed of activity across all staff
                            roles.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="mb-4">
                            <DataTableFilters
                                search={search}
                                searchPlaceholder="Search user, role, action, or description"
                                onSearchChange={setSearch}
                                filters={[
                                    {
                                        key: 'role',
                                        label: 'Role',
                                        value: role,
                                        onChange: setRole,
                                        options: [
                                            {
                                                label: 'All roles',
                                                value: 'all',
                                            },
                                            { label: 'Admin', value: 'Admin' },
                                            {
                                                label: 'Programme Officer',
                                                value: 'Programme Officer',
                                            },
                                            {
                                                label: 'Teacher',
                                                value: 'Teacher',
                                            },
                                        ],
                                    },
                                ]}
                                onApply={applyFilters}
                                onClear={clearFilters}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Total recorded activities
                            </p>
                            <p className="text-2xl font-bold">
                                {activities.total}
                            </p>
                        </div>

                        <ActivityTimeline
                            activities={activities.data}
                            emptyMessage={
                                search || role !== 'all'
                                    ? 'No activities match this search or role.'
                                    : 'No staff activity has been recorded yet.'
                            }
                        />

                        {activities.last_page > 1 && (
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm text-muted-foreground">
                                    Page {activities.current_page} of{' '}
                                    {activities.last_page}
                                </p>

                                <div className="flex items-center gap-2">
                                    {activities.links.map((link, index) => {
                                        if (
                                            index === 0 ||
                                            index ===
                                                activities.links.length - 1
                                        ) {
                                            return link.url ? (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={link.url}>
                                                        {index === 0 ? (
                                                            <ChevronLeft className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </Link>
                                                </Button>
                                            ) : null;
                                        }

                                        return (
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
                                                    <Link href={link.url}>
                                                        {link.label}
                                                    </Link>
                                                ) : (
                                                    <span>{link.label}</span>
                                                )}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
