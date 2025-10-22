'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  User,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/recommendations', label: 'Recommendations', icon: Lightbulb },
  { href: '/jobs', label: 'Job Matching', icon: Briefcase },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/users', label: 'Users', icon: Users },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold font-headline tracking-tight text-primary">Mento</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild={!item.comingSoon}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  disabled={item.comingSoon}
                  className="justify-start"
                >
                  {item.comingSoon ? (
                    <>
                      <item.icon />
                      <span>{item.label}</span>
                      <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                    </>
                  ) : (
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
