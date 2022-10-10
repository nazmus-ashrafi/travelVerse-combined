import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: { // this user is the user who placed the order
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserModel',
    },
    sellerUser: { // this user is the user who is selling the product
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserModel',
    },
    orderItems: [
      {
        name: { type: String, required: false },
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      required: false,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
      required: false,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
      required: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order