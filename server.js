const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:8000',  // Gatsby development server
    'https://yolo-8yva.onrender.com'  // Your production URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Set Content Security Policy
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'", 'https://yolo-8yva.onrender.com'],
            "script-src": ["'self'", "'unsafe-inline'", 'https://yolo-8yva.onrender.com'],
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "img-src": ["'self'", "data:", 'https://yolo-8yva.onrender.com'],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "connect-src": ["'self'", "https://api.printful.com", 'https://yolo-8yva.onrender.com'],
            "object-src": ["'none'"],
            "upgrade-insecure-requests": []
        }
    }
}));

app.use(express.json());

// Route for the root path
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Express Server</h1>');
});

// Fetch products from Printful
app.get('/api/products', async (req, res) => {
    try {
        console.log('Fetching products from Printful...');
        console.log('API Key:', process.env.PRINTFUL_API_KEY ? 'Set' : 'Not Set');
        console.log('Store ID:', process.env.PRINTFUL_STORE_ID ? 'Set' : 'Not Set');

        if (!process.env.PRINTFUL_API_KEY || !process.env.PRINTFUL_STORE_ID) {
            throw new Error('Printful API key or Store ID is not set');
        }

        const response = await axios.get(`https://api.printful.com/store/products?store_id=${process.env.PRINTFUL_STORE_ID}`, {
            headers: {
                'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
            }
        });

        console.log('Printful response:', JSON.stringify(response.data, null, 2));
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        res.status(500).json({
            error: 'Error fetching products',
            details: error.response ? error.response.data : error.message
        });
    }
});

// Create an order
app.post('/api/orders', async (req, res) => {
    try {
        console.log('Creating order...');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const response = await axios.post('https://api.printful.com/orders',
            { ...req.body, store_id: process.env.PRINTFUL_STORE_ID },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
                }
            }
        );

        console.log('Order created:', JSON.stringify(response.data, null, 2));
        res.json(response.data);
    } catch (error) {
        console.error('Error creating order:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        res.status(500).json({
            error: 'Error creating order',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`API Key set: ${!!process.env.PRINTFUL_API_KEY}`);
    console.log(`Store ID set: ${!!process.env.PRINTFUL_STORE_ID}`);
});
