const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:8000',
    'https://yolo-8yva.onrender.com',
    'https://ivespro.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "default-src": ["'self'", 'https://yolo-8yva.onrender.com', 'https://ivespro.netlify.app/'],
            "script-src": ["'self'", "'unsafe-inline'", 'https://yolo-8yva.onrender.com', 'https://ivespro.netlify.app/'],
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "img-src": ["'self'", "data:", 'https://yolo-8yva.onrender.com', 'https://ivespro.netlify.app/'],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "connect-src": ["'self'", "https://api.printful.com", 'https://yolo-8yva.onrender.com', 'https://ivespro.netlify.app/'],
            "object-src": ["'none'"],
            "upgrade-insecure-requests": []
        }
    }
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Express Server</h1>');
});

app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`https://api.printful.com/store/products`, {
            headers: {
                'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        res.status(500).json({
            error: 'Error fetching products',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
