import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const orders = []
const order = {}

const initialState = {
  orders: orders ? orders : [],
    order: order ? order : {},

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Add order
export const addOrder = createAsyncThunk(
    'order/addOrder',
    async ( order , thunkAPI) => { // this is the order object
        try {
            const response = await orderService.addOrder(order)
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


// Get all orders for customer
export const getOrders = createAsyncThunk(
  'order/getorders/:id/customer',
    async ( customerId , thunkAPI) => { // this is id of customer
        try {
            const response = await orderService.getOrders(customerId)
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

export const orderSlice = createSlice({
  name: 'order',
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

    // add item to cart
    .addCase(addOrder.pending, (state) => {
    state.isLoading = true
    })
    .addCase(addOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true

        state.order = action.payload

    })
    
    .addCase(addOrder.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload

    state.order = null
    })

    // get all orders for customer
    .addCase(getOrders.pending, (state) => {
    state.isLoading = true
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true

        state.orders = action.payload

    })
    
    .addCase(getOrders.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload

    state.orders = null
    })
   

  }
})


export const { reset } = orderSlice.actions
export default orderSlice.reducer