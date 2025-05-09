
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] sm:min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src="https://picsum.photos/seed/hero/1920/1080"
        alt="Luxury real estate hero image"
        fill
        objectFit="cover"
        quality={90}
        priority
        className="z-0 animate-fade-in"
        data-ai-hint="luxury home exterior"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10" /> {/* Darker overlay for better contrast */}
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight animate-fade-in-down">
          Find Your <span className="text-accent">Dream Home</span> With ResiGuide
        </h1>
        <p className="max-w-xl sm:max-w-2xl text-base sm:text-lg md:text-xl text-neutral-200 mb-8 sm:mb-10 animate-fade-in-down animation-delay-200">
          Discover exceptional properties and experience unparalleled service. Your journey to luxury living starts here.
        </p>
        
        <form className="w-full max-w-lg sm:max-w-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-xl animate-fade-in-up animation-delay-400">
          <Input 
            type="text"
            placeholder="City, neighborhood, or address..."
            className="flex-grow bg-white/90 text-foreground placeholder:text-muted-foreground focus:bg-white border-0 h-11 sm:h-12 text-sm sm:text-base"
            aria-label="Search properties"
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto h-11 sm:h-12 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Search
          </Button>
        </form>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 animate-fade-in-up animation-delay-600">
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground backdrop-blur-sm bg-white/10 animate-pop-in animation-delay-700">
            <Link href="/properties">Explore Properties</Link>
          </Button>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pop-in animation-delay-800">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

