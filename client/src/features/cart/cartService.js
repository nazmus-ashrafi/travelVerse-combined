import axios from 'axios'

const API_URL = '/cart/'

// Add a product to cart
// @route   GET /product/:id/product
// @access  Public
const addProduct = async ( productId, qty ) => { // this is the product's id
    const response = await axios.get('/product/' + `${productId}` +'/product')
    // console.log(qty)
    
    return {product:response.data, qty:qty}

}

// Remove a product from cart
// @route   GET /product/:id/deleteproduct  // we get the item and then delete it in the slice
// @access  Public
const removeProduct = async ( productId ) => { // this is the product's id
    // console.log(productId)
    const response = await axios.get('/product/' + `${productId}` +'/product')
    return response.data
}

// Add shipping address
// @route   
// @access  Public
const addShippingAddress = async ( shippingAddress ) => {
    // const response = await axios.post(API_URL + 'shipping', shippingAddress)
    return shippingAddress
}

// Add seller details
// @route   GET /post/:id/getanyuser // we get seller's details using this route 
// @access  Public
const addSellerDetails = async ( sellerId ) => {
    const response = await axios.get('/post/' + `${sellerId}` +'/getanyuser')
    return response.data
}

const cartService = {
    addProduct,
    removeProduct,
    addShippingAddress,
    addSellerDetails,
}

export default cartService