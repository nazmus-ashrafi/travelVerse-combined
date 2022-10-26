import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { addProduct, removeProduct, resetMessage } from '../../features/cart/cartSlice';
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'

import { toast } from 'react-toastify'

import { useNavigate } from "react-router-dom";
import ShopNav from './ShopNav';
 

const CartScreen = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [searchParms] = useSearchParams();
    const qty = Number(searchParms.get("qty"));

    useEffect(() => {

        
        if (params.id) { // if there is a product id in the url
            dispatch(addProduct({ productId : params.id, qty : qty }));
        }

    }, []);
    // dispatch, params.id, qty

    //

    const { cartItems, isLoading, isError, message } = useSelector(
        (state) => state.cart
    )

     useEffect(() => {
        if (message) {
            setInterval(() => {
                dispatch(resetMessage());
            }, 1200);
        }   
    }, [message]);


    const removeFromCartHandler = (productId) => {
        // console.log(productId)
        dispatch(removeProduct(productId));
    }

    let navigate = useNavigate();
    const checkoutHandler = () => {
        // props.history.push("/login?redirect=shipping");
        navigate(`/shipping`)

    }
    

    

    return (
        <div className="bg-base">
            <ShopNav />
            <div class="hidden">
                {message && toast.error(message)}
            </div>
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-200 sm:text-4xl mt-16">Shopping Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                    Items in your shopping cart
                    </h2>
        
                    <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                    {cartItems.map((item, productIdx) => (
                        <li key={item.product._id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                            <img
                            src={item.product.profileImage}
                            alt={item.product.imageAlt}
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                            />
                        </div>
        
                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                                <div className="flex justify-between">
                                <h3 className="text-sm">
                                    <a href={item.product.href} className="font-medium text-zinc-200  hover:text-silver-200">
                                    {item.product.name}
                                    </a>
                                </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                
                                </div>
                                <p className="mt-1 text-sm font-medium text-zinc-200">৳{item.product.price}</p>
                            </div>
        
                            <div class="flex ml-6 items-center">
                            <span class="mr-3">Quantity</span>
                                <div class="relative">
                                {/* <select class="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10" 
                                value={item.qty}
                                onChange={(e) =>
                                    dispatch(addProduct({ productId : item.product._id, qty : Number(e.target.value) }))
                                }
                                >
                                {[...Array(item.product.countInStock).keys()].map(
                                    (x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                    )
                                )}
                                </select> */}
                                {item.qty}
                                
                                
                            </div>

                            <div className="absolute top-0 right-0">
                                <button type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500" onClick={()=>removeFromCartHandler(item.product._id)}>
                                    <span className="sr-only">Remove</span>
                                    <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                        </div>
                            </div>
        
                            {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                            {item.product.inStock ? (
                                <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            ) : (
                                <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                            )}
        
                            <span>{item.product.inStock ? 'In stock' : `Ships in ${item.product.leadTime}`}</span>
                            </p> */}
                        </div>
                        </li>
                    ))}
                    </ul>
                </section>
        
                {/* Order summary */}
                <section
                    aria-labelledby="summary-heading"
                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                >
                    <h2 id="summary-heading" className="text-3xl font-large text-gray-900">
                    Order summary
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
                        
                        {/* <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex items-center text-sm text-gray-600">
                            <span>Shipping estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Learn more about how shipping is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="flex text-sm text-gray-600">
                            <span>Tax estimate</span>
                            <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Learn more about how tax is calculated</span>
                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                            <dd className="text-base font-medium text-gray-900">$112.32</dd>
                        </div> */}
                    </dl>
        
                    <div className="mt-6">

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Checkout
                    </button>

                    </div>
                </section>
                </form>
            </div>
        </div>
    )

};

export default CartScreen;
