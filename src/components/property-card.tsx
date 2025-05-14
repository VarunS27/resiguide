
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, BedDouble, Bath, Landmark } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="group overflow-hidden shadow-lg flex flex-col h-full rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.id}`} className="block aspect-[4/3] overflow-hidden"> {/* Ensured aspect ratio for image container */}
          <Image
            src={property.image}
            alt={property.title}
            fill // Changed from width/height to fill for better responsiveness with aspect ratio
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" // Added hover effect
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={property.dataAiHint || 'property image'}
          />
        </Link>
        <Badge 
          variant={property.type === 'Sale' ? 'default' : 'secondary'} 
          className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs shadow-md" // Adjusted padding & position
        >
          For {property.type}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg md:text-xl font-semibold mb-2 leading-tight"> {/* Responsive font size */}
          <Link href={`/properties/${property.id}`} className="hover:text-primary transition-colors line-clamp-2">
            {property.title}
          </Link>
        </CardTitle>
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-3"> {/* Responsive font size */}
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <p className="text-md md:text-lg font-bold text-primary mb-3"> {/* Responsive font size */}
          ₹{property.price.toLocaleString()} {property.type === 'Rent' ? <span className="text-xs font-normal">/month</span> : ''}
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-muted-foreground mb-3"> {/* Responsive font size */}
          <div className="flex items-center truncate">
            <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary/70 flex-shrink-0" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center truncate">
            <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary/70 flex-shrink-0" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center truncate">
            <Landmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-primary/70 flex-shrink-0" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2"> {/* Responsive font size */}
          {property.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" size="sm">
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

