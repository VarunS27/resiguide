import { HeroSection } from '@/components/sections/home/hero-section';
import { FeaturedProperties } from '@/components/sections/home/featured-properties';
import { AboutPreview } from '@/components/sections/home/about-preview';
import { CtaSection } from '@/components/sections/home/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <AboutPreview />
      <CtaSection />
    </>
  );
}
