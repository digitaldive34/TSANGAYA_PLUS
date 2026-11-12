import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Search, MapPin, Users, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    };
}

export default function CentresIndex({ centres }: Props) {
    const [search, setSearch] = useState("");

    const filteredCentres = centres.data.filter((centre) =>
        `${centre.name} ${centre.location}`
            .toLowerCase()
            .includes(search.toLowerCase()),
    );

    return (
        <>
            <Head title="Centre Management" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            TSANGAYA+
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Centre Management
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
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
                            <p className="text-2xl font-bold">
                                {centres.total}
                            </p>
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
                                {
                                    centres.data.filter(
                                        (centre) => centre.status === "active",
                                    ).length
                                }
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

                            <div className="relative w-full sm:max-w-xs">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search centres..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {filteredCentres.length === 0 ? (
                            <div className="py-12 text-center">
                                <MapPin className="mx-auto mb-3 size-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    {search
                                        ? "No matching centres found"
                                        : "No centres registered yet"}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {search
                                        ? "Try searching with another name or location."
                                        : "Registered Tsangaya centres will appear here."}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredCentres.map((centre) => (
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
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
