import asyncHandler from 'express-async-handler'
import Order from '../Models/OrderModel.js'

// @desc    Create new order
// @route   POST /addorder
// @access  Public
const addOrder = asyncHandler(async (req, res) => {
  const {
    user,
    sellerUser,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    
  } else {
    const order = new Order({
        user,
        sellerUser,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc    Get all orders for customer
// @route   GET /getorders/:id/customer
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id }).sort({_id:-1}) 
  res.json(orders)
})

export {
  addOrder,
  getOrders,

}