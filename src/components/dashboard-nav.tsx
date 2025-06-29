"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FileText,
  Settings,
  LockIcon,
  BookOpen,
  PiggyBank,
  CircleDollarSign,
  MoreHorizontal,
} from "lucide-react";

interface DashboardNavProps {
  isCollapsed: boolean;
  isMobile?: boolean;
}

const primaryNavItems = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Crates",
    href: "/client/dashboard/crates",
    icon: Package,
  },
  {
    title: "Trades",
    href: "/client/dashboard/trades",
    icon: LockIcon,
  },
];

const secondaryNavItems = [
  {
    title: "News",
    href: "/client/dashboard/news",
    icon: FileText,
  },
  {
    title: "Brokers",
    href: "/client/dashboard/brokers",
    icon: PiggyBank,
  },
  {
    title: "Guide",
    href: "/client/dashboard/guide",
    icon: BookOpen,
  },
  {
    title: "Rewards",
    href: "/client/dashboard/rewards",
    icon: CircleDollarSign,
  },
  {
    title: "Settings",
    href: "/client/dashboard/settings",
    icon: Settings,
  },
];

const allNavItems = [...primaryNavItems, ...secondaryNavItems];

export function DashboardNav({
  isCollapsed,
  isMobile = false,
}: DashboardNavProps) {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  if (isMobile) {
    // Check if current page is in secondary items
    const isSecondaryActive = secondaryNavItems.some(
      (item) => pathname === item.href
    );

    return (
      <>
        {/* Primary Navigation */}
        <nav className="flex justify-around items-center">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors flex-1",
                  isActive
                    ? "text-white bg-gray-800"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            );
          })}

          {/* More Button */}
          <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors flex-1",
                  isSecondaryActive
                    ? "text-white bg-gray-800"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <MoreHorizontal className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="bg-black border-gray-800 p-6"
            >
              <SheetTitle className="text-lg font-semibold text-white ">
                More Options
              </SheetTitle>
              <div className="grid grid-cols-2 gap-3">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg transition-colors",
                        isActive
                          ? "text-white bg-gray-800"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </>
    );
  }

  // Desktop sidebar navigation layout (unchanged)
  return (
    <nav className="space-y-2">
      {allNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.href}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "w-full justify-start hover:bg-blue-700 hover:text-white",
              isCollapsed && "justify-center px-2",
              isActive ? "bg-gray-800 text-white" : "text-gray-400"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
