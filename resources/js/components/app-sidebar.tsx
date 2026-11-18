import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    BookOpen,
    Building2,
    ClipboardCheck,
    GraduationCap,
    HeartHandshake,
    LayoutDashboard,
    Users,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import admin from '@/routes/admin';
import programmeOfficer from '@/routes/programme-officer';
import teacher from '@/routes/teacher';
import { dashboard } from '@/routes';
import type { NavItem, SharedPageProps } from '@/types';

export function AppSidebar() {
    const { auth } = usePage<SharedPageProps>().props;
    const role = auth?.user?.role;

    let dashboardUrl = dashboard();
    let navigationItems: NavItem[] = [];

    if (role === 'Admin') {
        dashboardUrl = admin.dashboard();

        navigationItems = [
            {
                title: 'Dashboard',
                href: admin.dashboard(),
                icon: LayoutDashboard,
            },
            {
                title: 'Centres',
                href: admin.centres.index(),
                icon: Building2,
            },
            {
                title: 'Learning Sessions',
                href: admin.learningSessions.index(),
                icon: BookOpen,
            },
            {
                title: 'Staff Management',
                href: admin.users.index(),
                icon: Users,
            },
            {
                title: 'Activity Logs',
                href: admin.activities.index(),
                icon: Activity,
            },
        ];
    } else if (role === 'Programme Officer') {
        dashboardUrl = programmeOfficer.dashboard();

        navigationItems = [
            {
                title: 'Dashboard',
                href: programmeOfficer.dashboard(),
                icon: LayoutDashboard,
            },
            {
                title: 'Learners',
                href: programmeOfficer.learners.index(),
                icon: GraduationCap,
            },
            {
                title: 'Welfare Support',
                href: programmeOfficer.welfare.index(),
                icon: HeartHandshake,
            },
            {
                title: 'Teacher Activity',
                href: '/programme-officer/monitoring/activities',
                icon: Activity,
            },
        ];
    } else if (role === 'Teacher') {
        dashboardUrl = teacher.dashboard();

        navigationItems = [
            {
                title: 'Dashboard',
                href: teacher.dashboard(),
                icon: LayoutDashboard,
            },
            {
                title: 'My Assessments',
                href: teacher.assessments.index(),
                icon: ClipboardCheck,
            },
        ];
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navigationItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
