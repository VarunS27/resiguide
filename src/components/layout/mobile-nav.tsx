'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Building2 } from 'lucide-react';
import { APP_NAME, NAV_LINKS } from '@/lib/constants';
import type { NavLink as NavLinkType } from '@/lib/types'; // Ensure correct import for NavLinkType

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-primary">{APP_NAME}</span>
            </Link>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </SheetClose>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            {NAV_LINKS.map((link) => (
              <MobileLink key={link.label} href={link.href} onOpenChange={setOpen}>
                {link.icon && <link.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                {link.label}
              </MobileLink>
            ))}
          </nav>
          <div className="border-t p-4">
            <Button asChild className="w-full mb-2">
              <Link href="/contact" onClick={() => setOpen(false)}>Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/properties" onClick={() => setOpen(false)}>View Listings</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({ children, href, disabled, onOpenChange }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
        disabled ? 'pointer-events-none opacity-60' : ''
      }`}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </Link>
  );
}
