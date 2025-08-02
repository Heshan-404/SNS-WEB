"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ProductService } from "@/services/productService";
const clientProductService = new ProductService();
import { BrandService } from "@/services/brandService";
const clientBrandService = new BrandService();
import { CategoryService } from "@/services/categoryService";
const clientCategoryService = new CategoryService();
import { BrandDto } from "@/types/brand";
import { CategoryDto } from "@/types/category";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [brandId, setBrandId] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [availableSizes, setAvailableSizes] = useState<string>("");
  const [voltages, setVoltages] = useState<string>("");
  const [colors, setColors] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string>(""); // Comma-separated URLs
  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBrands = await clientBrandService.getBrands();
        const fetchedCategories = await clientCategoryService.getCategories();
        setBrands(fetchedBrands);
        setCategories(fetchedCategories);
      } catch (err: any) {
        setError(err.message || "Failed to fetch brands and categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await clientProductService.createProduct({
        name,
        shortName: shortName,
        description,
        price,
        stock,
        brandId: parseInt(brandId || '0'),
        categoryId: parseInt(categoryId || '0'),
        images: imageUrls.split(',').filter(url => url.trim() !== '').map(url => ({ url: url.trim(), isMain: false, id: 0, productId: 0, createdAt: new Date(), updatedAt: new Date() })),
        availableSizes: availableSizes.split(',').filter(size => size.trim() !== ''),
        voltages: voltages.split(',').filter(voltage => voltage.trim() !== ''),
        colors: colors.split(',').filter(color => color.trim() !== ''),
      });
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to add product.");
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading form...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill in the details to add a new product.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrls">Image URLs (comma-separated)</Label>
              <Input
                id="imageUrls"
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                placeholder="e.g., url1.jpg, url2.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableSizes">Available Sizes (comma-separated)</Label>
              <Input
                id="availableSizes"
                value={availableSizes}
                onChange={(e) => setAvailableSizes(e.target.value)}
                placeholder="e.g., S, M, L"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voltages">Voltages (comma-separated)</Label>
              <Input
                id="voltages"
                value={voltages}
                onChange={(e) => setVoltages(e.target.value)}
                placeholder="e.g., 110V, 220V"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colors">Colors (comma-separated)</Label>
              <Input
                id="colors"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="e.g., Red, Blue, Green"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  step="0.01"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select onValueChange={setBrandId} value={brandId}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategoryId} value={categoryId}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
