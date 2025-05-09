import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbItems, actions }: PageHeaderProps) {
  return (
    <header className="bg-secondary py-10 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <nav className="mb-4 text-sm text-secondary-foreground/80 flex items-center space-x-1.5">
            {breadcrumbItems.map((item, index) => (
              <div key={item.label} className="flex items-center space-x-1.5">
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium">{item.label}</span>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            ))}
          </nav>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-base md:text-lg text-secondary-foreground max-w-3xl">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
