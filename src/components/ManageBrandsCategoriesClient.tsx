'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useManageBrandsCategoriesPage } from '@/hooks/useManageBrandsCategoriesPage';
import { BrandDto } from '@/types/brand';
import { CategoryDto } from '@/types/category';

interface ManageBrandsCategoriesClientProps {
  initialBrands: BrandDto[];
  initialCategories: CategoryDto[];
}

export default function ManageBrandsCategoriesClient({
  initialBrands,
  initialCategories,
}: ManageBrandsCategoriesClientProps) {
  const {
    brands,
    brandsLoading,
    brandsError,
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

    categories,
    categoriesLoading,
    categoriesError,
    newCategoryName,
    setNewCategoryName,
    editingCategory,
    setEditingCategory,
    editCategoryName,
    setEditCategoryName,
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useManageBrandsCategoriesPage(initialBrands, initialCategories);

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
          {!categoriesLoading && !categoriesError && categories.length === 0 && (
            <p>No categories found.</p>
          )}
          {!categoriesLoading && !categoriesError && categories.length > 0 && (
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </Button>
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
                  <Button variant="outline" onClick={() => setEditingCategory(null)}>
                    Cancel
                  </Button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {brands.map((brand) => (
                    <tr key={brand.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleEditBrand(brand)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBrand(brand.id)}
                        >
                          Delete
                        </Button>
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
                  <Button variant="outline" onClick={() => setEditingBrand(null)}>
                    Cancel
                  </Button>
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
