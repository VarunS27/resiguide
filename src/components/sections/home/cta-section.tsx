import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24 bg-background animate-fade-in-up animation-delay-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary mb-6">
          Ready to Find Your Perfect Property?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
          Whether you're looking to buy, sell, or rent, our team of experts is here to assist you. 
          Get personalized advice or explore our AI assistant for quick answers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/chat">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Contact Our Experts
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
