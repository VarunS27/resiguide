import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-secondary animate-fade-in-up animation-delay-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://picsum.photos/seed/aboutus/600/500"
              alt="About ResiGuide"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl object-cover aspect-[6/5]"
              data-ai-hint="office team"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary mb-6">
              Experience Excellence with {APP_NAME}
            </h2>
            <p className="text-lg text-secondary-foreground mb-6">
              At {APP_NAME}, we are dedicated to providing an unparalleled real estate experience. Our commitment to integrity, expertise, and personalized service sets us apart. We guide you through every step of your property journey with confidence and care.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-secondary-foreground">
                <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                Expert market knowledge and insights.
              </li>
              <li className="flex items-center text-secondary-foreground">
                <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                Personalized service tailored to your unique needs.
              </li>
              <li className="flex items-center text-secondary-foreground">
                <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                A portfolio of premium and exclusive properties.
              </li>
            </ul>
            <Button asChild size="lg" className="group">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
