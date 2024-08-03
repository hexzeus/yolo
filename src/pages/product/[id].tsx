import React, { useEffect, useState, useCallback } from "react"
import { Link, PageProps } from "gatsby"
import axios from "axios"

interface Product {
    id: string;
    name: string;
    thumbnail_url: string;
    variants: number;
    retail_price?: string;
    currency?: string;
    description?: string;
    synced: number;
}

const ProductPage = ({ params, location }: PageProps<{}, {}, { product: Product }>) => {
    const [product, setProduct] = useState<Product | null>(location.state?.product || null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(!location.state?.product)
    const [quantity, setQuantity] = useState(1)

    const fetchProduct = useCallback(async () => {
        if (product) return;
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/products', { timeout: 5000 });
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
        // Implement your add to cart logic here
        alert(`Added ${quantity} ${product?.name} to cart`);
    };

    if (isLoading) return <div>Loading product...</div>
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={fetchProduct}>Retry</button>
        </div>
    );
    if (!product) return <div>Product not found</div>

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginBottom: '20px', display: 'inline-block' }}>
                ← Back to Products
            </Link>
            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                    <img src={product.thumbnail_url} alt={product.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h1>{product.name}</h1>
                    <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '20px' }}>
                        Price: {product.retail_price} {product.currency}
                    </p>
                    {product.description && <p style={{ marginBottom: '20px' }}>{product.description}</p>}
                    <p>Number of Variants: {product.variants}</p>
                    <p>Synced: {product.synced}</p>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ marginRight: '10px' }}>
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                style={{ marginLeft: '10px', width: '50px' }}
                            />
                        </label>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                backgroundColor: '#4CAF50',
                                border: 'none',
                                color: 'white',
                                padding: '15px 32px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '16px',
                                margin: '4px 2px',
                                cursor: 'pointer',
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage