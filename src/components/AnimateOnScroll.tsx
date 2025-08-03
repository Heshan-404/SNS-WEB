'use client';

import React from 'react';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animationClass?: string; // e.g., 'animate-fade-in-up'
  threshold?: number; // How much of the element must be visible to trigger (0 to 1)
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animationClass = 'animate-fade-in-up',
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold });

  return (
    <div ref={ref} className={isVisible ? animationClass : 'opacity-0'}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;
