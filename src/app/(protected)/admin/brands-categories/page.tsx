"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { brandService } from "@/services/brandService";
import { categoryService } from "@/services/categoryService";
import { BrandDto } from "@/types/brand";
import { CategoryDto } from "@/types/category";

const useBrands = () => {
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { brands, loading, error, fetchBrands };
};

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, fetchCategories };
};

export default function ManageBrandsCategoriesPage() {
  const { brands, loading: brandsLoading, error: brandsError, fetchBrands } = useBrands();
  const { categories, loading: categoriesLoading, error: categoriesError, fetchCategories } = useCategories();

  const [newBrandName, setNewBrandName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingBrand, setEditingBrand] = useState<BrandDto | null>(null);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [editBrandName, setEditBrandName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await categoryService.createCategory({ name: newCategoryName });
      setNewCategoryName("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to add category.");
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

  const handleEditCategory = (category: CategoryDto) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editCategoryName.trim()) return;
    try {
      await categoryService.updateCategory(editingCategory.id, { name: editCategoryName });
      setEditingCategory(null);
      setEditCategoryName("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to delete category.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Brands & Categories</h1>

      {/* Categories Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Add, edit, or delete product categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <Button onClick={handleAddCategory}>Add New Category</Button>
          </div>
          {categoriesLoading && <p>Loading categories...</p>}
          {categoriesError && <p className="text-red-500">{categoriesError}</p>}
          {!categoriesLoading && !categoriesError && categories.length === 0 && <p>No categories found.</p>}
          {!categoriesLoading && !categoriesError && categories.length > 0 && (
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditCategory(category)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {editingCategory && (
            <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                  <DialogDescription>Make changes to your category here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="editCategoryName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="editCategoryName"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
                  <Button onClick={handleUpdateCategory}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>

      {/* Brands Section */}
      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle>
          <CardDescription>Add, edit, or delete product brands.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="New Brand Name"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
            />
            <Button onClick={handleAddBrand}>Add New Brand</Button>
          </div>
          {brandsLoading && <p>Loading brands...</p>}
          {brandsError && <p className="text-red-500">{brandsError}</p>}
          {!brandsLoading && !brandsError && brands.length === 0 && <p>No brands found.</p>}
          {!brandsLoading && !brandsError && brands.length > 0 && (
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {brands.map((brand) => (
                    <tr key={brand.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditBrand(brand)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBrand(brand.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {editingBrand && (
            <Dialog open={!!editingBrand} onOpenChange={() => setEditingBrand(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Brand</DialogTitle>
                  <DialogDescription>Make changes to your brand here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="editBrandName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="editBrandName"
                      value={editBrandName}
                      onChange={(e) => setEditBrandName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingBrand(null)}>Cancel</Button>
                  <Button onClick={handleUpdateBrand}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
