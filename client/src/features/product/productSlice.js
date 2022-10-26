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

// Delete a product
export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async ( productId , thunkAPI) => { 
        try {
            const response = await productService.deleteProduct(productId)
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

// Update a product
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ( newPost , thunkAPI) => { 
        try {
            const response = await productService.updateProduct(newPost)
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

// Create a product
export const createProduct = createAsyncThunk(
    'post/createProduct',
    async (newProduct, thunkAPI) => {

      try {
      

      return await productService.createProduct(newProduct)

      
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

    // delete product
    .addCase(deleteProduct.pending, (state) => {
    state.isLoading = true
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
    state.isLoading = false
    state.isSuccess = true

    state.products = state.products.filter(product => product._id !== action.payload._id)
    
    })
    .addCase(deleteProduct.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload
    state.products = null
    })

    // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        console.log(action.payload)
        
        // state.timelinePosts.reduce(timelinePosts.filter(action.payload._id))
        // state.timelinePosts[state.timelinePosts.findIndex(post => post._id.toString === action.payload._id.toString)] = action.payload

        // console.log(timelinePosts.filter(post => post._id.toString === action.payload._id.toString))

        // state.timelinePosts.findIndex(post => post._id.toString === action.payload.postId.toString)


        state.products = state.products.map(product => {
          if (product._id === action.payload._id) {
            return action.payload
          } else {
            return product
          }
        })
        
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        
        state.products = null
      })

      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        

        state.products = [action.payload, ...state.products] 
        
        
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      

   }
})

export const { reset } = productSlice.actions
export default productSlice.reducer