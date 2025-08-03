'use client';

import React from 'react';
import Link from 'next/link';
import '../../globals.css'; // Import global styles
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { useAdminLayout } from '@/hooks/useAdminLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { handleLogout } = useAdminLayout();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <span className="text-foreground text-lg font-medium whitespace-nowrap">ADMIN PANEL</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <nav className="grid gap-6 text-lg font-medium">
              <span className="text-foreground whitespace-nowrap">ADMIN PANEL</span>
              <Link href="/admin/products" passHref>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Products
                </Button>
              </Link>
              <Link href="/admin/brands-categories" passHref>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Brands & Categories
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Link href="/admin/products" passHref className="hidden md:block">
            <Button
              variant="ghost"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </Button>
          </Link>
          <Link href="/admin/brands-categories" passHref className="hidden md:block">
            <Button
              variant="ghost"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Brands & Categories
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
    </div>
  );
}
