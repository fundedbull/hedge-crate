"use client";

import type React from "react";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1">
        {/* Desktop Sidebar - only visible on desktop */}
        <aside
          className={`hidden md:block md:border-r bg-black ${
            isCollapsed ? "md:w-16" : "md:w-64"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center justify-end border-b px-3 bg-black">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-white hover:bg-gray-800"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-4 px-3 bg-black">
              <DashboardNav isCollapsed={isCollapsed} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-black pb-20">{children}</main>

        {/* Mobile Bottom Navigation - only visible on mobile */}
        <aside className="fixed bottom-0 left-0 right-0 z-20 border-t bg-black md:hidden">
          <div className="px-4 py-2">
            <DashboardNav isCollapsed={false} isMobile={true} />
          </div>
        </aside>
      </div>
    </div>
  );
}
