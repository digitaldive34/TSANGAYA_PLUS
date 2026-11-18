import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { MapPin, Users, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTableFilters from "@/components/data-table-filters";

interface Centre {
    id: number;
    name: string;
    location: string;
    learner_population: number | null;
    internet_availability: string | null;
    electricity_availability: string | null;
    technology_readiness: string | null;
    status: "active" | "inactive";
}

interface Props {
    centres: {
        data: Centre[];
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    totalCentres: number;
    activeCentres: number;
    filters: {
        search: string;
        status: string;
    };
}

export default function CentresIndex({
    centres,
    totalCentres,
    activeCentres,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status || "all");

    const applyFilters = () => {
        router.get(
            "/admin/centres",
            {
                search: search || undefined,
                status: status === "all" ? undefined : status,
            },
            { preserveState: true, preserveScroll: true },
        );
    };
    const clearFilters = () => {
        setSearch("");
        setStatus("all");
        router.get("/admin/centres");
    };

    return (
        <>
            <Head title="Centre Management" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs py-2 font-medium text-muted-foreground">
                            TSANGAYA+
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Centre Management
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage and monitor registered Tsangaya centres.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/centres/create">
                            <Plus className="mr-2 size-4" />
                            Add Centre
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Centres
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{totalCentres}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active Centres
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {activeCentres}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle>Registered Centres</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    View and manage Tsangaya centres.
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <DataTableFilters
                            search={search}
                            searchPlaceholder="Search centres by name or location"
                            onSearchChange={setSearch}
                            filters={[
                                {
                                    key: "status",
                                    label: "Status",
                                    value: status,
                                    onChange: setStatus,
                                    options: [
                                        { label: "All statuses", value: "all" },
                                        { label: "Active", value: "active" },
                                        {
                                            label: "Inactive",
                                            value: "inactive",
                                        },
                                    ],
                                },
                            ]}
                            onApply={applyFilters}
                            onClear={clearFilters}
                        />
                        {centres.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <MapPin className="mx-auto mb-3 size-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    {search || status !== "all"
                                        ? "No matching centres found"
                                        : "No centres registered yet"}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {search || status !== "all"
                                        ? "Try searching with another name or location."
                                        : "Registered Tsangaya centres will appear here."}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {centres.data.map((centre) => (
                                    <div
                                        key={centre.id}
                                        className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="font-semibold">
                                                {centre.name}
                                            </h3>

                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="size-4" />
                                                    {centre.location}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <Users className="size-4" />
                                                    {centre.learner_population ??
                                                        "Not specified"}{" "}
                                                    learners
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Badge
                                                variant={
                                                    centre.status === "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {centre.status === "active"
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/admin/centres/${centre.id}`}
                                                >
                                                    <Eye className="mr-2 size-4" />
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {centres.links.length > 3 && (
                            <div className="flex flex-wrap justify-end gap-2">
                                {centres.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            link.active ? "default" : "outline"
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
