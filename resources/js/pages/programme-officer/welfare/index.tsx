import { Head, Link } from "@inertiajs/react";
import { CalendarDays, Eye, HeartHandshake, MapPin, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    welfareNeeds: {
        data: WelfareNeed[];
        total: number;
        links: PaginationLink[];
    };
}

export default function WelfareIndex({ welfareNeeds }: WelfareIndexProps) {
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
                        <h1 className="text-2xl font-bold tracking-tight">
                            Learner Welfare
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Monitor learner welfare needs and support provided
                            across Tsangaya centres.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/programme-officer/welfare/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Record Welfare Need
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <HeartHandshake className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Welfare Records
                            </p>
                            <p className="text-2xl font-bold">
                                {welfareNeeds.total}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Welfare Records</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {welfareNeeds.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <HeartHandshake className="mb-3 h-10 w-10 text-muted-foreground" />

                                <h3 className="font-semibold">
                                    No welfare records yet
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
