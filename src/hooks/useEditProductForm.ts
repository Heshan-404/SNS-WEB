import {useState, useEffect, useCallback} from "react";
import {useRouter} from "next/navigation";
import {productService} from "@/services/productService";
import {brandService} from "@/services/brandService";
import {categoryService} from "@/services/categoryService";
import {BrandDto} from "@/types/brand";
import {CategoryDto} from "@/types/category";
import {UpdateProductDto} from "@/types/product";
import {UploadedImageDto} from "@/types/image";

export const useEditProductForm = (id: string) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [description, setDescription] = useState("");
    const [brandId, setBrandId] = useState<string | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
    const [availableSizes, setAvailableSizes] = useState<string[]>([]);
    const [voltages, setVoltages] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImageDto[]>([]);
    const [brands, setBrands] = useState<BrandDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async () => {
        try {
            setLoading(true);
            const fetchedProduct = await productService.getProductById(parseInt(id));
            setName(fetchedProduct.name);
            setShortName(fetchedProduct.shortName);
            setDescription(fetchedProduct.description);
            setBrandId(fetchedProduct.brandId.toString());
            setCategoryId(fetchedProduct.categoryId.toString());
            setAvailableSizes(fetchedProduct.availableSizes || []);
            setVoltages(fetchedProduct.voltages || []);
            setColors(fetchedProduct.colors || []);
            setUploadedImages(fetchedProduct.images.map(img => ({
                url: img.url,
                isMain: img.isMain,
                name: img.url.substring(img.url.lastIndexOf('/') + 1), // Use filename from URL as a placeholder
                size: 0, // Placeholder, actual size not available from backend
                type: '', // Placeholder, actual type not available from backend
            })));
        } catch (err: any) {
            setError(err.message || "Failed to fetch product.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedBrands = await brandService.getBrands();
                const fetchedCategories = await categoryService.getCategories();
                setBrands(fetchedBrands);
                setCategories(fetchedCategories);
                if (id) {
                    await fetchProduct();
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, fetchProduct]);

    const handleSubmit = async (updatedData: UpdateProductDto) => {
        setError(null);
        try {
            await productService.updateProduct(parseInt(id), updatedData);
            router.push("/admin/products");
        } catch (err: any) {
            setError(err.message || "Failed to update product.");
        }
    };

    return {
        name, setName,
        shortName, setShortName,
        description, setDescription,
        brandId, setBrandId,
        categoryId, setCategoryId,
        availableSizes, setAvailableSizes,
        voltages, setVoltages,
        colors, setColors,
        uploadedImages, setUploadedImages,
        brands,
        categories,
        loading,
        error,
        handleSubmit,
        fetchProduct,
    };
};