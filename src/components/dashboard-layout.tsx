"use client";

import type React from "react";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-black px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="px-2 py-6">
              <DashboardNav isCollapsed={false} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold">Trading Dashboard</h1>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={`hidden border-r bg-background md:block ${
            isCollapsed ? "w-16" : "w-64"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center justify-end border-b px-3 bg-black">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
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
        <main className="flex-1 overflow-auto bg-black">{children}</main>
      </div>
    </div>
  );
}
