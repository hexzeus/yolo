import React, { useEffect, useState, useCallback } from "react"
import { Link } from "gatsby"
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

const IndexPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [filterByPrice, setFilterByPrice] = useState<number | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/products', { timeout: 5000 });
      if (response.data && Array.isArray(response.data.result)) {
        setProducts(response.data.result);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getProductPrice = (product: Product): number => {
    return product.retail_price ? parseFloat(product.retail_price) : 0;
  };

  const sortedAndFilteredProducts = React.useMemo(() => {
    return products
      .filter(product => !filterByPrice || getProductPrice(product) <= filterByPrice)
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else {
          return getProductPrice(a) - getProductPrice(b);
        }
      });
  }, [products, sortBy, filterByPrice]);

  if (isLoading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Our Products</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          Max Price:
          <input
            type="number"
            value={filterByPrice || ''}
            onChange={(e) => setFilterByPrice(e.target.value ? Number(e.target.value) : null)}
          />
        </label>
      </div>
      {sortedAndFilteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {sortedAndFilteredProducts.map((product: Product) => (
            <Link
              to={`/product/${product.id}`}
              state={{ product }}
              key={product.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <img src={product.thumbnail_url} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />
                <h2 style={{ fontSize: '1.2em', marginBottom: '10px' }}>{product.name}</h2>
                <p style={{ marginBottom: '10px', flexGrow: 1 }}><strong>Price: {getProductPrice(product)} {product.currency}</strong></p>
                <p>Variants: {product.variants}</p>
                <p>Synced: {product.synced}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default IndexPage