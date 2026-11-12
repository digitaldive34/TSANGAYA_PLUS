
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Building2 } from "lucide-react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    location: string;
    learner_population: number | null;
    internet_availability: string | null;
    electricity_availability: string | null;
    technology_readiness: string | null;
    status: "active" | "inactive";
}

interface Props {
    centre: Centre;
}

export default function EditCentre({ centre }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: centre.name,
        location: centre.location,
        learner_population: centre.learner_population?.toString() ?? "",
        internet_availability: centre.internet_availability ?? "Not Available",
        electricity_availability: centre.electricity_availability ?? "Not Available",
        technology_readiness: centre.technology_readiness ?? "Low",
        status: centre.status,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        put(`/admin/centres/${centre.id}`);
    };

    return (
        <>
            <Head title={`Edit ${centre.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/centres/${centre.id}`}>
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            TSANGAYA+ / Centre Management
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Edit Centre
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update the information for {centre.name}.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="size-5" />
                                Centre Information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Centre Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData("location", e.target.value)}
                                    required
                                />
                                <InputError message={errors.location} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="learner_population">
                                    Total Learner Population
                                </Label>
                                <Input
                                    id="learner_population"
                                    type="number"
                                    min="0"
                                    value={data.learner_population}
                                    onChange={(e) =>
                                        setData("learner_population", e.target.value)
                                    }
                                />
                                <InputError message={errors.learner_population} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Infrastructure and Technology</CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Internet Availability</Label>
                                <Select
                                    value={data.internet_availability}
                                    onValueChange={(value) =>
                                        setData("internet_availability", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Limited">Limited</SelectItem>
                                        <SelectItem value="Not Available">Not Available</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Electricity Availability</Label>
                                <Select
                                    value={data.electricity_availability}
                                    onValueChange={(value) =>
                                        setData("electricity_availability", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Limited">Limited</SelectItem>
                                        <SelectItem value="Not Available">Not Available</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Technology Readiness</Label>
                                <Select
                                    value={data.technology_readiness}
                                    onValueChange={(value) =>
                                        setData("technology_readiness", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select readiness level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Centre Status</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) =>
                                    setData("status", value as "active" | "inactive")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <Button variant="outline" asChild>
                            <Link href={`/admin/centres/${centre.id}`}>
                                Cancel
                            </Link>
                        </Button>

                        <Button type="submit" disabled={processing}>
                            {processing ? "Updating..." : "Update Centre"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
