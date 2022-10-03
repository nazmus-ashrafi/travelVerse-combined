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

const productService = {
    getProducts,
    getProduct
}

export default productService