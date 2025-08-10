'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useManageProductsPage } from '@/hooks/useManageProductsPage';
import { ProductListDto } from '@/types/product';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';

interface ManageProductsClientProps {
  initialProducts: ProductListDto[];
  initialCategories: CategoryDto[];
  initialBrands: BrandDto[];
}

export default function ManageProductsClient({
  initialProducts,
  initialCategories,
  initialBrands,
}: ManageProductsClientProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedBrandId,
    setSelectedBrandId,
    products,
    loading,
    error,
    handleDeleteProduct,
    categories,
    brands,
    handleToggleFeatured,
    isFeaturedFilter,
    setIsFeaturedFilter,
  } = useManageProductsPage(initialProducts, initialCategories, initialBrands);

  return (
    <div className="container mx-auto">
      <Card className="border-none shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Manage Products</CardTitle>
            <Link href="/admin/products/add">
              <Button>Add New Product</Button>
            </Link>
          </div>
          <Input
            placeholder="Search products by name, category, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4"
          />
          <div className="flex gap-4 mb-4">
            <Select
              onValueChange={(value) =>
                setSelectedCategoryId(value === 'all' ? undefined : Number(value))
              }
              value={selectedCategoryId?.toString() || 'all'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setSelectedBrandId(value === 'all' ? undefined : Number(value))
              }
              value={selectedBrandId?.toString() || 'all'}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFeaturedFilter"
                checked={isFeaturedFilter || false}
                onCheckedChange={(checked) => setIsFeaturedFilter(checked ? true : undefined)}
              />
              <Label htmlFor="isFeaturedFilter">Show Featured Only</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          {!error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {searchTerm ||
                      selectedCategoryId ||
                      selectedBrandId ||
                      isFeaturedFilter !== undefined
                        ? 'No matching products found.'
                        : 'No products found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={product.mainImageUrl || '/placeholder.png'}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category?.name || 'N/A'}</TableCell>
                      <TableCell>{product.brand?.name || 'N/A'}</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`featured-switch-${product.id}`}
                            checked={product.isFeatured}
                            onCheckedChange={() =>
                              handleToggleFeatured(product.id, !product.isFeatured)
                            }
                          />
                          <Label htmlFor={`featured-switch-${product.id}`}>
                            {product.isFeatured ? 'Yes' : 'No'}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/products/${product.id}/edit`} className="mr-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
