// Import necessary modules
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const expressAsyncHandler = require('express-async-handler');

// Route to get all products
const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new product 
const createProduct = expressAsyncHandler(async (req, res) => {
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

const updateProduct = expressAsyncHandler(async (req, res) => {
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
