
// import dotenv from 'dotenv'

// import users from './data/users.js'
import products from './data/products.js'
// import User from './models/userModel.js'
import Product from './Models/productModel.js'
// import Order from './models/orderModel.js'
// import connectDB from './config/db.js'


import mongoose from 'mongoose'

// dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://nazmus:2878@travelverse.d4f0z.mongodb.net/travelverse?retryWrites=true&w=majority')

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()

const importData = async () => {
  try {
    
    await Product.deleteMany()
    

    const sampleProducts = products.map((product) => {
      return { ...product}
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    
    await Product.deleteMany()
   

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}