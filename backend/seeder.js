import express from'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB()
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running.....');
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


app.get('/api/products', (req, res) => {
    res.json(products);
});
app.get('/api/products/:id', (req, res) => {
    const product = product.find(p => p._id === req.params.id)
    res.json(product);
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5500; 

app.listen(PORT, console.log(`Server running In ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.underline));