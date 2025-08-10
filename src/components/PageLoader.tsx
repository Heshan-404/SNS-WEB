'use client';

import React, { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';

interface PageLoaderProps {
  children: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
  const { setIsLoading } = useLoading();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the HeroBackground image
    const img = new Image();
    img.src = '/images/props/HeroBackground.png';
    img.onload = () => {
      setHeroImageLoaded(true);
    };
    img.onerror = () => {
      // Handle error, maybe still set to true to hide loader
      console.error('Failed to load HeroBackground.png');
      setHeroImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    // Set loading to false only when the hero image is loaded
    if (heroImageLoaded) {
      setIsLoading(false);
    }
  }, [heroImageLoaded, setIsLoading]);

  return <>{children}</>;
};

export default PageLoader;
