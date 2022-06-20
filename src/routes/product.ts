import { Router, Request, Response } from 'express';
import { verifyTokenAndAdmin } from '../middleware/verifyToken';

const productRoute = Router();

import { Product } from '../models/Product'

// CREATE
productRoute.post('/', verifyTokenAndAdmin, async (request: Request, response: Response) => {

  const newProduct = new Product(request.body);

  try {
    const savedProduct = await newProduct.save();
    return response.status(200).json(savedProduct);
  } catch (error) {
    return response.status(500).json(error);
  }
});

// UPDATE
productRoute.put('/:id', verifyTokenAndAdmin, async (request: Request, response: Response) => {

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );

    return response.status(200).json(updatedProduct);

  } catch (error) {
    return response.status(500).json(error);
  }
});

// DELETE
productRoute.delete('/:id', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  try {
    await Product.findByIdAndDelete(request.params.id);
    return response.status(200).json('Product has been deleted...');
  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET
productRoute.get('/find/:id', async (request: Request, response: Response) => {
  try {
    const product = await Product.findById(request.params.id);

    if (product) {
      const { password, ...others } = product._doc;
      return response.status(200).json(others);
    }

  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET ALL
productRoute.get('/', async (request: Request, response: Response) => {
  const qNew = request.query.new;
  const qCategory = request.query.category;

  // Paginação
  const page = +request.query.page! || 1;
  const per_page = +request.query.limit! || 5;


  const pageStart = (Number(page) - 1) * Number(per_page);
  const pageEnd = pageStart + Number(per_page);

  try {
    let products;
    let total;

    if (qNew) {
      // Lista em ordem Descrecente (-1) ou Crescente (1) limite de 10 produtos
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })

      total = products.length;
      products = products.slice(pageStart, pageEnd);
    } else {
      products = await Product.find();
    }

    return response.status(200).json({ products, total });
  } catch (error) {
    return response.status(500).json(error);
  }
});

export { productRoute };

