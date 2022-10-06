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

const cartService = {
    addProduct,
    removeProduct
}

export default cartService