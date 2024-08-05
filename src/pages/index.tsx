import React, { useEffect, useState, useCallback } from "react";
import { Link as GatsbyLink } from "gatsby";
import axios from "axios";

interface Variant {
  id: string;
  name: string;
  retail_price: string;
  currency: string;
}

interface Product {
  id: string;
  name: string;
  thumbnail_url: string;
  variants: Variant[];
}

const IndexPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('https://yolo-8yva.onrender.com/api/products', { timeout: 5000 });
      if (response.data && Array.isArray(response.data.result)) {
        setProducts(response.data.result);
        setFeaturedProducts(response.data.result.slice(0, 3));
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-matrix-bg text-matrix-text">
        <div className="glitch text-4xl" data-text="Initializing...">Initializing...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-matrix-bg text-matrix-text">
        <div className="text-matrix-glow text-2xl glitch" data-text={error}>{error}</div>
      </div>
    );
  }

  return (
    <div className="matrix-container py-8 px-4 sm:px-6 lg:px-8">
      <div className="matrix-rain"></div>
      <div className="container mx-auto relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-4xl font-bold glitch" data-text="IVES_HUB MERCH">IVES_HUB MERCH</h1>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="matrix-input w-full sm:w-64"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matrix-accent">⌕</span>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 glitch" data-text="Featured Products">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 glitch" data-text="All Products">All Products</h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-xl glitch" data-text="No products found.">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const FeaturedProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <GatsbyLink
    to={`/product/${product.id}`}
    state={{ product }}
    className="block group"
  >
    <div className="relative overflow-hidden rounded-lg shadow-lg bg-matrix-bg border-2 border-matrix-accent transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-matrix-glow">
      <img src={product.thumbnail_url} alt={product.name} className="w-full h-64 object-cover" />
      <div className="absolute inset-0 bg-matrix-bg bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-matrix-glow text-lg font-bold animate-pulse">View Details</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-matrix-text mb-2 glitch" data-text={product.name}>{product.name}</h3>
        <div className="font-bold text-matrix-accent mb-2">
          From: {product.variants[0]?.retail_price} {product.variants[0]?.currency}
        </div>
        <div className="text-matrix-highlight">{product.variants.length} variants</div>
      </div>
    </div>
  </GatsbyLink>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <GatsbyLink
    to={`/product/${product.id}`}
    state={{ product }}
    className="block group"
  >
    <div className="relative overflow-hidden rounded-lg shadow-md bg-matrix-bg border border-matrix-accent transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-matrix-glow">
      <img src={product.thumbnail_url} alt={product.name} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-matrix-bg bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-matrix-glow text-lg font-bold animate-pulse">View Details</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-matrix-text mb-2 truncate">{product.name}</h3>
        <div className="font-bold text-matrix-accent mb-2">
          From: {product.variants[0]?.retail_price} {product.variants[0]?.currency}
        </div>
        <div className="text-matrix-highlight">{product.variants.length} variants</div>
      </div>
    </div>
  </GatsbyLink>
);

export default IndexPage;