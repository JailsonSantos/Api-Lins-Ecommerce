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
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Configuração do MongoDB
mongoose_1.default.connect(String(process.env.MONGO_URL))
    .then(() => console.log("DB Connection Successful!"))
    .catch(() => console.log("DB Connection Failure!"));
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