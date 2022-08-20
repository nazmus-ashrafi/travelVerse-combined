import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'


// Get user from localStorage
// const userDetails = JSON.parse(localStorage.getItem('user'))
const userDetails = null

const initialState = {
  userDetails: userDetails ? userDetails : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


//

// Get user
export const getUser = createAsyncThunk(
  'user/:id',
  async (user, thunkAPI) => {
    try {

      // console.log(user)
      
      return await userService.getUser(user)

    } catch (error) {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        
      console.log(message)

      return thunkAPI.rejectWithValue(message)
      
    }
  }
)

// Dismiss notifications

export const dismissNotifications = createAsyncThunk(
  'user/:id/dismissNotifications',
  async (user, thunkAPI) => {
    try {

      console.log(user)
      
      return await userService.dismissNotifications(user)

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


// update user
export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
  try {

    return await userService.updateUser(user)

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// follow user
export const followUser = createAsyncThunk('user/followUser', async (data, thunkAPI) => {
  try {

    let followUserId = data.followUser
    let userId = data.userId

    console.log(data)

    return await userService.followUser(followUserId,userId)

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// unfollow user
export const unfollowUser = createAsyncThunk('user/unfollowUser', async (data, thunkAPI) => {
  try {

    let followUserId = data.followUser
    let userId = data.userId

    console.log(data)

    return await userService.unfollowUser(followUserId,userId)

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})





//

export const userSlice = createSlice({
  name: 'user',
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

    // get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDetails = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userDetails = null
      })

    // dismiss notifications
    .addCase(dismissNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(dismissNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDetails.notifications = []
        // console.log(action.payload)
      })
      .addCase(dismissNotifications.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userDetails = null
      })

    // update user

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDetails = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userDetails = null
      })

    // follow user
      .addCase(followUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDetails.following.push(action.payload._id)
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userDetails = null
      })

    // unfollow user
      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userDetails.following.splice(state.userDetails.following.indexOf(action.payload._id), 1)
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userDetails = null
      })

      
      
   }
})

export const { reset } = userSlice.actions
export default userSlice.reducer