import axios from 'axios'

const API_URL = '/product/'

// Get all products by a shop
// @route   GET /products/:id  //this id is the shop's userId
// @access  Public
const getProducts = async (userId) => { // this is the shop's userId
  const response = await axios.get(API_URL + `${userId}`)
  return response.data
}

// Get a single product
// @route   GET /product/:id  //this id is the product's id
// @access  Public
const getProduct = async (productId) => { // this is the shop's userId
  const response = await axios.get(API_URL + `${productId}` +'/product')
  return response.data
}

// Delete a product
// @route   DELETE /product/:id/delete  //this id is the product's id
// @access  Public
const deleteProduct = async (productId) => { // this is the shop's userId
  const response = await axios.delete(API_URL + `${productId}` +'/delete')
  return response.data
}

// Update a product
// @route   PUT /product/:id/update  //this id is the product's id
// @access  Public
const updateProduct = async (newProduct) => { // this is the shop's userId
  const response = await axios.put(API_URL + `${newProduct._id}` +'/update', newProduct)
  return response.data
}


// Create a product
// @route   POST /product/create 
// @access  Public
const createProduct = async (newProduct) => { 
  const response = await axios.post(API_URL + 'create', newProduct)
  return response.data
}



const productService = {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
}

export default productService