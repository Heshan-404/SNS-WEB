"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useManageProducts } from "@/hooks/useManageProducts";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import AddProductForm from "@/components/AddProductForm";

export default function ManageProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(undefined);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  const { products, loading, error, handleDeleteProduct, fetchProducts } = useManageProducts(searchTerm, selectedCategoryId, selectedBrandId);
  const { categories, loading: categoriesLoading } = useCategories();
  const { brands, loading: brandsLoading } = useBrands();

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the product list
    setIsAddProductDialogOpen(false); // Close the dialog
  };

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
              onValueChange={(value) => setSelectedCategoryId(value === "all" ? undefined : Number(value))}
              value={selectedCategoryId?.toString() || "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesLoading ? (
                  <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setSelectedBrandId(value === "all" ? undefined : Number(value))}
              value={selectedBrandId?.toString() || "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brandsLoading ? (
                  <SelectItem value="loading" disabled>Loading brands...</SelectItem>
                ) : (
                  brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p>{searchTerm || selectedCategoryId || selectedBrandId ? "No matching products found." : "No products found."}</p>
          )}
          {!loading && !error && products.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.mainImageUrl || "/placeholder.png"}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category?.name || "N/A"}</TableCell>
                    <TableCell>{product.brand?.name || "N/A"}</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/products/${product.id}`} className="mr-2">
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="mr-2">
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}