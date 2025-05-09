import { DUMMY_PROPERTIES } from '@/lib/constants';
import { PropertyCard } from '@/components/property-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FeaturedProperties() {
  const featured = DUMMY_PROPERTIES.slice(0, 3); // Show first 3 properties as featured

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">
            Featured Properties
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties, offering luxury, comfort, and style.
          </p>
        </div>
        
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured properties available at the moment. Please check back later.</p>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground group">
            <Link href="/properties">
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
