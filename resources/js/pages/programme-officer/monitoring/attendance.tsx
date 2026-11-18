import { Head, router } from "@inertiajs/react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTableFilters from "@/components/data-table-filters";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Centre {
    id: number;
    name: string;
}

interface Session {
    id: number;
    centre_id: number;
    class_group: string;
    topic: string;
    session_date: string;
    centre: Centre;
    subject: { name: string };
    teacher: { name: string };
}

interface AttendanceRecord {
    id: number;
    status: "Present" | "Absent";
    learner: { full_name: string; learner_code: string };
    markedBy: { name: string };
}

interface Props {
    centres: Centre[];
    sessions: Session[];
    attendance: Record<string, AttendanceRecord[]>;
    filters: {
        centre_id?: string;
        session_id?: string;
    };
}

export default function AttendanceMonitoring({
    centres,
    sessions,
    attendance,
    filters,
}: Props) {
    const [centreId, setCentreId] = useState(filters.centre_id ?? "");
    const [sessionId, setSessionId] = useState(filters.session_id ?? "");
    const [search, setSearch] = useState("");
    const [attendanceStatus, setAttendanceStatus] = useState("all");

    const applyFilters = () => {
        router.get(
            "/programme-officer/monitoring/attendance",
            {
                centre_id: centreId || undefined,
                session_id: sessionId || undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const clearFilters = () => {
        setCentreId("");
        setSessionId("");
        setSearch("");
        setAttendanceStatus("all");
        router.get("/programme-officer/monitoring/attendance");
    };

    return (
        <>
            <Head title="Attendance Monitoring" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Attendance Monitoring
                    </h1>
                    <p className="text-muted-foreground">
                        View attendance records submitted by teachers.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filter Attendance</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium">
                                    Centre
                                </label>
                                <select
                                    value={centreId}
                                    onChange={(event) => {
                                        setCentreId(event.target.value);
                                        setSessionId("");
                                    }}
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                                >
                                    <option value="">All centres</option>
                                    {centres.map((centre) => (
                                        <option
                                            key={centre.id}
                                            value={centre.id}
                                        >
                                            {centre.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium">
                                    Learning session
                                </label>
                                <select
                                    value={sessionId}
                                    onChange={(event) =>
                                        setSessionId(event.target.value)
                                    }
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                                >
                                    <option value="">All sessions</option>
                                    {sessions.map((session) => (
                                        <option
                                            key={session.id}
                                            value={session.id}
                                        >
                                            {session.topic} -{" "}
                                            {session.session_date}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-end gap-2">
                                <Button onClick={applyFilters}>
                                    Apply Filters
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <DataTableFilters
                                search={search}
                                searchPlaceholder="Search learner name or code"
                                onSearchChange={setSearch}
                                filters={[
                                    {
                                        key: "attendance-status",
                                        label: "Attendance",
                                        value: attendanceStatus,
                                        onChange: setAttendanceStatus,
                                        options: [
                                            { label: "All statuses", value: "all" },
                                            { label: "Present", value: "Present" },
                                            { label: "Absent", value: "Absent" },
                                        ],
                                    },
                                ]}
                                onApply={applyFilters}
                                onClear={clearFilters}
                            />
                        </div>
                    </CardContent>
                </Card>

                {sessions.length === 0 ? (
                    <Card>
                        <CardContent className="py-10 text-center text-muted-foreground">
                            No learning sessions found.
                        </CardContent>
                    </Card>
                ) : (
                    sessions.map((session) => {
                        const records = attendance[String(session.id)] ?? [];
                        const filteredRecords = records.filter((record) => {
                            const matchesSearch =
                                `${record.learner?.full_name ?? ""} ${record.learner?.learner_code ?? ""}`
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            const matchesStatus =
                                attendanceStatus === "all" ||
                                record.status === attendanceStatus;
                            return matchesSearch && matchesStatus;
                        });
                        const present = filteredRecords.filter(
                            (record) => record.status === "Present",
                        ).length;
                        const absent = filteredRecords.filter(
                            (record) => record.status === "Absent",
                        ).length;

                        return (
                            <Card key={session.id}>
                                <CardHeader>
                                    <div className="flex flex-col justify-between gap-3 md:flex-row">
                                        <div>
                                            <CardTitle>
                                                {session.topic}
                                            </CardTitle>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {session.centre?.name} ·{" "}
                                                {session.subject?.name} ·{" "}
                                                {session.class_group}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Teacher: {session.teacher?.name}{" "}
                                                · Date: {session.session_date}
                                            </p>
                                        </div>

                                        <div className="flex gap-4 text-sm">
                                            <span className="text-green-600">
                                                Present: {present}
                                            </span>
                                            <span className="text-red-600">
                                                Absent: {absent}
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    {records.length === 0 ? (
                                        <p className="py-4 text-sm text-muted-foreground">
                                            No attendance has been recorded for
                                            this session.
                                        </p>
                                    ) : filteredRecords.length === 0 ? (
                                        <p className="py-4 text-sm text-muted-foreground">
                                            No attendance records match the current search and filters.
                                        </p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Learner
                                                        </TableHead>
                                                        <TableHead>
                                                            Learner Code
                                                        </TableHead>
                                                        <TableHead>
                                                            Attendance
                                                        </TableHead>
                                                        <TableHead>
                                                            Recorded By
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>

                                                <TableBody>
                                                    {filteredRecords.map((record) => (
                                                        <TableRow
                                                            key={record.id}
                                                        >
                                                            <TableCell>
                                                                {
                                                                    record
                                                                        .learner
                                                                        ?.full_name
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    record
                                                                        .learner
                                                                        ?.learner_code
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <span
                                                                    className={
                                                                        record.status ===
                                                                        "Present"
                                                                            ? "font-medium text-green-600"
                                                                            : "font-medium text-red-600"
                                                                    }
                                                                >
                                                                    {
                                                                        record.status
                                                                    }
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    record
                                                                        .markedBy
                                                                        ?.name
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </>
    );
}
