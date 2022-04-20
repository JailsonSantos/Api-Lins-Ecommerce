import { Schema, model, Document } from 'mongoose';

interface ProductsProps {
  productId: {
    type: String,
  },
  quantity: {
    type: Number,
  }
}

interface OrderProps extends Document {
  userId: string;
  products?: ProductsProps[];
  amount: number;
  address: Object;
  status?: string;
  _doc?: any;
}

const orderSchema = new Schema<OrderProps>(
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: 'pending'
    }
  }, { timestamps: true }
);

export const Order = model<OrderProps>('Order', orderSchema);