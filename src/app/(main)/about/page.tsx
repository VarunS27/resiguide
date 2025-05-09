import Image from 'next/image';
import { APP_NAME, DUMMY_AGENTS } from '@/lib/constants';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Award, Users, Target } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const keyTeamMembers = DUMMY_AGENTS.slice(0,3);

  return (
    <div className="bg-background">
      <PageHeader
        title={`About ${APP_NAME}`}
        description={`Learn more about our commitment to excellence in real estate and our dedicated team.`}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission and Vision Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To redefine the real estate experience through integrity, expertise, and unwavering dedication to our clients' success. We strive to provide personalized service and innovative solutions, making every property transaction seamless and rewarding.
              </p>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted and respected real estate brokerage, known for our exceptional client outcomes, community engagement, and fostering long-term relationships built on transparency and mutual respect.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://picsum.photos/seed/aboutmission/600/400" 
                alt="Our Mission" 
                fill 
                className="object-cover"
                data-ai-hint="team collaboration" 
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-16 py-12 bg-secondary rounded-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">Our Core Values</h2>
            <p className="mt-2 text-lg text-secondary-foreground max-w-xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {[
              { icon: Award, title: 'Excellence', description: 'We strive for the highest standards in every aspect of our work.' },
              { icon: Users, title: 'Client-Centric', description: 'Our clients are at the heart of everything we do.' },
              { icon: Target, title: 'Integrity', description: 'We operate with honesty, transparency, and ethical conduct.' },
              { icon: CheckCircle, title: 'Innovation', description: 'Embracing new ideas and technologies to serve you better.' },
            ].map(value => (
              <Card key={value.title} className="text-center bg-background shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-accent/20 text-accent p-3 rounded-full w-fit mb-3">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section Preview */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary">Meet Our Leadership</h2>
             <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">A glimpse of the dedicated professionals driving our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyTeamMembers.map(agent => (
              <Card key={agent.id} className="text-center p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
                 <Image src={agent.image} alt={agent.name} width={100} height={100} className="rounded-full mx-auto mb-4 border-2 border-accent" data-ai-hint={agent.dataAiHint || "professional person"}/>
                 <h3 className="text-lg font-semibold text-primary">{agent.name}</h3>
                 <p className="text-sm text-accent">{agent.title}</p>
                 <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{agent.bio.substring(0, 100)}...</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link href="/agents">View All Agents</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
