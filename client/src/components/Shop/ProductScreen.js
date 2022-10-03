import React, { useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { getProduct } from '../../features/product/productSlice';
import { useParams } from "react-router-dom";

import Spinner from '../Spinner';

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


  return (
    <>
      {isLoading ? <h2><Spinner /></h2> : isError ? <h2>{message}</h2> : (
      <section class="text-gray-400 bg-base body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 class="text-white text-3xl title-font font-medium mb-4">{product.name}</h1>
              <div class="flex mb-4">
                <a class="flex-grow text-blue-400 border-b-2 border-blue-500 py-2 text-lg px-1">Description</a>
                {/* <a class="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1">Reviews</a>
                <a class="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1">Details</a> */}
              </div>
              <p class="leading-relaxed mb-4">{product.description}</p>
              {/* <div class="flex border-t border-gray-800 py-2">
                <span class="text-gray-500">Color</span>
                <span class="ml-auto text-white">Blue</span>
              </div> */}
              {/* <div class="flex border-t border-gray-800 py-2">
                <span class="text-gray-500">Size</span>
                <span class="ml-auto text-white">Medium</span>
              </div> */}
              <div class="flex border-t border-b mb-6 border-gray-800 py-2">
                <span class="text-gray-500">Quantity</span>
                <span class="ml-auto text-white">{product.countInStock}</span>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-white">৳{product.price}</span>
                <button class="flex ml-auto btn btn-primary">Add to cart</button>
                {/* <button class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
            </div>
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image}/>
          </div>
        </div>
      </section>
      )}
    </>
  )
}

export default ProductScreen