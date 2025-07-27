"use client";

import React, { useRef, useEffect, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animationClass?: string; // e.g., 'animate-fade-in-up'
  threshold?: number; // How much of the element must be visible to trigger (0 to 1)
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animationClass = 'animate-fade-in-up',
  threshold = 0.1, // 10% of the element visible
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div ref={ref} className={isVisible ? animationClass : 'opacity-0'}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;
