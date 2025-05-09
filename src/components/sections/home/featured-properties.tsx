
import { DUMMY_PROPERTIES } from '@/lib/constants';
import { PropertyCard } from '@/components/property-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FeaturedProperties() {
  const featured = DUMMY_PROPERTIES.slice(0, 4); // Show first 4 properties for better layout on xl screens

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background animate-fade-in-up animation-delay-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary animate-fade-in-down">
            Featured Properties
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto animate-fade-in-down animation-delay-200">
            Explore our handpicked selection of premium properties, offering luxury, comfort, and style.
          </p>
        </div>
        
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featured.map((property, index) => (
              <div 
                key={property.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 400}ms` }} // Staggered delay
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground animate-fade-in">No featured properties available at the moment. Please check back later.</p>
        )}

        <div className="mt-10 md:mt-12 text-center animate-fade-in-up animation-delay-700">
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

