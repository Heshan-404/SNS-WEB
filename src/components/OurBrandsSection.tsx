'use client';

import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

const brandLogos = [
  'IFAN',
  'ERA',
  'PHOENIX',
  'ANTON',
  'PLUMB FAST',
  'SLON',
  'NATIONAL',
  'Pegler',
  'FORDmix',
  'Watermax',
  'Everlatch',
  'LUMINUR',
];

const OurBrandsSection = () => {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section id="our-brands" className="container mx-auto py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">Brands</h2>
      <div className="pl-8 pr-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent className="-ml-4">
            {brandLogos.map((brand, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/4">
                <div>
                  <div
                    className={cn(
                      'relative flex items-center justify-center h-full text-xl font-bold bg-transparent border-2 border-gray-300 text-gray-800 rounded-lg p-4 overflow-hidden group',
                    )}
                  >
                    <div className="absolute inset-0 bg-black transform scale-y-0 origin-bottom transition-transform duration-300 ease-in-out rounded-lg group-hover:scale-y-100"></div>
                    <span className="relative z-10 transition-colors duration-300 ease-out group-hover:text-white">
                      {brand}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-8" />
          <CarouselNext className="mr-8" />
        </Carousel>
      </div>
    </section>
  );
};

export default OurBrandsSection;
