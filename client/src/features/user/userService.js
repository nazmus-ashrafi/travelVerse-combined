import axios from 'axios'

const API_URL = '/user/'

// Get user
// @route   GET /user/:id
const getUser = async (userData) => {

    const id = userData
    const response = await axios.get(API_URL + `${id}`)

    console.log(response)
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



const userService = {
  getUser,
  dismissNotifications
  
}

export default userService