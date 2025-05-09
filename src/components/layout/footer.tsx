import Link from 'next/link';
import { APP_NAME, NAV_LINKS, CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS } from '@/lib/constants';
import { SocialLinks } from '@/components/social-links';
import { Separator } from '@/components/ui/separator';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  const footerNavLinks = NAV_LINKS.filter(link => ['Home', 'Properties', 'About', 'Contact'].includes(link.label));


  return (
    <footer className="bg-secondary text-secondary-foreground/80">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary tracking-tight">{APP_NAME}</span>
            </Link>
            <p className="max-w-xs text-sm">
              Your trusted partner in finding premium real estate. Experience luxury living with ResiGuide.
            </p>
            <SocialLinks className="mt-6 -ml-2" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-semibold text-secondary-foreground">Quick Links</p>
              <ul className="mt-4 space-y-2 text-sm">
                {footerNavLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
                 <li>
                    <Link href="/blog" className="transition hover:text-primary">
                      Blog
                    </Link>
                  </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-secondary-foreground">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/privacy-policy" className="transition hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="transition hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <p className="font-semibold text-secondary-foreground">Contact Us</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  <span>{COMPANY_ADDRESS}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 shrink-0" />
                  <a href={`tel:${CONTACT_PHONE}`} className="transition hover:text-primary">{CONTACT_PHONE}</a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 shrink-0" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-primary">{CONTACT_EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-border/50" />

        <div className="text-center text-xs">
          <p>&copy; {year} {APP_NAME}. All rights reserved. Designed with elegance.</p>
        </div>
      </div>
    </footer>
  );
}

// Placeholder pages for legal links - create these files if they don't exist
// src/app/(main)/privacy-policy/page.tsx
// src/app/(main)/terms-of-service/page.tsx
