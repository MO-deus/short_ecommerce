import Product from '../models/ProductModel.js';
import asyncHandler from  'express-async-handler';

// Route to get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new product 
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

export {getAllProducts, createProduct, updateProduct}
