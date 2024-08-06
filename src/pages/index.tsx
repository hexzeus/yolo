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
  external_id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  variants: Variant[];
}

interface ProductOrder {
  external_id: string;
  featured: boolean;
}

// This array controls the order and featured status of your products
const productOrder: ProductOrder[] = [
  { external_id: "66ad62c7175516", featured: true },
  { external_id: "66ab58732e1a68", featured: true },
  { external_id: "66ab445dc87f59", featured: true },
  { external_id: "66ab41f63432e2", featured: false },
  { external_id: "66ab3b27a50186", featured: false },
  { external_id: "66ab3a9d415f62", featured: false },
  { external_id: "66ab33a5b09cb4", featured: false },
  { external_id: "66ab221785b4b3", featured: false },
  // Add more products as needed
];

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
        const orderedProducts = productOrder.map(orderItem => {
          const product = response.data.result.find((p: Product) => p.external_id === orderItem.external_id);
          return product ? { ...product, featured: orderItem.featured } : null;
        }).filter(Boolean);

        setProducts(orderedProducts as Product[]);
        setFeaturedProducts(orderedProducts.filter(product => product.featured));
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
              <ProductCard key={product.id} product={product} featured={true} />
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
                <ProductCard key={product.id} product={product} featured={false} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; featured: boolean }> = ({ product, featured }) => {
  const mainVariant = product.variants[0];

  return (
    <GatsbyLink
      to={`/product/${product.id}`}
      state={{ product }}
      className="block group"
    >
      <div className={`relative overflow-hidden rounded-lg shadow-md bg-matrix-bg border ${featured ? 'border-2 border-matrix-accent' : 'border-matrix-accent'} transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-matrix-glow`}>
        <img src={product.thumbnail_url} alt={product.name} className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`} />
        <div className="absolute inset-0 bg-matrix-bg bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-matrix-glow text-lg font-bold animate-pulse">View Details</span>
        </div>
        <div className="p-4">
          <h3 className={`text-lg font-semibold text-matrix-text mb-2 ${featured ? 'glitch' : 'truncate'}`} data-text={product.name}>{product.name}</h3>
          <p className="text-matrix-highlight mb-2">{product.description}</p>
          {mainVariant && (
            <div className="font-bold text-matrix-accent mb-2">
              Price: {mainVariant.retail_price} {mainVariant.currency}
            </div>
          )}
          <div className="text-matrix-highlight">{product.variants.length} variants</div>
        </div>
      </div>
    </GatsbyLink>
  );
};

export default IndexPage;
