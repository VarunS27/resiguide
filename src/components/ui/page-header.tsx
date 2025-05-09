
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
    <header className="bg-secondary py-8 sm:py-10 lg:py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <nav className="mb-3 sm:mb-4 text-xs sm:text-sm text-secondary-foreground/80 flex items-center space-x-1 sm:space-x-1.5 animate-fade-in-down">
            {breadcrumbItems.map((item, index) => (
              <div key={item.label} className="flex items-center space-x-1 sm:space-x-1.5">
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium">{item.label}</span>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
              </div>
            ))}
          </nav>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary animate-fade-in-down animation-delay-100">
              {title}
            </h1>
            {description && (
              <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-secondary-foreground max-w-3xl animate-fade-in-down animation-delay-200">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="mt-3 sm:mt-0 animate-fade-in animation-delay-300 shrink-0">{actions}</div>}
        </div>
      </div>
    </header>
  );
}

