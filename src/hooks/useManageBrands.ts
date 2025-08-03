'use client';

import { useState, useEffect, useCallback } from 'react';
import { brandService } from '@/services/brandService';
import { BrandDto } from '@/types/brand';

export const useManageBrands = (initialBrands: BrandDto[] = []) => {
  const [brands, setBrands] = useState<BrandDto[]>(initialBrands);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newBrandName, setNewBrandName] = useState('');
  const [editingBrand, setEditingBrand] = useState<BrandDto | null>(null);
  const [editBrandName, setEditBrandName] = useState('');

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedBrands = await brandService.getBrands();
      setBrands(fetchedBrands);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch brands.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialBrands.length > 0) {
      setBrands(initialBrands);
      setLoading(false);
    } else {
      fetchBrands();
    }
  }, [fetchBrands, initialBrands]);

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      await brandService.createBrand({ name: newBrandName });
      setNewBrandName('');
      fetchBrands();
    } catch (err: unknown) {
      let errorMessage = 'Failed to add brand.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  const handleEditBrand = (brand: BrandDto) => {
    setEditingBrand(brand);
    setEditBrandName(brand.name);
  };

  const handleUpdateBrand = async () => {
    if (!editingBrand || !editBrandName.trim()) return;
    try {
      await brandService.updateBrand(editingBrand.id, { name: editBrandName });
      setEditingBrand(null);
      setEditBrandName('');
      fetchBrands();
    } catch (err: unknown) {
      let errorMessage = 'Failed to update brand.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  const handleDeleteBrand = async (id: number) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    try {
      await brandService.deleteBrand(id);
      fetchBrands();
    } catch (err: unknown) {
      let errorMessage = 'Failed to delete brand.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  return {
    brands,
    loading,
    error,
    newBrandName,
    setNewBrandName,
    editingBrand,
    setEditingBrand,
    editBrandName,
    setEditBrandName,
    handleAddBrand,
    handleEditBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    fetchBrands,
  };
};
