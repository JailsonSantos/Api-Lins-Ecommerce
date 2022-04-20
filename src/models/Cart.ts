import { Schema, model, Document } from 'mongoose';

interface ProductsProps {
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
  }
}

interface CartProps extends Document {
  userId: string;
  products?: ProductsProps[];
  _doc?: any;
}

const cartSchema = new Schema<CartProps>(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  }, { timestamps: true }
);

export const Cart = model<CartProps>('Cart', cartSchema);