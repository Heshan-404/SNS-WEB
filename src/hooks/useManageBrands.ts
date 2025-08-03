import { useState, useEffect, useCallback } from "react";
import { brandService } from "@/services/brandService";
import { BrandDto } from "@/types/brand";

export const useManageBrands = () => {
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [editingBrand, setEditingBrand] = useState<BrandDto | null>(null);
  const [editBrandName, setEditBrandName] = useState("");

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedBrands = await brandService.getBrands();
      setBrands(fetchedBrands);
    } catch (err: any) {
      setError(err.message || "Failed to fetch brands.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      await brandService.createBrand({ name: newBrandName });
      setNewBrandName("");
      fetchBrands();
    } catch (err: any) {
      alert(err.message || "Failed to add brand.");
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
      setEditBrandName("");
      fetchBrands();
    } catch (err: any) {
      alert(err.message || "Failed to update brand.");
    }
  };

  const handleDeleteBrand = async (id: number) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      await brandService.deleteBrand(id);
      fetchBrands();
    } catch (err: any) {
      alert(err.message || "Failed to delete brand.");
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
