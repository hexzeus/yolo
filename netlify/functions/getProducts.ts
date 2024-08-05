import axios from 'axios';
import { Handler } from '@netlify/functions';

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
        const response = await axios.get('https://api.printful.com/store/products', {
            headers: {
                'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
            }
        });

        console.log('Printful API response received');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response.data)
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
                    details: (error as Error).message
                })
            };
        }
    }
};