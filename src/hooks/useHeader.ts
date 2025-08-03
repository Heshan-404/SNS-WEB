import { useState, useEffect } from 'react';

export const useHeader = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        if (window.scrollY > 100) {
          if (window.scrollY > lastScrollY) {
            setNavbarVisible(false);
          } else {
            setNavbarVisible(true);
          }
        } else {
          setNavbarVisible(true);
        }
      } else {
        setNavbarVisible(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return {
    navbarVisible,
    isMenuOpen,
    setIsMenuOpen,
  };
};
