import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addShippingAddress } from '../../features/cart/cartSlice';
import { addSellerDetails } from '../../features/cart/cartSlice';

import { useNavigate } from 'react-router-dom'

import ShopNav from './ShopNav';

const ShippingScreen = () => {

    const { cartItems, isLoading, isError, message, shippingAddress } = useSelector(
        (state) => state.cart
    )

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(addShippingAddress({ address, city, postalCode, country }))
        dispatch(addSellerDetails(cartItems[0].product.userId))

        navigate('/placeorder')
    }


    
  return (
    <>
        <ShopNav />
        <form class="container px-5 py-5 mx-auto infoForm authForm" onSubmit={submitHandler}  >
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-6 sm:px-6 lg:max-w-5xl lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-200 sm:text-4xl">Shipping & Payment</h1>

                <div class="relative mb-4 mt-8">
                    <label for="address" class="leading-7 text-sm text-zinc-400">Address</label>

                    <input type="name" id="address" name="address" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} 
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}  />

                </div>
                <div class="relative mb-4 mt-8">
                    <label for="city" class="leading-7 text-sm text-zinc-400">City</label>

                    <input type="name" id="city" name="city" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                />

                </div>
                <div class="relative mb-4 mt-8">
                    <label for="postalCode" class="leading-7 text-sm text-zinc-400">Postal code</label>

                    <input type="name" id="postalCode" name="postalCode" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}  
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                    />

                </div>
                <div class="relative mb-4 mt-8">
                    <label for="country" class="leading-7 text-sm text-zinc-400">Country</label>

                    <input type="name" id="country" name="country" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}  

                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    />

                </div>
                <div class="relative mb-4 mt-10">
                    <section
                    aria-labelledby="summary-heading"
                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 outline outline-4 outline-blue-500"
                >
                    <h2 id="summary-heading" className="text-3xl font-large text-gray-900">
                    Order details
                    </h2>
                    <h2 className="text-base text-gray-900">
                        Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        items
                    </h2>
        
                    <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-base text-gray-600">Subtotal</dt>
                            <dd className="text-base font-medium text-gray-900">৳{cartItems
                            .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                            .toFixed(2)}</dd>
                        </div>
                    
                    </dl>

                    <h3 class="text-gray-600 text-2xl">A shipping charge of ৳50 will be added in the next step</h3>
        
                    <div className="mt-6">

                    

                    </div>
                    </section>
                </div>
                

                <button class="btn btn-primary btn-wide mt-8" type="submit">Continue</button>
            </div>

        </form>
        
        
    </>
  )
}

export default ShippingScreen