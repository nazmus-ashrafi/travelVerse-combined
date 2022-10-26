import express from 'express'
const router = express.Router()

import { addOrder, getOrders, getTransactions, fulfillOrder } from '../Controllers/OrderController.js'


router.post('/addorder', addOrder)
router.get('/getorders/:id/customer', getOrders)
router.get('/getorders/:id/seller', getTransactions)
router.put('/:id/fulfillorder', fulfillOrder)

export default router;