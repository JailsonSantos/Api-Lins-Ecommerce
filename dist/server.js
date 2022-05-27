"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// STRIPE
const stripe_1 = require("./routes/stripe");
// API ROUTES
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const cart_1 = require("./routes/cart");
const order_1 = require("./routes/order");
const product_1 = require("./routes/product");
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
dotenv_1.default.config();
// CORS
//const allowedOrigins = [" * "]; // Libera todas as origens
/* const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  'https://dashboard.stripe.com',
  "https://checkout.stripe.com",
  'https://api-lins-ecommerce.vercel.app/api/checkout/payment',
  'https://resttesttest.com'
];
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,PUT,POST,DELETE',
  origin: allowedOrigins,
  preflightContinue: false,
}; */
//console.log(allowedOrigins);
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use((0, cors_1.default)());
    next();
});
// Configuração do MongoDB
mongoose_1.default.connect(String(process.env.MONGO_URL))
    .then(() => console.log("DB Connection Successful!"))
    .catch(() => console.log("DB Connection Failure!"));
//app.use(cors());
// Routes API
app.use('/', api_1.apiRoute);
app.use('/api/auth', auth_1.authRoute);
app.use('/api/users', user_1.userRoute);
app.use('/api/carts', cart_1.cartRoute);
app.use('/api/orders', order_1.orderRoute);
app.use('/api/products', product_1.productRoute);
// Route STRIPE
app.use('/api/checkout', stripe_1.stripeRoute);
const PORT = process.env.PORT || 5000;
// Configuração de portas
app.listen(PORT, () => {
    console.log(`Backend server is running...${PORT}`);
});
//# sourceMappingURL=server.js.map