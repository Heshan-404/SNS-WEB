import React from 'react';
import Link from 'next/link';
import "../../globals.css"; // Import global styles
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link href="/admin/dashboard" className="text-foreground transition-colors hover:text-foreground">
                Admin Panel
              </Link>
              <Link
                href="/admin/products"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="/admin/brands-categories"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Brands & Categories
              </Link>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/admin/dashboard" className="text-foreground transition-colors hover:text-foreground">
                    Admin Panel
                  </Link>
                  <Link
                    href="/admin/products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Products
                  </Link>
                  <Link
                    href="/admin/brands-categories"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Brands & Categories
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
              {/* Add any right-aligned items here, e.g., user dropdown or logout button */}
              <Link href="/api/auth/logout" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Logout
              </Link>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}