import axios from 'axios';
import { Handler } from '@netlify/functions';

interface PrintfulVariant {
    id: string;
    product_id: string;
    name: string;
    size: string;
    color: string;
    price: string;
    retail_price: string;
}

interface PrintfulProduct {
    id: string;
    name: string;
    thumbnail_url: string;
    variants: PrintfulVariant[];
    retail_price: string; // Changed to retail_price to match Printful's API
}

interface ProcessedProduct {
    id: string;
    name: string;
    thumbnail_url: string;
    price: string; // This will be the main product price
    variants: Array<{
        id: string;
        name: string;
        size: string;
        color: string;
        retail_price: string;
    }>;
}

export const handler: Handler = async (event, context) => {
    console.log('Function `getProducts` invoked');
    if (!process.env.PRINTFUL_API_KEY) {
        console.error('PRINTFUL_API_KEY is not set');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server configuration error' })
        };
    }

    try {
        // Fetch sync products
        const syncProductsResponse = await axios.get('https://api.printful.com/store/products', {
            headers: {
                'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
            }
        });
        const syncProducts = syncProductsResponse.data.result;

        // Fetch detailed information for each product
        const detailedProducts: ProcessedProduct[] = await Promise.all(
            syncProducts.map(async (syncProduct: any) => {
                const productResponse = await axios.get(`https://api.printful.com/store/products/${syncProduct.id}`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
                    }
                });
                const product: PrintfulProduct = productResponse.data.result;

                return {
                    id: product.id,
                    name: product.name,
                    thumbnail_url: product.thumbnail_url,
                    price: product.retail_price, // Use the main product price
                    variants: product.variants.map(variant => ({
                        id: variant.id,
                        name: variant.name,
                        size: variant.size,
                        color: variant.color,
                        retail_price: variant.retail_price
                    }))
                };
            })
        );

        console.log('Printful API responses received and processed');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            },
            body: JSON.stringify(detailedProducts)
        };
    } catch (error) {
        console.error('Error:', error);
        if (axios.isAxiosError(error)) {
            return {
                statusCode: error.response?.status || 500,
                body: JSON.stringify({
                    error: 'Failed to fetch products',
                    details: error.response?.data || error.message
                })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'An unexpected error occurred',
                    details: (error instanceof Error) ? error.message : 'Unknown error'
                })
            };
        }
    }
};