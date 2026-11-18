import { usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const page = usePage();
    const { auth } = page.props;
    const showAdminActions =
        auth?.user?.role === 'Admin' &&
        page.url.split('?')[0] === '/admin/dashboard';

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {showAdminActions && (
                <div className="ml-auto flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Notifications"
                    >
                        <Bell className="size-4" />
                    </Button>

                    <Avatar>
                        <AvatarFallback className="bg-slate-900 text-white">
                            AD
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}
        </header>
    );
}
