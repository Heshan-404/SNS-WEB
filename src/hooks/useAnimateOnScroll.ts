import { useRef, useEffect, useState } from 'react';

interface UseAnimateOnScrollProps {
  threshold?: number; // How much of the element must be visible to trigger (0 to 1)
}

export const useAnimateOnScroll = ({ threshold = 0.1 }: UseAnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current; // Capture ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return {
    ref,
    isVisible,
  };
};
