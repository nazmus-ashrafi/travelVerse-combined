import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import ConversationRoute from './Routes/ConversationRoute.js'
import MessageRoute from './Routes/MessageRoute.js'

import ProductRoute from './Routes/ProductRoute.js'
import OrderRoute from './Routes/OrderRoute.js'

import {errorHandler} from "./middleware/errorMiddleware.js"

import cors from 'cors'

// Routes

const app = express();
app.use(cors())



// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
)
.catch((error) => console.log(error));



// usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/conversation', ConversationRoute)
app.use('/message', MessageRoute)

app.use('/product', ProductRoute)
app.use('/order', OrderRoute)



// error handler
app.use(errorHandler)