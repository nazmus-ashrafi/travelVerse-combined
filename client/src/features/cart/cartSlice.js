import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

// Get details from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const cartItems = JSON.parse(localStorage.getItem('cartItems'))
const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
const sellerDetails = JSON.parse(localStorage.getItem('sellerDetails'))
//



const initialState = {
  user: user ? user : null,
  cartItems: cartItems ? cartItems : [],
  shippingAddress: shippingAddress ? shippingAddress : {},
  sellerDetails: sellerDetails ? sellerDetails : {},
  
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Add a product to cart
export const addProduct = createAsyncThunk(
    'cart/addProduct',
    async ( { productId , qty } , thunkAPI) => { // this is the product's id
        try {
            // console.log(qty)
            const response = await cartService.addProduct(productId,qty)
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

// Remove a product from cart
export const removeProduct = createAsyncThunk(
    'cart/removeProduct',
    async ( productId , thunkAPI) => { // this is the product's id
        try {
            const response = await cartService.removeProduct(productId)
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

// Add shipping address
export const addShippingAddress = createAsyncThunk(
    'cart/shipping',
    async ( shippingAddress , thunkAPI) => { // this is the product's id
        try {
            const response = await cartService.addShippingAddress(shippingAddress)
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

// Add seller details
export const addSellerDetails = createAsyncThunk(
  'cart/sellerDetails',
    async ( sellerId , thunkAPI) => { // this is the product's id
        try {
            const response = await cartService.addSellerDetails(sellerId)
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


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    resetMessage: (state) => {
      state.message = ''
    },
  },
   extraReducers: (builder) => {
    builder

    // add item to cart
    .addCase(addProduct.pending, (state) => {
    state.isLoading = true
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true


      // if product in cart is from the same seller
      if (state.cartItems.length > 0 && state.cartItems[0].product.userId === action.payload.product.userId) {

        const inCart = state.cartItems.find((item) => item.product._id === action.payload.product._id);

        // if the product is already in the cart, we just update the qty
        if (inCart) {

          const quantityInCart = state.cartItems.find((item) => item.product._id === action.payload.product._id).qty

          // if the quantity in cart + the quantity we want to add is greater than the quantity in stock, we show "Exceeds product's available quantity."
          if(quantityInCart + action.payload.qty <= action.payload.product.countInStock){
            state.cartItems.find((item) => item.product._id === action.payload.product._id).qty += action.payload.qty;
          }else{
            state.message = "Exceeds product's available quantity."
          }

        } else {

          state.cartItems.push(action.payload);
          
        }


        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))


      }else{ // if product in cart is from a different seller

        state.cartItems = [action.payload]
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

      }

      

      

    })
    
    .addCase(addProduct.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload

    state.cartItems = null
    })


    // remove item from cart
    .addCase(removeProduct.pending, (state) => {
    state.isLoading = true
    })
    .addCase(removeProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true

      state.cartItems = state.cartItems.filter((item) => item.product._id !== action.payload._id)

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))  

    })
    
    .addCase(removeProduct.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload

    state.cartItems = null
    })

    // add shipping address
    .addCase(addShippingAddress.pending, (state) => {
    state.isLoading = true
    })
    .addCase(addShippingAddress.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true

      state.shippingAddress = action.payload

      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))

    })
    
    .addCase(addShippingAddress.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload

    state.cartItems = null
    })

    // add seller details
    .addCase(addSellerDetails.pending, (state) => {
    state.isLoading = true
    })
    .addCase(addSellerDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true

      state.sellerDetails = action.payload

      localStorage.setItem('sellerDetails', JSON.stringify(state.sellerDetails))

    })
    
    .addCase(addSellerDetails.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.message = action.payload

    state.cartItems = null
    })


  }
})

export const { reset,resetMessage } = cartSlice.actions
export default cartSlice.reducer
