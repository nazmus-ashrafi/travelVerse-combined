import axios from 'axios'

const API_URL = '/auth/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // window.location.reload()

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // window.location.reload()

  return response.data
}



// Logout user
const logout = () => {
  localStorage.removeItem('user')
}



const authService = {
  register,
  login,
  logout,

  
}

export default authService