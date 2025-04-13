"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  Calendar,
  Settings,
  BarChart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
}

export function DashboardNav({ className, isCollapsed, ...props }: NavProps) {
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Crates",
      href: "/dashboard/crates",
      icon: Package,
    },
    {
      title: "Trades",
      href: "/dashboard/trades",
      icon: FileText,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          size="sm"
          className={cn("justify-start", isCollapsed && "justify-center px-2")}
          asChild
        >
          <Link href={item.href}>
            <item.icon
              className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")}
            />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
