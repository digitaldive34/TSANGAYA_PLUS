import {
    Activity,
    BookOpenCheck,
    CalendarCheck,
    ClipboardCheck,
    ClipboardList,
    GraduationCap,
    HeartHandshake,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export interface ActivityEntry {
    id: number;
    user: {
        id: number;
        name: string;
    } | null;
    role: string | null;
    action: string;
    description: string;
    created_at: string;
}

interface ActivityTimelineProps {
    activities: ActivityEntry[];
    emptyMessage?: string;
}

function getActivityStyle(action: string) {
    if (action.startsWith('attendance')) {
        return {
            icon: ClipboardCheck,
            className: 'bg-teal-100 text-teal-700',
        };
    }

    if (action.startsWith('assessment')) {
        return {
            icon: ClipboardList,
            className: 'bg-blue-100 text-blue-700',
        };
    }

    if (action.startsWith('learning_session')) {
        return {
            icon: CalendarCheck,
            className: 'bg-violet-100 text-violet-700',
        };
    }

    if (action.startsWith('learner')) {
        return {
            icon: GraduationCap,
            className: 'bg-amber-100 text-amber-700',
        };
    }

    if (action.startsWith('welfare')) {
        return {
            icon: HeartHandshake,
            className: 'bg-rose-100 text-rose-700',
        };
    }

    return {
        icon: BookOpenCheck,
        className: 'bg-slate-100 text-slate-700',
    };
}

function formatAction(action: string) {
    return action
        .replaceAll('.', ' ')
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date: string) {
    return new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function ActivityTimeline({
    activities,
    emptyMessage = 'No activity has been recorded yet.',
}: ActivityTimelineProps) {
    if (activities.length === 0) {
        return (
            <div className="rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
                <Activity className="mx-auto mb-3 size-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-0">
            {activities.map((entry, index) => {
                const style = getActivityStyle(entry.action);
                const Icon = style.icon;

                return (
                    <div
                        key={entry.id}
                        className={`relative border-l border-border pl-6 ${
                            index === activities.length - 1
                                ? 'border-transparent pb-0'
                                : 'pb-4'
                        }`}
                    >
                        <div
                            className={`absolute top-0 -left-4 flex size-8 items-center justify-center rounded-full ring-4 ring-background ${style.className}`}
                        >
                            <Icon className="size-4" aria-hidden="true" />
                        </div>

                        <article className="rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/30">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                <div className="min-w-0 space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold">
                                            {entry.user?.name ?? 'Deleted user'}
                                        </span>
                                        <Badge variant="outline">
                                            {entry.role ?? 'Unknown role'}
                                        </Badge>
                                        <Badge variant="secondary">
                                            {formatAction(entry.action)}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {entry.description}
                                    </p>
                                </div>
                                <time
                                    dateTime={entry.created_at}
                                    className="shrink-0 text-xs text-muted-foreground sm:text-right"
                                >
                                    {formatDate(entry.created_at)}
                                </time>
                            </div>
                        </article>
                    </div>
                );
            })}
        </div>
    );
}
