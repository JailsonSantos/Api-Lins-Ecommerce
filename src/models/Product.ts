import { Schema, model, Document } from 'mongoose';

interface ProductProps extends Document {
  title: string;
  description: string;
  img: string;
  categories?: Array<any>;
  size?: Array<any>;
  color?: Array<any>;
  price: number;
  inStock?: boolean;
  _doc?: any;
}

const productSchema = new Schema<ProductProps>(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true }
);

export const Product = model<ProductProps>('Product', productSchema);