
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
        <section className="mb-12 md:mb-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 animate-fade-in-down">Our Mission</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed animate-fade-in-down animation-delay-200">
                To redefine the real estate experience through integrity, expertise, and unwavering dedication to our clients' success. We strive to provide personalized service and innovative solutions, making every property transaction seamless and rewarding.
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 animate-fade-in-down animation-delay-300">Our Vision</h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-in-down animation-delay-400">
                To be the most trusted and respected real estate brokerage, known for our exceptional client outcomes, community engagement, and fostering long-term relationships built on transparency and mutual respect.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl animate-fade-in-right animation-delay-100">
              <Image 
                src="https://picsum.photos/seed/aboutmission/600/400" 
                alt="Our Mission" 
                fill 
                className="object-cover"
                data-ai-hint="team collaboration" 
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-12 md:mb-16 py-10 md:py-12 bg-secondary rounded-lg">
          <div className="text-center mb-8 md:mb-10 animate-fade-in-down">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Our Core Values</h2>
            <p className="mt-2 text-base sm:text-lg text-secondary-foreground max-w-xl mx-auto animation-delay-200">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
            {[
              { icon: Award, title: 'Excellence', description: 'We strive for the highest standards in every aspect of our work.' },
              { icon: Users, title: 'Client-Centric', description: 'Our clients are at the heart of everything we do.' },
              { icon: Target, title: 'Integrity', description: 'We operate with honesty, transparency, and ethical conduct.' },
              { icon: CheckCircle, title: 'Innovation', description: 'Embracing new ideas and technologies to serve you better.' },
            ].map((value, index) => (
              <Card 
                key={value.title} 
                className={`text-center bg-background shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl animate-fade-in-up`}
                style={{ animationDelay: `${(index * 100) + 300}ms` }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="mx-auto bg-accent/20 text-accent p-3 rounded-full w-fit mb-3">
                    <value.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section Preview */}
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10 animate-fade-in-down">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Meet Our Leadership</h2>
             <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto animation-delay-200">A glimpse of the dedicated professionals driving our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {keyTeamMembers.map((agent, index) => (
              <Card 
                key={agent.id} 
                className={`text-center p-4 sm:p-6 bg-card shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl animate-fade-in-up`}
                style={{ animationDelay: `${(index * 100) + 400}ms` }}
              >
                 <Image src={agent.image} alt={agent.name} width={80} height={80} className="rounded-full mx-auto mb-4 border-2 border-accent sm:w-24 sm:h-24" data-ai-hint={agent.dataAiHint || "professional person"}/>
                 <h3 className="text-md sm:text-lg font-semibold text-primary">{agent.name}</h3>
                 <p className="text-xs sm:text-sm text-accent">{agent.title}</p>
                 <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{agent.bio.substring(0, 100)}...</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10 animate-fade-in-up animation-delay-600">
            <Button asChild size="lg">
              <Link href="/agents">View All Agents</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}

