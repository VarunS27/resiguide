import { DUMMY_PROPERTIES } from '@/lib/constants';
import { PropertyCard } from '@/components/property-card';
import { PageHeader } from '@/components/ui/page-header'; // Assuming a PageHeader component exists or will be created

export default function PropertiesPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title="Our Properties"
        description="Browse our exclusive collection of fine properties available for sale and rent."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Properties' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {DUMMY_PROPERTIES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {DUMMY_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            No properties currently listed. Please check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
