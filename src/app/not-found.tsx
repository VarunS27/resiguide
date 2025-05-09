import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <Search className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-5xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-3">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or you simply mistyped the URL.
      </p>
      <div className="flex space-x-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">
            Contact Support
          </Link>
        </Button>
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        If you believe this is an error, please let us know.
      </p>
    </div>
  );
}
