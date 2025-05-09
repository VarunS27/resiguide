
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, RotateCcw } from 'lucide-react'; // Added RotateCcw for another option

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Search className="w-24 h-24 text-primary mb-6 animate-pop-in animation-delay-100" />
      <h1 className="text-5xl sm:text-6xl font-extrabold text-primary mb-4 animate-fade-in-down animation-delay-200">404</h1>
      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-3 animate-fade-in-down animation-delay-300">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md animate-fade-in-up animation-delay-400">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or you simply mistyped the URL.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-500">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Link>
        </Button>
        {/* Option to go back, might not always work as expected depending on history */}
        {typeof window !== 'undefined' && window.history.length > 1 && (
           <Button variant="outline" size="lg" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        )}
      </div>
      <p className="mt-12 text-sm text-muted-foreground animate-fade-in-up animation-delay-600">
        If you believe this is an error, please <Link href="/contact" className="text-primary hover:underline">contact support</Link>.
      </p>
    </div>
  );
}
