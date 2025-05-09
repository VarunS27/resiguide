import { DUMMY_AGENTS } from '@/lib/constants';
import { AgentCard } from '@/components/agent-card';
import { PageHeader } from '@/components/ui/page-header';

export default function AgentsPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title="Meet Our Experts"
        description="Our dedicated team of real estate professionals is committed to providing you with exceptional service and market expertise."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Agents' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {DUMMY_AGENTS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DUMMY_AGENTS.map((agent, index) => (
              <div 
                key={agent.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg animate-fade-in">
            No agents currently listed. Please check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
