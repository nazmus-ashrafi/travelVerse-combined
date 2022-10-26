import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserModel',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: { // this user is the user who created the product
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'UserModel',
    },
    userId: { // this userId is the userId who created the product
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // profileImage: {
    //   type: String,
    //   required: true,
    // },
    profileImage : {
            type: Array
            
        },
    brand: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product