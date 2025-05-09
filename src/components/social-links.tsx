import { SOCIAL_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <Button key={social.name} variant="ghost" size="icon" asChild className="group">
          <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
            <social.icon className="h-5 w-5 text-foreground/70 group-hover:text-primary group-hover:scale-110 transition-all duration-150" />
          </Link>
        </Button>
      ))}
    </div>
  );
}
