'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // Using lucide-react for the arrow icon

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to 1.5 times display height
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 1.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll the page to the top
  const scrollToTop = () => {
    const startPosition = window.scrollY;
    const duration = 500; // milliseconds
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // Easing function
      const newPosition = startPosition * (1 - easeInOutCubic(progress));

      window.scrollTo(0, newPosition);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, 0); // Ensure it ends exactly at the top
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <div
      className={`fixed bottom-28 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group flex items-center justify-center w-16 h-16 bg-[#1285E8] hover:bg-white text-white rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 border border-transparent hover:border-[#1285E8]"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-8 h-8 transition-colors duration-300 group-hover:text-[#1285E8]" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
