import express from 'express'
const router = express.Router()

import { addOrder,getOrders } from '../Controllers/OrderController.js'


router.post('/addorder', addOrder)
router.get('/getorders/:id/customer', getOrders)

export default router;