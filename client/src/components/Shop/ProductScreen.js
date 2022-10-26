import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { getProduct } from '../../features/product/productSlice';
import { useParams } from "react-router-dom";

import Spinner from '../Spinner';
import ShopNav from './ShopNav';

import { useNavigate } from "react-router-dom";

const ProductScreen = () => {

  const { id } = useParams() // getting the product id from url
  // console.log(id)

  

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getProduct(id));

  }, [])

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  )

  const { user } = useSelector(
    (state) => state.auth
  )

  //

  const [qty, setQty] = useState(1)

  //
  let navigate = useNavigate();
  const addToCartHandler = () => {
    
    navigate(`/cart/${id}?qty=${qty}`)
    
  }


  return (
    <>
      <ShopNav />
      {isLoading ? <h2><Spinner /></h2> : isError ? <h2>{message}</h2> : 
      (
      <section class="text-gray-400 bg-base body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.profileImage ? product.profileImage : "https://dummyimage.com/400x400"}/>
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 class="text-white text-3xl title-font font-medium mb-1">{product.name}</h1>
              {/* <div class="flex mb-4">
                <span class="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="ml-3">4 Reviews</span>
                </span>
                
              </div> */}
              <p class="leading-relaxed">{product.description}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                {/* <div class="flex">
                  <span class="mr-3">Color</span>
                  <button class="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-800 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-800 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div> */}
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Quantity</span>
                  <div class="relative">
                    <select class="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10" 
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-white">৳{product.price}</span>

                {!user.user.isShop ? // show only if user is not shop
                product.countInStock > 0 ? ( // button enabled if product is in stock
                <button class="flex ml-auto text-white btn btn-primary" onClick={addToCartHandler}>Add to cart</button>):
                <button class="flex ml-auto text-white btn btn-disabled">Not in stock</button>
                 : null }
                
                
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  )
}

export default ProductScreen