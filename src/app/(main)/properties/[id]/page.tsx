import Image from 'next/image';
import Link from 'next/link';
import { DUMMY_PROPERTIES, DUMMY_AGENTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, BedDouble, Bath, Landmark, CheckCircle, Mail, Phone, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { AgentCardSmall } from '@/components/agent-card-small'; // New component

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = DUMMY_PROPERTIES.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  const agent = DUMMY_AGENTS.find((a) => a.id === property.agentId);

  return (
    <div className="bg-background">
       <PageHeader
        title={property.title}
        description={`Luxury ${property.type === 'Sale' ? 'for Sale' : 'for Rent'} in ${property.location}`}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Properties', href: '/properties' },
          { label: property.title },
        ]}
        actions={
          <Button variant="outline" asChild>
            <Link href="/properties"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings</Link>
          </Button>
        }
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Image and Key Details */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl rounded-lg">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  data-ai-hint={property.dataAiHint || 'property detail'}
                  priority
                />
              </AspectRatio>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <BedDouble className="w-5 h-5 mr-2 text-primary" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-primary" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Landmark className="w-5 h-5 mr-2 text-primary" />
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
                
                <Separator className="my-6" />

                <h2 className="text-2xl font-semibold text-primary mb-4">Property Description</h2>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>

                {property.amenities && property.amenities.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <h2 className="text-2xl font-semibold text-primary mb-4">Amenities</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                      {property.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-center text-foreground/90">
                          <CheckCircle className="w-5 h-5 mr-2 text-accent flex-shrink-0" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Price, Agent, Contact */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-accent">
                  ${property.price.toLocaleString()}
                  {property.type === 'Rent' && <span className="text-base font-normal text-muted-foreground">/month</span>}
                </CardTitle>
                <Badge variant={property.type === 'Sale' ? 'default' : 'secondary'} className="w-fit mt-1">
                  For {property.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full mb-2">
                  <Mail className="mr-2 h-5 w-5" /> Inquire About Property
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="mr-2 h-5 w-5" /> Schedule a Visit
                </Button>
              </CardContent>
            </Card>

            {agent && (
              <AgentCardSmall agent={agent} />
            )}
            
            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Location Map</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Map placeholder</p>
                 </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
