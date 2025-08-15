'use client';

import React, { useState, useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

interface PageLoaderProps {
  children: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
  const { setIsLoading } = useLoading();
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [minLoadTimeElapsed, setMinLoadTimeElapsed] = useState(false); // New state

  useEffect(() => {
    // Preload the HeroBackground image
    const img = new Image();
    img.src = '/images/props/HeroBackground.png';
    img.onload = () => {
      setHeroImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load HeroBackground.png');
      setHeroImageLoaded(true);
    };

    // Set minimum load time
    const minTimeTimer = setTimeout(() => {
      setMinLoadTimeElapsed(true);
    }, 5000); // 5 seconds minimum load time

    return () => {
      clearTimeout(minTimeTimer); // Cleanup timer
    };
  }, []);

  useEffect(() => {
    // Set loading to false only when the hero image is loaded AND minimum time has elapsed
    if (heroImageLoaded && minLoadTimeElapsed) {
      setIsLoading(false);
    }
  }, [heroImageLoaded, minLoadTimeElapsed, setIsLoading]);

  return <>{children}</>;
};

export default PageLoader;
