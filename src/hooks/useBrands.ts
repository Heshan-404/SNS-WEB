'use client';

import { useState, useEffect } from 'react';
import { brandService } from '@/services/brandService';
import { BrandDto } from '@/types/brand';

export const useBrands = () => {
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/brands');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBrands(data);
      } catch (err) {
        setError('Failed to fetch brands');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};
