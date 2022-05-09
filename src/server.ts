import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// STRIPE
import { stripeRoute } from './routes/stripe';

// API ROUTES
import { authRoute } from './routes/auth';
import { userRoute } from './routes/user';
import { cartRoute } from './routes/cart';
import { orderRoute } from './routes/order';
import { productRoute } from './routes/product';

const app = express();
dotenv.config();


// CORS
//const allowedOrigins = [" * "]; // Libera todas as origens
const allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Configuração do MongoDB
mongoose.connect(String(process.env.MONGO_URL))
  .then(() => console.log("DB Connection Successful!"))
  .catch(() => console.log("DB Connection Failure!"));

app.use(cors(options));
app.use(express.json());

// Routes API
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute)
app.use('/api/products', productRoute);

// Route STRIPE
app.use('/api/checkout', stripeRoute);

const PORT = process.env.PORT || 5000;

// Configuração de portas
app.listen(PORT, () => {
  console.log(`Backend server is running...${PORT}`)
});