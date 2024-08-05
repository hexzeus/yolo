import React, { useEffect, useState, useCallback } from "react";
import { Link as GatsbyLink, PageProps } from "gatsby";
import axios from "axios";

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
    retail_price: string;
    currency: string;
    description: string;
    variants: number;
}

const ProductPage = ({ params, location }: PageProps<{}, {}, { product: Product }>) => {
    const [product, setProduct] = useState<Product | null>(location.state?.product || null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(!location.state?.product);
    const [quantity, setQuantity] = useState(1);

    const fetchProduct = useCallback(async () => {
        if (product) return;
        setIsLoading(true);
        try {
            const response = await axios.get(`https://yolo-8yva.onrender.com/api/products`, { timeout: 5000 });
            if (response.data && Array.isArray(response.data.result)) {
                const foundProduct = response.data.result.find((p: Product) => p.id === params.id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    throw new Error("Product not found");
                }
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [params.id, product]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleAddToCart = () => {
        alert(`Added ${quantity} ${product?.name} to cart`);
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen bg-matrix-bg text-matrix-text">
            <div className="glitch text-4xl" data-text="Decrypting...">Decrypting...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-matrix-bg text-matrix-text">
            <div className="text-matrix-glow text-2xl glitch" data-text={error}>{error}</div>
        </div>
    );

    if (!product) return (
        <div className="flex items-center justify-center min-h-screen bg-matrix-bg text-matrix-text">
            <div className="text-2xl glitch" data-text="Product not found">Product not found</div>
        </div>
    );

    return (
        <div className="matrix-container min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-matrix-bg text-matrix-text">
            <div className="matrix-rain"></div>
            <div className="container mx-auto relative z-10">
                <GatsbyLink to="/" className="inline-flex items-center mb-6 text-matrix-accent no-underline hover:text-matrix-glow transition-colors duration-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Products
                </GatsbyLink>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 relative group">
                        <img src={product.thumbnail_url} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                        <div className="absolute inset-0 bg-matrix-bg bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-matrix-glow text-2xl font-bold glitch" data-text={product.name}>{product.name}</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col space-y-6">
                        <h1 className="text-4xl font-bold glitch" data-text={product.name}>{product.name}</h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="px-3 py-1 text-lg font-semibold text-matrix-glow bg-matrix-accent bg-opacity-20 rounded-lg animate-pulse">
                                {product.retail_price} {product.currency}
                            </span>
                            <span className="px-3 py-1 text-lg font-semibold text-matrix-highlight bg-matrix-accent bg-opacity-20 rounded-lg">
                                {product.variants} variants
                            </span>
                        </div>
                        <p className="text-lg leading-relaxed">{product.description}</p>
                        <hr className="border-matrix-accent opacity-50" />
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative">
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))}
                                    min="1"
                                    max="10"
                                    className="matrix-input w-20 pr-8"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                                    <button onClick={() => setQuantity(q => Math.min(q + 1, 10))} className="text-matrix-accent hover:text-matrix-glow">▲</button>
                                    <button onClick={() => setQuantity(q => Math.max(q - 1, 1))} className="text-matrix-accent hover:text-matrix-glow">▼</button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="matrix-button w-full sm:w-auto animate-float"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;