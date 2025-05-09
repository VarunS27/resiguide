
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-secondary animate-fade-in-up animation-delay-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-left animation-delay-800">
            <div className="relative aspect-[6/5] w-full">
              <Image
                src="https://picsum.photos/seed/aboutus/600/500"
                alt={`About ${APP_NAME}`}
                fill
                className="rounded-lg shadow-2xl object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
                data-ai-hint="office team"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 animate-fade-in-right animation-delay-800">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary mb-4 sm:mb-6">
              Experience Excellence with {APP_NAME}
            </h2>
            <p className="text-base sm:text-lg text-secondary-foreground mb-6">
              At {APP_NAME}, we are dedicated to providing an unparalleled real estate experience. Our commitment to integrity, expertise, and personalized service sets us apart. We guide you through every step of your property journey with confidence and care.
            </p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
              {[
                "Expert market knowledge and insights.",
                "Personalized service tailored to your unique needs.",
                "A portfolio of premium and exclusive properties."
              ].map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-secondary-foreground animate-fade-in-up"
                  style={{ animationDelay: `${index * 100 + 900}ms`}}
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent mr-2 sm:mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="group animate-pop-in animation-delay-1000">
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

