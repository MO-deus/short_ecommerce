import Product from '../models/ProductModel.js';
import asyncHandler from  'express-async-handler';

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

const findProductById = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(!product) {
      return res.status(500).json({message : 'Product not found'});
    }
    return res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

})

const deleteProductById = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if(!product) {
      return res.status(500).json({message : 'product does not exists in the database'});
    }
    return res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

})

export {getAllProducts, createProduct, updateProduct, findProductById, deleteProductById}
