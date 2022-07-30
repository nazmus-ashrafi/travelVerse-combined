
// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'
// const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'
// const User = require('../Models/userModel')
import UserModel from "../Models/userModel.js"

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWTKEY)

      // Get user from the token and set to req.user
      req.user = await UserModel.findById(decoded.id).select('-password')

      next()

    } catch (error) {

      console.log(error)
      res.status(401)
      throw new Error('Not authorized')

    }
  }

  if (!token) {


    // console.log(req.headers.authorization)
    res.status(401)
    throw new Error('Not authorized, no token')

  }

  
})
