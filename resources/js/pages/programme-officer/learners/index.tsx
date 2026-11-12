import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Search, Users, MapPin, GraduationCap, Eye, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Centre {
    id: number;
    name: string;
}

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
    age: number | null;
    class_group: "Class A" | "Class B";
    status: "active" | "inactive";
    centre: Centre;
}

interface Props {
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

export default function LearnersIndex({ learners }: Props) {
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredLearners = learners.data.filter((learner) => {
        const matchesSearch =
            `${learner.full_name} ${learner.learner_code} ${learner.centre?.name ?? ""}`
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesClass =
            classFilter === "all" || learner.class_group === classFilter;

        const matchesStatus =
            statusFilter === "all" || learner.status === statusFilter;

        return matchesSearch && matchesClass && matchesStatus;
    });

    return (
        <>
            <Head title="Learner Management" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
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
                        <p className="text-2xl font-bold">{learners.total}</p>
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
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="relative sm:col-span-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search learners..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>

                            <Select
                                value={classFilter}
                                onValueChange={setClassFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Classes
                                    </SelectItem>
                                    <SelectItem value="Class A">
                                        Class A
                                    </SelectItem>
                                    <SelectItem value="Class B">
                                        Class B
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        Inactive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {filteredLearners.length === 0 ? (
                            <div className="py-12 text-center">
                                <GraduationCap className="mx-auto mb-3 size-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    {search ||
                                    classFilter !== "all" ||
                                    statusFilter !== "all"
                                        ? "No matching learners found"
                                        : "No learners registered yet"}
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredLearners.map((learner) => (
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
                                                        "No centre"}
                                                </span>

                                                <span>
                                                    {learner.class_group}
                                                </span>

                                                <span>
                                                    Age:{" "}
                                                    {learner.age ??
                                                        "Not specified"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Badge
                                                variant={
                                                    learner.status === "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {learner.status === "active"
                                                    ? "Active"
                                                    : "Inactive"}
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
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
