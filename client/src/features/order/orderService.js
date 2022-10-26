import axios from 'axios'

const API_URL = '/order/'

// Add order
// @route   POST /addorder
// @access  Public
const addOrder = async ( order ) => {
    const response = await axios.post(API_URL + 'addorder', order)
    return response.data
}

// Get all orders for customer
// @route   GET /getorders/:id/customer
// @access  Public
const getOrders = async ( customerId ) => {
    const response = await axios.get(API_URL + 'getorders/' + customerId + '/customer')
    return response.data
}

// Get all orders for seller
// @route   GET /getorders/:id/seller
// @access  Public
const getTransactions = async ( sellerId ) => {
    const response = await axios.get(API_URL + 'getorders/' + sellerId + '/seller')
    return response.data
}

// Fulfill order
// @route   PUT /:id/fulfillorder
// @access  Public
const fulfillOrder = async ( orderId ) => {
    const response = await axios.put(API_URL + orderId + '/fulfillorder')
    return response.data
}

const orderService = {
    addOrder,
    getOrders,
    getTransactions,
    fulfillOrder,
}

export default orderService