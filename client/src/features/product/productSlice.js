import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
//

const products = []
const product = { reviews: [] }

const initialState = {
  user: user ? user : null,
  products: products ? products : [],
  product: product ? product : { reviews: [] },
  
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getProducts = createAsyncThunk(
    'product/getProducts',
    async ( userId , thunkAPI) => { // this is the shop's userId
        try {
            const response = await productService.getProducts(userId)
            return response
        } catch (error) {
            const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

            return thunkAPI.rejectWithValue(message)
            
        }
        
    }
)

// Get a single product
export const getProduct = createAsyncThunk(
    'product/getProduct',
    async ( productId , thunkAPI) => { 
        try {
            const response = await productService.getProduct(productId)
            return response
        } catch (error) {
            const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()

            return thunkAPI.rejectWithValue(message)
            
        }
        
    }
)



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
   extraReducers: (builder) => {
    builder

    // get all products by a shop
    .addCase(getProducts.pending, (state) => {
    state.isLoading = true
    })
    .addCase(getProducts.fulfilled, (state, action) => {
    state.isLoading = false
    state.isSuccess = true

    state.products = action.payload
    })
    .addCase(getProducts.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload
    state.product = null
    })


    // get a single product
    .addCase(getProduct.pending, (state) => {
    state.isLoading = true
    })
    .addCase(getProduct.fulfilled, (state, action) => {
    state.isLoading = false
    state.isSuccess = true

    state.product = action.payload
    })
    .addCase(getProduct.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload
    state.products = null
    })

      

   }
})

export const { reset } = productSlice.actions
export default productSlice.reducer