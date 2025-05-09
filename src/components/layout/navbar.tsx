
import Link from 'next/link';
import { APP_NAME, NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { Building2 } from 'lucide-react'; // Using Building2 as a placeholder logo icon

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in-down">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 animate-pop-in animation-delay-100">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-primary tracking-tight">{APP_NAME}</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {NAV_LINKS.map((link, index) => (
            link.label !== 'Home' && // Optionally hide home link on desktop navbar if logo serves that
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/80 animate-fade-in-down"
              style={{ animationDelay: `${200 + index * 100}ms`}}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="ghost" className="animate-fade-in-down animation-delay-500">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button asChild className="animate-fade-in-down animation-delay-600">
            <Link href="/properties">View Listings</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

