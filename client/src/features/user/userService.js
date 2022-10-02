import axios from 'axios'

const API_URL = '/user/'

// Get user
// @route   GET /user/:id
// Private route
const getUser = async (user) => {

    // console.log(user.user._id)

    const id = user.user._id
    const token = user.token
    

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    
    const response = await axios.get(API_URL + id, config)

    // console.log(response.data)
    return response.data

  
}

// Dismiss notifications
// @route   PUT /user/:id
const dismissNotifications = async (userData) => {

    const id = userData
    const response = await axios.put(API_URL + `${id}` + "/dismissNotifications")

    console.log(response)
    return response.data
   
  
}

// ------------------------------------------------- ??

const updateUser = async (userData) => {
  const response = await axios.put(API_URL + userData._id, userData)

  return response.data
}


// Follow user
// @route   PUT /user/:id
const followUser = async (followUserId,userId) => {

  const followId = followUserId
  const currentUserId = userId

  // console.log(API_URL + `${followId}` + "/follow", {currentUserId})
  const response = await axios.put(API_URL + `${followId}` + "/follow", {currentUserId})

  // console.log(response)
  return response.data
   
  
}

// Unfollow user
// @route   PUT /user/:id
const unfollowUser = async (followUserId,userId) => {

  const followId = followUserId
  const currentUserId = userId

  // console.log(API_URL + `${followId}` + "/unfollow", {currentUserId})
  const response = await axios.put(API_URL + `${followId}` + "/unfollow", {currentUserId})

  // console.log(response)
  return response.data
   
  
}





const userService = {
  getUser,
  dismissNotifications,

  updateUser,

  followUser,
  unfollowUser,
  
}

export default userService