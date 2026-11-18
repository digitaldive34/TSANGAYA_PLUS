import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { CalendarDays, Eye, HeartHandshake, MapPin, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTableFilters from "@/components/data-table-filters";

interface WelfareNeed {
    id: number;
    category: string;
    description: string;
    status: string;
    identified_date: string;
    learner: {
        id: number;
        full_name: string;
        learner_code: string;
        centre: {
            name: string;
        };
    };
    recorded_by: {
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface WelfareIndexProps {
    totalWelfareNeeds: number;
    filters: {
        search: string;
        category: string;
        status: string;
    };
    welfareNeeds: {
        data: WelfareNeed[];
        total: number;
        links: PaginationLink[];
    };
}

export default function WelfareIndex({
    welfareNeeds,
    totalWelfareNeeds,
    filters,
}: WelfareIndexProps) {
    const [search, setSearch] = useState(filters.search);
    const [category, setCategory] = useState(filters.category || "all");
    const [status, setStatus] = useState(filters.status || "all");
    const applyFilters = () =>
        router.get(
            "/programme-officer/welfare",
            {
                search: search || undefined,
                category: category === "all" ? undefined : category,
                status: status === "all" ? undefined : status,
            },
            { preserveState: true, preserveScroll: true },
        );
    const clearFilters = () => {
        setSearch("");
        setCategory("all");
        setStatus("all");
        router.get("/programme-officer/welfare");
    };

    const formatDate = (date: string) => {
        return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const statusVariant = (status: string) => {
        switch (status) {
            case "Resolved":
                return "default";
            case "In Progress":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <>
            <Head title="Learner Welfare" />

            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl px-6 pt-3 font-bold tracking-tight">
                            Learner Welfare
                        </h1>
                        <p className="text-sm font-small px-6 text-muted-foreground">
                            Monitor learner welfare needs and support provided
                            across Tsangaya centres.
                        </p>
                    </div>

                    <Button asChild className="mx-6">
                        <Link href="/programme-officer/welfare/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Record Welfare Need
                        </Link>
                    </Button>
                </div>

                <Card className="mx-6">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <HeartHandshake className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Welfare Records
                            </p>
                            <p className="text-2xl font-bold">
                                {totalWelfareNeeds}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mx-6">
                    <CardHeader>
                        <CardTitle>Welfare Records</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <DataTableFilters
                            search={search}
                            searchPlaceholder="Search learner, centre, code, or description"
                            onSearchChange={setSearch}
                            filters={[
                                {
                                    key: "category",
                                    label: "Category",
                                    value: category,
                                    onChange: setCategory,
                                    options: [
                                        {
                                            label: "All categories",
                                            value: "all",
                                        },
                                        {
                                            label: "Clothing",
                                            value: "Clothing",
                                        },
                                        { label: "Health", value: "Health" },
                                        {
                                            label: "Learning Materials",
                                            value: "Learning Materials",
                                        },
                                        { label: "Other", value: "Other" },
                                    ],
                                },
                                {
                                    key: "status",
                                    label: "Status",
                                    value: status,
                                    onChange: setStatus,
                                    options: [
                                        { label: "All statuses", value: "all" },
                                        { label: "Open", value: "Open" },
                                        {
                                            label: "In Progress",
                                            value: "In Progress",
                                        },
                                        {
                                            label: "Resolved",
                                            value: "Resolved",
                                        },
                                    ],
                                },
                            ]}
                            onApply={applyFilters}
                            onClear={clearFilters}
                        />
                        {welfareNeeds.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <HeartHandshake className="mb-3 h-10 w-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    {search ||
                                    category !== "all" ||
                                    status !== "all"
                                        ? "No matching welfare records found"
                                        : "No welfare records yet"}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Recorded learner welfare needs will appear
                                    here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {welfareNeeds.data.map((need) => (
                                    <div
                                        key={need.id}
                                        className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                                    >
                                        <div className="min-w-0 space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {need.learner.full_name}
                                                </h3>

                                                <Badge variant="outline">
                                                    {need.category}
                                                </Badge>

                                                <Badge
                                                    variant={statusVariant(
                                                        need.status,
                                                    )}
                                                >
                                                    {need.status}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                {need.learner.learner_code}
                                            </p>

                                            <p className="text-sm">
                                                {need.description}
                                            </p>

                                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {need.learner.centre.name}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    {formatDate(
                                                        need.identified_date,
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={`/programme-officer/welfare/${need.id}`}
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {welfareNeeds.links.length > 3 && (
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {welfareNeeds.links.map((link, index) => (
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
                                            <Link href={link.url}>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            </Link>
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
