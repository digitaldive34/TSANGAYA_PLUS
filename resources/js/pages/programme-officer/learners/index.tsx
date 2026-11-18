import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Users, MapPin, GraduationCap, Eye, Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTableFilters from '@/components/data-table-filters';

interface Centre {
    id: number;
    name: string;
}

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
    age: number | null;
    class_group: 'Class A' | 'Class B';
    status: 'active' | 'inactive';
    centre: Centre;
}

interface Props {
    centres: Centre[];
    totalLearners: number;
    filters: {
        search: string;
        class_group: string;
        status: string;
        centre_id: string;
    };
    learners: {
        data: Learner[];
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function LearnersIndex({
    learners,
    centres,
    totalLearners,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search);
    const [classFilter, setClassFilter] = useState(
        filters.class_group || 'all',
    );
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [centreFilter, setCentreFilter] = useState(
        filters.centre_id || 'all',
    );
    const applyFilters = () =>
        router.get(
            '/programme-officer/learners',
            {
                search: search || undefined,
                class_group: classFilter === 'all' ? undefined : classFilter,
                status: statusFilter === 'all' ? undefined : statusFilter,
                centre_id: centreFilter === 'all' ? undefined : centreFilter,
            },
            { preserveState: true, preserveScroll: true },
        );
    const clearFilters = () => {
        setSearch('');
        setClassFilter('all');
        setStatusFilter('all');
        setCentreFilter('all');
        router.get('/programme-officer/learners');
    };

    return (
        <>
            <Head title="Learner Management" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="font-small py-2 text-xs text-muted-foreground">
                            TSANGAYA+ / Programme Officer
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Learner Management
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Register and manage learners across Tsangaya
                            centres.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/programme-officer/learners/create">
                            <Plus className="mr-2 size-4" />
                            Register Learner
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Registered Learners
                        </CardTitle>
                        <Users className="size-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalLearners}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div>
                            <CardTitle>Registered Learners</CardTitle>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Search and view learner records.
                            </p>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <DataTableFilters
                            search={search}
                            searchPlaceholder="Search learner, code, or centre"
                            onSearchChange={setSearch}
                            filters={[
                                {
                                    key: 'class',
                                    label: 'Class',
                                    value: classFilter,
                                    onChange: setClassFilter,
                                    options: [
                                        { label: 'All classes', value: 'all' },
                                        { label: 'Class A', value: 'Class A' },
                                        { label: 'Class B', value: 'Class B' },
                                    ],
                                },
                                {
                                    key: 'status',
                                    label: 'Status',
                                    value: statusFilter,
                                    onChange: setStatusFilter,
                                    options: [
                                        { label: 'All statuses', value: 'all' },
                                        { label: 'Active', value: 'active' },
                                        {
                                            label: 'Inactive',
                                            value: 'inactive',
                                        },
                                    ],
                                },
                                {
                                    key: 'centre',
                                    label: 'Centre',
                                    value: centreFilter,
                                    onChange: setCentreFilter,
                                    options: [
                                        { label: 'All centres', value: 'all' },
                                        ...centres.map((centre) => ({
                                            label: centre.name,
                                            value: String(centre.id),
                                        })),
                                    ],
                                },
                            ]}
                            onApply={applyFilters}
                            onClear={clearFilters}
                        />

                        {learners.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <GraduationCap className="mx-auto mb-3 size-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    {search ||
                                    classFilter !== 'all' ||
                                    statusFilter !== 'all' ||
                                    centreFilter !== 'all'
                                        ? 'No matching learners found'
                                        : 'No learners registered yet'}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {learners.data.map((learner) => (
                                    <div
                                        key={learner.id}
                                        className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="font-semibold">
                                                {learner.full_name}
                                            </h3>

                                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                <span>
                                                    ID: {learner.learner_code}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <MapPin className="size-4" />
                                                    {learner.centre?.name ??
                                                        'No centre'}
                                                </span>

                                                <span>
                                                    {learner.class_group}
                                                </span>

                                                <span>
                                                    Age:{' '}
                                                    {learner.age ??
                                                        'Not specified'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Badge
                                                variant={
                                                    learner.status === 'active'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                            >
                                                {learner.status === 'active'
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </Badge>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/programme-officer/learners/${learner.id}`}
                                                >
                                                    <Eye className="mr-2 size-4" />
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap justify-end gap-2 pt-4">
                            {learners.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        link.active ? 'default' : 'outline'
                                    }
                                    size="sm"
                                    disabled={!link.url}
                                    asChild={!!link.url}
                                >
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            preserveScroll
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
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
