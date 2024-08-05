import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const fetchProducts = async () => {
    try {
        const response = await axios.get('https://api.printful.com/store/products', {
            headers: {
                'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
                'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
    }
};

fetchProducts();
