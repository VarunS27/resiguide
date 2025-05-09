'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { DUMMY_PROPERTIES } from '@/lib/constants';
import type { Property } from '@/lib/types';
import { PropertyCard } from '@/components/property-card';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Optionally, clear results if input is empty
    // if (e.target.value.trim() === '') {
    //   setShowResults(false);
    //   setSearchResults([]);
    // }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredProperties = DUMMY_PROPERTIES.filter(
      (property) =>
        property.title.toLowerCase().includes(lowerCaseQuery) ||
        property.location.toLowerCase().includes(lowerCaseQuery) ||
        property.description.toLowerCase().includes(lowerCaseQuery)
    );
    setSearchResults(filteredProperties);
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] sm:min-h-[700px] flex flex-col items-center justify-center text-center text-white overflow-hidden py-6">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 z-10" />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-tight animate-fade-in-down">
          Find Your <span className="text-accent">Dream Home</span> With ResiGuide
        </h1>
        <p className="max-w-xl sm:max-w-2xl text-base sm:text-lg md:text-xl text-neutral-200 mb-6 sm:mb-8 animate-fade-in-down animation-delay-200">
          Discover exceptional properties and experience unparalleled service. Your journey to luxury living starts here.
        </p>

        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-lg sm:max-w-xl flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-xl animate-fade-in-up animation-delay-400"
        >
          <div className="relative w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <Input
              type="text"
              placeholder="City, neighborhood, address, or keywords..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow bg-white/95 text-foreground placeholder:text-muted-foreground focus:bg-white border-0 h-11 sm:h-12 text-sm sm:text-base pr-10 sm:pr-2" // Added padding for X button
              aria-label="Search properties"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-[calc(0.5rem+40px+0.5rem)] sm:right-14 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground sm:hover:bg-white/20 sm:right-[calc(4rem+0.75rem)]" // Adjusted for sm screens
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            <Button type="submit" size="lg" className="w-full sm:w-auto h-11 sm:h-12 bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Search
            </Button>
          </div>
        </form>

        {showResults && (
          <div className="mt-4 w-full max-w-4xl max-h-[45vh] sm:max-h-[50vh] overflow-y-auto bg-background/95 backdrop-blur-lg p-4 rounded-lg shadow-2xl animate-fade-in-up animation-delay-600 scrollbar-thin scrollbar-thumb-primary scrollbar-track-background/50">
            {searchResults.length > 0 ? (
              <>
                <h3 className="text-xl font-semibold text-primary mb-4 text-left sticky top-0 bg-background/95 py-2 z-10">Search Results ({searchResults.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
                  {searchResults.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-pop-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground py-10 text-lg">
                No properties found matching your criteria. Try a different search.
              </p>
            )}
          </div>
        )}

        {!showResults && (
           <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground backdrop-blur-sm bg-white/10 animate-pop-in animation-delay-700">
              <Link href="/properties">Explore Properties</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pop-in animation-delay-800">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
