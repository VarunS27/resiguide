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
    <Card className="group overflow-hidden shadow-lg flex flex-col h-full rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.id}`} className="block">
          <Image
            src={property.image}
            alt={property.title}
            width={600}
            height={400}
            className="object-cover w-full h-56 aspect-video"
            data-ai-hint={property.dataAiHint || 'property image'}
          />
        </Link>
        <Badge 
          variant={property.type === 'Sale' ? 'default' : 'secondary'} 
          className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs shadow-md"
        >
          For {property.type}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 leading-tight">
          <Link href={`/properties/${property.id}`} className="hover:text-primary transition-colors">
            {property.title}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span>{property.location}</span>
        </div>
        <p className="text-lg font-bold text-primary mb-3">
          ${property.price.toLocaleString()} {property.type === 'Rent' ? '/month' : ''}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <BedDouble className="w-4 h-4 mr-1.5 text-primary/70 flex-shrink-0" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1.5 text-primary/70 flex-shrink-0" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Landmark className="w-4 h-4 mr-1.5 text-primary/70 flex-shrink-0" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
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
