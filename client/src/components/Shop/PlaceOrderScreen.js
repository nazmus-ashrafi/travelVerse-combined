import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { addOrder } from '../../features/order/orderSlice';
import { updateProduct } from '../../features/product/productSlice';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';


import ShopNav from './ShopNav';

const PlaceOrderScreen = () => {

    const { cartItems, sellerDetails, isLoading, isError, message, shippingAddress } = useSelector(
        (state) => state.cart
    )
    const { user } = useSelector((state) => state.auth)
    const { isSuccess } = useSelector((state) => state.order)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const placeOrderHandler = () => {
        
        const order = {
            user: user.user,
            sellerUser: sellerDetails,
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            sellerDetails: sellerDetails,
            paymentMethod: 'COD',
            shippingPrice: 50,
            taxPrice: 0,
            // itemsPrice: Number(cartItems
            //                         .reduce((acc, item) => acc + item.qty * item.product.price , 0)
            //                         .toFixed(2)),
            totalPrice: Number(cartItems
                                    .reduce((acc, item) => acc + item.qty * item.product.price , 50)
                                    .toFixed(2)),
        }
        dispatch(addOrder(order))


        // deduct item from seller's inventory
        cartItems.map(item => {

            const resetCountInStock = async () => {
                await axios.put(`http://localhost:5000/product/${item.product._id}/updateCountInStock`, {
                    countInStock: item.product.countInStock - item.qty
                })
            }
            resetCountInStock()
        })

        



    }


    useEffect(() => {

        if (isSuccess) {
            navigate('/allorders')

            localStorage.removeItem("cartItems");
            localStorage.removeItem("sellerDetails");
            // localStorage.removeItem("shippingAddress");
        }


    }, [isSuccess])


    return (
        <>
        <ShopNav />
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto mt-24">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-300">Order Summary</h1>
                
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full bg-slate-700 border-t-2 border-b-2 border-gray-600 shadow-sm sm:rounded-lg sm:border-2">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-200">Your Cart</p>

                    
                        {cartItems.map((item) => (

                            <div key={item.product._id} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block rounded-xl" src={item.product.profileImage} alt="dress" />
                                    <img className="w-full md:hidden rounded-xl" src={item.product.profileImage}  alt="dress" />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-300">{item.product.name}</h3>
                                        
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        
                                        <p className="text-base xl:text-lg leading-6 text-gray-300 ml-9">Quantity: {item.qty}</p>
                                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-300">{item.product.price}</p>
                                    </div>
                                </div>
                            </div>


                        ))}
                        
                        
                        
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 ">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full space-y-6 bg-slate-700 border-t-2 border-b-2 border-gray-600 shadow-sm sm:rounded-lg sm:border-2">
                            <h3 className="text-xl font-semibold leading-5 text-gray-300">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-300">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-300">৳{cartItems
                                    .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                                    .toFixed(2)}</p>
                                </div>
                                
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-300">Shipping</p>
                                    <p className="text-base leading-4 text-gray-300">৳50.00</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-300">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-300">৳{cartItems
                                    .reduce((acc, item) => acc + item.qty * item.product.price , 50)
                                    .toFixed(2)} </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full space-y-6 bg-slate-700 border-t-2 border-b-2 border-gray-600 shadow-sm sm:rounded-lg sm:border-2">
                            <h3 className="text-xl font-semibold leading-5 text-gray-300">Shipping</h3>
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                    <div class="w-8 h-8">
                                        <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-gray-300">
                                            Travelverse Delivery
                                            <br />
                                            <span className="font-normal">Delivery with 2 Hours</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold leading-6 text-gray-300">৳50.00</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col bg-slate-700 border-t-2 border-b-2 border-gray-600 shadow-sm sm:rounded-lg sm:border-2 ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-300">Shop Details</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                {/* <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" /> */}

                                <img className="h-8 w-8 rounded-full" src={sellerDetails && sellerDetails.profileImage != undefined && sellerDetails.profileImage.length>0 ? sellerDetails.profileImage[0] : require('../../img/default.png')} alt="avatar"/>

                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-300">{sellerDetails.shopname}</p>
                                    <p className="text-sm leading-5 text-gray-400">@{sellerDetails.username}</p>
                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#F0F8FF" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#F0F8FF" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-sm leading-5 text-gray-300">{sellerDetails.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-bold leading-4 text-center md:text-left text-gray-300">Shipping Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-300">{shippingAddress.address} {shippingAddress.city} {shippingAddress.postalCode} {shippingAddress.country}</p>
                                </div>
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-300">* Please Pay With Cash On Delivery</p>
                                    
                                </div>
                            </div>
                            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                <button className="btn btn-primary w-full" onClick={()=>placeOrderHandler()}>Place order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default PlaceOrderScreen;
