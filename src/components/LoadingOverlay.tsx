'use client';

import React, { useState, useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

const LoadingOverlay = () => {
  const { isLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(true); // Internal state for visibility
  const [animateOut, setAnimateOut] = useState(false); // State to trigger exit animation

  useEffect(() => {
    if (!isLoading && !animateOut) {
      // If loading is false and we haven't started animating out, start animation
      setAnimateOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide completely after animation
      }, 1200); // Match animation duration (1.2s)
      return () => clearTimeout(timer);
    } else if (isLoading && !isVisible) {
      // If loading is true and not visible, make it visible and reset animation
      setIsVisible(true);
      setAnimateOut(false);
    }
  }, [isLoading, animateOut, isVisible]);

  if (!isVisible) return null; // Only hide when animation is complete

  const letters = ['S', 'N', 'S'];

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ${
        animateOut ? 'opacity-0 pointer-events-none' : 'opacity-100' // Fade out the whole overlay and disable pointer events
      }`}
    >
      <div
        className={`text-7xl font-bold text-gray-800 flex ${
          animateOut ? 'animate-fadeOutUp' : '' // Apply text exit animation
        }`}
      >
        {letters.map((letter, index) => (
          <span
            key={index}
            className="animate-pulse-lr-letter"
            style={{ animationDelay: `${index * 0.1}s` }} // Staggered delay
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingOverlay;
