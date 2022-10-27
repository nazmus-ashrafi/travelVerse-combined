import express from 'express'
const router = express.Router()
import Product from '../Models/productModel.js'
import asyncHandler from 'express-async-handler'
import UserModel from '../Models/userModel.js'


// todo : add functionality in controller

// @desc    Fetch all products for a shop
// @route   GET /products
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {

    const userId = req.params.id; // this req.params.id is the shop's userId
    const currentUser = await UserModel.findById(userId);

    const products = await Product.find({ userId: userId });
    res.json(products)
}))

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
router.get('/:id/product', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id) // this req.params.id is the product's id
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

// @desc    Delete a product
// @route   DELETE /products/:id/delete
// @access  
router.delete('/:id/delete', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

// @desc    Update a product
// @route   PUT /products/:id/update
// @access
router.put('/:id/update', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {

        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.profileImage = req.body.profileImage || product.profileImage
        product.description = req.body.description || product.description
        product.brand= req.body.brand || product.brand
        product.countInStock = req.body.countInStock || product.countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

// @desc    Create a product
// @route   POST /products/create
// @access 
router.post('/create', asyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        await newProduct.save();
        res.status(200).json(newProduct);
        
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
        
    }

}))

// Update a product countInStock
// @route   PUT /products/:id/updateCountInStock
// @access
router.put('/:id/updateCountInStock', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {

        // product.countInStock = req.body.countInStock || product.countInStock
        product.countInStock = req.body.countInStock

        const updatedProduct = await product.save()
        console.log(updatedProduct)
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))






export default router