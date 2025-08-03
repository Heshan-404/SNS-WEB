"use client";

import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import ManageableImagePreview from '@/components/ManageableImagePreview';
import {UploadedImageDto} from '@/types/image';
import ImageUploadArea from '@/components/ImageUploadArea';
import TagInput from '@/components/TagInput';
import {productService} from '@/services/productService';
import {UpdateProductDto} from '@/types/product';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {CategoryDto} from '@/types/category';
import {BrandDto} from '@/types/brand';
import {categoryService} from '@/services/categoryService';
import {brandService} from '@/services/brandService';
import {useParams} from 'next/navigation';

const EditProductPage = () => {
    const {id} = useParams() as { id: string };
    const productId = parseInt(id, 10);

    const [productName, setProductName] = useState('');
    const [shortName, setShortName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [uploadedImages, setUploadedImages] = useState<UploadedImageDto[]>([]); // For display
    const [newlyAddedFiles, setNewlyAddedFiles] = useState<File[]>([]); // For actual new File objects
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // URLs of images to delete from Blob/DB
    const [sizes, setSizes] = useState<string[]>([]);
    const [voltages, setVoltages] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchedCategories, setFetchedCategories] = useState<CategoryDto[]>([]);
    const [fetchedBrands, setFetchedBrands] = useState<BrandDto[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const categoriesData = await categoryService.getCategories();
                const brandsData = await brandService.getBrands();
                setFetchedCategories(categoriesData);
                setFetchedBrands(brandsData);

                const fetchedProduct = await productService.getProductById(productId);
                if (fetchedProduct) {
                    setProductName(fetchedProduct.name);
                    setShortName(fetchedProduct.shortName);
                    setDescription(fetchedProduct.description);
                    setCategory(fetchedProduct.categoryId.toString());
                    setBrand(fetchedProduct.brandId.toString());
                    setSizes(fetchedProduct.availableSizes || []);
                    setVoltages(fetchedProduct.voltages || []);
                    setColors(fetchedProduct.colors || []);
                    // Populate uploadedImages with existing images, mapping to UploadedImageDto
                    setUploadedImages(fetchedProduct.images.map(img => ({
                        url: img.url,
                        isMain: img.isMain,
                        name: `image-${img.id}`, // Placeholder name
                        size: 0, // Placeholder size
                        type: 'image/jpeg', // Placeholder type
                    })));
                }
            } catch (error) {
                toast.error('Failed to load product data, categories or brands.');
                console.error('Error loading data:', error);
            } finally {
                setIsLoadingData(false);
            }
        };
        loadData();
    }, [productId]);

    const handleImageUpload = (newFiles: File[]) => {
        setNewlyAddedFiles(prevFiles => [...prevFiles, ...newFiles]);
        setUploadedImages(prevImages => [
            ...prevImages,
            ...newFiles.map(file => ({
                url: URL.createObjectURL(file),
                isMain: false, // Will be determined on submit
                name: file.name,
                size: file.size,
                type: file.type,
            })),
        ]);
    };

    const handleRemoveImage = (imageToRemove: UploadedImageDto) => {
        setUploadedImages(prevImages => {
            const updatedImages = prevImages.filter(img => img.url !== imageToRemove.url);

            // If it's an existing image (not a blob URL), mark for deletion
            if (!imageToRemove.url.startsWith('blob:')) {
                setImagesToDelete(prevUrls => [...prevUrls, imageToRemove.url]);
            } else {
                // If it's a newly added file, remove it from newlyAddedFiles
                setNewlyAddedFiles(prevFiles => prevFiles.filter(file => URL.createObjectURL(file) !== imageToRemove.url));
            }
            return updatedImages;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!productName || !shortName || !description || !category || !brand || uploadedImages.length === 0) {
            toast.error('Please fill in all required fields and upload at least one image.');
            setIsSubmitting(false);
            return;
        }

        try {
            // 1. Delete images marked for deletion
            await Promise.all(imagesToDelete.map(url => productService.deleteImage(url)));

            // 2. Upload newly added files
            const uploadedBlobs = newlyAddedFiles.length > 0
                ? await productService.uploadImages(newlyAddedFiles)
                : [];

            // 3. Combine existing (non-deleted) images with newly uploaded images
            const existingNonDeletedImages = uploadedImages.filter(
                img => !img.url.startsWith('blob:') && !imagesToDelete.includes(img.url)
            );

            const finalImages: UploadedImageDto[] = [
                ...existingNonDeletedImages,
                ...uploadedBlobs.map((blob, index) => ({
                    url: blob.url,
                    isMain: false, // Will be set below
                    name: newlyAddedFiles[index]?.name || '',
                    size: newlyAddedFiles[index]?.size || 0,
                    type: newlyAddedFiles[index]?.type || '',
                })),
            ];

            // Ensure the first image is main
            if (finalImages.length > 0) {
                finalImages[0].isMain = true;
            }

            const productData: UpdateProductDto = {
                name: productName,
                shortName: shortName,
                description: description,
                categoryId: parseInt(category),
                brandId: parseInt(brand),
                images: finalImages,
                availableSizes: sizes,
                voltages: voltages,
                colors: colors,
            };

            await productService.updateProduct(productId, productData);
            toast.success('Product updated successfully!');
            // Optionally redirect after update
            // router.push('/admin/products');
        } catch (error: any) {
            console.error('Error updating product:', error);
            toast.error(error.message || 'Failed to update product.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingData) {
        return <div className="container mx-auto py-8">Loading product data...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-left">Edit Product</h1>
            <form onSubmit={handleSubmit}>

                {/* Product Information */}
                <Card className="mb-6 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Product Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2 w-full md:w-1/2">
                                <Label htmlFor="productName">Product Name</Label>
                                <Input
                                    id="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="Enter full product name"
                                />
                            </div>
                            <div className="grid gap-2 w-full md:w-1/2">
                                <Label htmlFor="shortName">Short Name</Label>
                                <Input
                                    id="shortName"
                                    value={shortName}
                                    onChange={(e) => setShortName(e.target.value)}
                                    placeholder="Enter short name for showcase pages"
                                    maxLength={45}
                                />
                            </div>
                            <div className="grid gap-2 w-full md:w-1/2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter product description"
                                    rows={10}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Categorization */}
                <Card className="mb-6 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Categorization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2 w-full md:w-1/2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory} disabled={isLoadingData}>
                                    <SelectTrigger id="category">
                                        {isLoadingData ? <SelectValue>Loading categories...</SelectValue> :
                                            <SelectValue placeholder="Select a category"/>}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fetchedCategories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2 w-full md:w-1/2">
                                <Label htmlFor="brand">Brand</Label>
                                <Select value={brand} onValueChange={setBrand} disabled={isLoadingData}>
                                    <SelectTrigger id="brand">
                                        {isLoadingData ? <SelectValue>Loading brands...</SelectValue> :
                                            <SelectValue placeholder="Select a brand"/>}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fetchedBrands.map((b) => (
                                            <SelectItem key={b.id} value={b.id.toString()}>
                                                {b.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Imagery */}
                <Card className="mb-6 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Product Imagery</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {uploadedImages.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-md font-semibold mb-2">Uploaded Images Preview</h3>
                                <ManageableImagePreview images={uploadedImages} onRemoveImage={handleRemoveImage}/>
                            </div>
                        )}
                        <ImageUploadArea onImageUpload={handleImageUpload} currentImageCount={uploadedImages.length}/>
                    </CardContent>
                </Card>

                {/* Specifications */}
                <Card className="mb-6 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <TagInput
                                label="Available Sizes"
                                placeholder="Enter sizes (e.g., Small, Medium, XL)"
                                tags={sizes}
                                setTags={setSizes}
                            />
                            <TagInput
                                label="Voltages"
                                placeholder="Enter voltages (e.g., 110V, 220V)"
                                tags={voltages}
                                setTags={setVoltages}
                            />
                            <TagInput
                                label="Colors"
                                placeholder="Enter colors (e.g., Red, Blue, Green)"
                                tags={colors}
                                setTags={setColors}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || isLoadingData}>
                        {isSubmitting ? 'Updating Product...' : 'Update Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;
