import {CreateProductDto, UpdateProductDto, ProductDto, ProductListDto, PaginatedProductsDto} from '../types/product';
import {UploadedImageDto} from '../types/image';

export class ProductService {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    async createProduct(data: CreateProductDto): Promise<ProductDto> {
        // Mock data
        console.log("Mocking createProduct with data:", data);
        const newProduct: ProductDto = {
            id: Math.floor(Math.random() * 1000) + 100,
            name: data.name,
            shortName: data.shortName,
            description: data.description,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId,
            brandId: data.brandId,
            category: {id: data.categoryId, name: "Mock Category", createdAt: new Date(), updatedAt: new Date()},
            brand: {id: data.brandId, name: "Mock Brand", createdAt: new Date(), updatedAt: new Date()},
            images: data.images.map(img => ({
                ...img,
                id: Math.floor(Math.random() * 1000) + 100,
                productId: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            })),
            availableSizes: data.availableSizes || [],
            voltages: data.voltages || [],
            colors: data.colors || [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return newProduct;
    }

    async getProducts(
        page: number = 1,
        limit: number = 10,
        categoryIds?: number[],
        brandIds?: number[],
        searchTerm?: string
    ): Promise<PaginatedProductsDto> {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
        // Mock data
        const mockProducts: ProductListDto[] = [
            {
                id: 1,
                name: "Sample Product 1",
                shortName: "SP1",
                description: "Description for Sample Product 1",
                price: 10.00,
                stock: 100,
                brand: {id: 1, name: "Brand A"},
                category: {id: 1, name: "Category X"},
                mainImageUrl: "/images/props/products/1.png",
            },
            {
                id: 2,
                name: "Sample Product 2",
                shortName: "SP2",
                description: "Description for Sample Product 2",
                price: 20.00,
                stock: 200,
                brand: {id: 2, name: "Brand B"},
                category: {id: 2, name: "Category Y"},
                mainImageUrl: "/images/props/products/2.png",
            },
            {
                id: 3,
                name: "Sample Product 3",
                shortName: "SP3",
                description: "Description for Sample Product 3",
                price: 30.00,
                stock: 300,
                brand: {id: 1, name: "Brand A"},
                category: {id: 1, name: "Category X"},
                mainImageUrl: "/images/props/products/3.png",
            },
            {
                id: 4,
                name: "Sample Product 4",
                shortName: "SP4",
                description: "Description for Sample Product 4",
                price: 40.00,
                stock: 400,
                brand: {id: 3, name: "Brand C"},
                category: {id: 3, name: "Category Z"},
                mainImageUrl: "/images/props/products/4.png",
            },
            {
                id: 5,
                name: "Sample Product 5",
                shortName: "SP5",
                description: "Description for Sample Product 5",
                price: 50.00,
                stock: 500,
                brand: {id: 2, name: "Brand B"},
                category: {id: 1, name: "Category X"},
                mainImageUrl: "/images/props/products/1.png",
            },
            {
                id: 6,
                name: "Sample Product 6",
                shortName: "SP6",
                description: "Description for Sample Product 6",
                price: 60.00,
                stock: 600,
                brand: {id: 3, name: "Brand C"},
                category: {id: 2, name: "Category Y"},
                mainImageUrl: "/images/props/products/2.png",
            },
            {
                id: 7,
                name: "Sample Product 7",
                shortName: "SP7",
                description: "Description for Sample Product 7",
                price: 70.00,
                stock: 700,
                brand: {id: 1, name: "Brand A"},
                category: {id: 3, name: "Category Z"},
                mainImageUrl: "/images/props/products/3.png",
            },
            {
                id: 8,
                name: "Sample Product 8",
                shortName: "SP8",
                description: "Description for Sample Product 8",
                price: 80.00,
                stock: 800,
                brand: {id: 2, name: "Brand B"},
                category: {id: 1, name: "Category X"},
                mainImageUrl: "/images/props/products/4.png",
            },
            {
                id: 9,
                name: "Sample Product 9",
                shortName: "SP9",
                description: "Description for Sample Product 9",
                price: 90.00,
                stock: 900,
                brand: {id: 3, name: "Brand C"},
                category: {id: 2, name: "Category Y"},
                mainImageUrl: "/images/props/products/1.png",
            },
            {
                id: 10,
                name: "Sample Product 10",
                shortName: "SP10",
                description: "Description for Sample Product 10",
                price: 100.00,
                stock: 1000,
                brand: {id: 1, name: "Brand A"},
                category: {id: 3, name: "Category Z"},
                mainImageUrl: "/images/props/products/2.png",
            },
            {
                id: 11,
                name: "Sample Product 11",
                shortName: "SP11",
                description: "Description for Sample Product 11",
                price: 110.00,
                stock: 1100,
                brand: {id: 2, name: "Brand B"},
                category: {id: 1, name: "Category X"},
                mainImageUrl: "/images/props/products/3.png",
            },
            {
                id: 12,
                name: "Sample Product 12",
                shortName: "SP12",
                description: "Description for Sample Product 12",
                price: 120.00,
                stock: 1200,
                brand: {id: 3, name: "Brand C"},
                category: {id: 2, name: "Category Y"},
                mainImageUrl: "/images/props/products/4.png",
            },
        ];

        // Filter products based on categoryIds and brandIds if provided
        let filteredProducts = mockProducts;
        if (categoryIds && categoryIds.length > 0) {
            filteredProducts = filteredProducts.filter(p => categoryIds.includes(p.category.id));
        }
        if (brandIds && brandIds.length > 0) {
            filteredProducts = filteredProducts.filter(p => brandIds.includes(p.brand.id));
        }
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                p.shortName.toLowerCase().includes(lowerCaseSearchTerm) ||
                !!p.description?.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        const total = filteredProducts.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const productsOnPage = filteredProducts.slice(startIndex, endIndex);

        return {
            products: productsOnPage,
            total,
            page,
            limit,
        };
    }

    async getProductById(id: number): Promise<ProductDto | null> {
        // Mock data
        const mockProducts: ProductDto[] = [
            {
                id: 1,
                name: "Sample Product 1",
                shortName: "SP1",
                description: "Description for Sample Product 1",
                price: 10.00,
                stock: 100,
                categoryId: 1,
                brandId: 1,
                category: {id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date()},
                brand: {id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 101,
                        url: "/images/props/products/1.png",
                        isMain: true,
                        productId: 1,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 102,
                        url: "/images/props/products/2.png",
                        isMain: false,
                        productId: 1,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 103,
                        url: "/images/props/products/3.png",
                        isMain: false,
                        productId: 1,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 104,
                        url: "/images/props/products/4.png",
                        isMain: false,
                        productId: 1,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: ["S", "M", "L"],
                voltages: ["220V"],
                colors: ["Green"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: "Sample Product 2",
                shortName: "SP2",
                description: "Description for Sample Product 2",
                price: 20.00,
                stock: 200,
                categoryId: 2,
                brandId: 2,
                brand: {id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 2, name: "Category Y", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 201,
                        url: "/images/props/products/2.png",
                        isMain: true,
                        productId: 2,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 202,
                        url: "/images/props/products/1.png",
                        isMain: false,
                        productId: 2,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 203,
                        url: "/images/props/products/3.png",
                        isMain: false,
                        productId: 2,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: ["M", "L"],
                voltages: ["110V"],
                colors: ["Blue"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: "Sample Product 3",
                shortName: "SP3",
                description: "Description for Sample Product 3",
                price: 30.00,
                stock: 300,
                categoryId: 1,
                brandId: 1,
                brand: {id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 301,
                        url: "/images/props/products/3.png",
                        isMain: true,
                        productId: 3,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 302,
                        url: "/images/props/products/4.png",
                        isMain: false,
                        productId: 3,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: ["L"],
                voltages: ["220V"],
                colors: ["Red"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: "Sample Product 4",
                shortName: "SP4",
                description: "Description for Sample Product 4",
                price: 40.00,
                stock: 400,
                categoryId: 3,
                brandId: 3,
                brand: {id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 3, name: "Category Z", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 401,
                        url: "/images/props/products/4.png",
                        isMain: true,
                        productId: 4,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 402,
                        url: "/images/props/products/1.png",
                        isMain: false,
                        productId: 4,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 403,
                        url: "/images/props/products/2.png",
                        isMain: false,
                        productId: 4,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        id: 404,
                        url: "/images/props/products/3.png",
                        isMain: false,
                        productId: 4,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: ["S"],
                voltages: ["110V", "220V"],
                colors: ["Yellow"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: "Sample Product 5",
                shortName: "SP5",
                description: "Description for Sample Product 5",
                price: 50.00,
                stock: 500,
                categoryId: 1,
                brandId: 2,
                brand: {id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 501,
                        url: "/images/props/products/1.png",
                        isMain: true,
                        productId: 5,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: "Sample Product 6",
                shortName: "SP6",
                description: "Description for Sample Product 6",
                price: 60.00,
                stock: 600,
                categoryId: 2,
                brandId: 3,
                brand: {id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 2, name: "Category Y", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 601,
                        url: "/images/props/products/2.png",
                        isMain: true,
                        productId: 6,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                name: "Sample Product 7",
                shortName: "SP7",
                description: "Description for Sample Product 7",
                price: 70.00,
                stock: 700,
                categoryId: 3,
                brandId: 1,
                brand: {id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 3, name: "Category Z", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 701,
                        url: "/images/props/products/3.png",
                        isMain: true,
                        productId: 7,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                name: "Sample Product 8",
                shortName: "SP8",
                description: "Description for Sample Product 8",
                price: 80.00,
                stock: 800,
                categoryId: 1,
                brandId: 2,
                brand: {id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 801,
                        url: "/images/props/products/4.png",
                        isMain: true,
                        productId: 8,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                name: "Sample Product 9",
                shortName: "SP9",
                description: "Description for Sample Product 9",
                price: 90.00,
                stock: 900,
                categoryId: 2,
                brandId: 3,
                brand: {id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 2, name: "Category Y", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 901,
                        url: "/images/props/products/1.png",
                        isMain: true,
                        productId: 9,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                name: "Sample Product 10",
                shortName: "SP10",
                description: "Description for Sample Product 10",
                price: 100.00,
                stock: 1000,
                categoryId: 3,
                brandId: 1,
                brand: {id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 3, name: "Category Z", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 1001,
                        url: "/images/props/products/2.png",
                        isMain: true,
                        productId: 10,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 11,
                name: "Sample Product 11",
                shortName: "SP11",
                description: "Description for Sample Product 11",
                price: 110.00,
                stock: 1100,
                categoryId: 1,
                brandId: 2,
                brand: {id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 1101,
                        url: "/images/props/products/3.png",
                        isMain: true,
                        productId: 11,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 12,
                name: "Sample Product 12",
                shortName: "SP12",
                description: "Description for Sample Product 12",
                price: 120.00,
                stock: 1200,
                categoryId: 2,
                brandId: 3,
                brand: {id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date()},
                category: {id: 2, name: "Category Y", createdAt: new Date(), updatedAt: new Date()},
                images: [
                    {
                        id: 1201,
                        url: "/images/props/products/4.png",
                        isMain: true,
                        productId: 12,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ],
                availableSizes: [],
                voltages: [],
                colors: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        return mockProducts.find(product => product.id === id) || null;
    }

    async updateProduct(id: number, data: UpdateProductDto): Promise<ProductDto | null> {
        // Mock data
        console.log(`Mocking updateProduct for ID ${id} with data:`, data);
        const existingProduct = await this.getProductById(id);
        if (!existingProduct) {
            return null;
        }
        const updatedProduct: ProductDto = {
            ...existingProduct,
            ...data,
            images: data.images ? data.images.map(img => ({
                ...img,
                id: Math.floor(Math.random() * 1000) + 100,
                productId: id,
                createdAt: new Date(),
                updatedAt: new Date()
            })) : existingProduct.images,
            updatedAt: new Date(),
        };
        return updatedProduct;
    }

    async deleteProduct(id: number): Promise<ProductDto | null> {
        // Mock data
        console.log(`Mocking deleteProduct for ID ${id}`);
        const existingProduct = await this.getProductById(id);
        if (!existingProduct) {
            return null;
        }
        return existingProduct;
    }
}


