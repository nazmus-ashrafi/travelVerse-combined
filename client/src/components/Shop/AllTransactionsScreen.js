import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/solid'
import ShopNav from './ShopNav';

import { getTransactions, fulfillOrder } from '../../features/order/orderSlice';
import axios from 'axios'


export default function AllTransactionsScreen() {

  // reload page once on load 
    // const reloadCount = sessionStorage.getItem('reloadCount');
    // useEffect(() => {
    //     if(reloadCount < 2) {
    //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //     window.location.reload();
    //     } else {
    //     sessionStorage.removeItem('reloadCount');
    //     }
    // }, []);
  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getTransactions(user.user._id))
  }, [])

  const { transactions } = useSelector(state => state.order)

  var options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Dhaka',
  };


  const GetShopDetails = ({shopId}) => { // this is to get buyer details, not shop details
    const [seller, setSeller] = useState({});
    
    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get('/post/' + shopId + "/getanyuser");
                setSeller(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    
    return (
      <>
        {/* shop name */}
        <div className='text-sm'>
          <dt className="font-medium text-gray-200">Customer name</dt>
          <dd className="mt-1 font-medium text-gray-400">{seller.firstname}</dd>
        </div>
      </>
      
    )
  } 


  const GetProductDetails = ({productId,qty}) => {
    const [product, setProduct] = useState({});
    
    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get('/product/' + productId + "/product");
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);


    return (
      <>
        <li key={product.id} className="p-4 sm:p-6">
          <div className="flex items-center sm:items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden sm:w-12 sm:h-12">
              <img
                src={product.profileImage}
                alt={product.profileImage}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="flex-1 ml-6 text-sm">
              <div className="font-medium text-gray-200 sm:flex sm:justify-between">
                <h5>{product.name}</h5>
                <p className="mt-2 sm:mt-0 sm:ml-2 text-gray-400">Qty: {qty}</p>
                <p className="mt-2 sm:mt-0">৳{product.price}</p>
              </div>
              {/* <p className="hidden text-gray-500 sm:block sm:mt-2">{product.description}</p> */}
            </div>
          </div>     
        </li>
      </>

    )

  }


   const onFulfilledClick = (orderId) => {
        
    
        dispatch(fulfillOrder(orderId))
        
    }



  return (
    <>
      {/* <ShopNav/> */}
      <div className="bg-base">
        <div className=" pt-16 pb-16">
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">Transaction history</h1>
              <p className="mt-2 text-sm text-gray-300">
                Check the status of recent transactions.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent transactions</h2>
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {transactions && transactions.map((order) => (
                  <div
                    key={order._id}
                    className="bg-slate-700 border-t-2 border-b-2 border-gray-600 shadow-sm sm:rounded-lg sm:border-2"
                  >
                    <h3 className="sr-only">
                      Order placed on <time dateTime={order.createdAt}>{order.createdAt}</time>
                    </h3>

                    <div className="flex items-center p-4 border-b-2 border-gray-600 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                      <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-200">Order number</dt>
                          <dd className="mt-1 text-gray-400">{order._id.substr(order._id.length - 5)}</dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-200">Date placed</dt>
                          <dd className="mt-1 text-gray-400">
                            <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString("en-US", options)}</time>
                            
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-200">Total amount</dt>
                          <dd className="mt-1 font-medium text-gray-400">৳{order.totalPrice}</dd>
                        </div>
                        
                      </dl>

                      {/* shop name */}
                      <GetShopDetails shopId={order.user} />

                    </div>

                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <ul role="list" className="divide-gray-600 divide-y-2">
                      {order.orderItems.map((product) => (
                        <GetProductDetails productId={product.product} qty={product.qty} />
                      ))}
                    </ul>


                    <div class='grid grid-cols-4 justify-center'>

                        {/* delivery status */}
                        {order.isDelivered ? (
                        <div className="mt-6 sm:flex sm:justify-between pr-6 pl-6 pb-6">
                            <div className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" />

                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg> */}


                            {/* <p className="ml-2 text-sm font-medium text-gray-400">
                                Delivered on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                            </p> */}

                            <p className="ml-2 text-sm font-medium text-gray-400">
                                Delivered
                            </p>
                            </div>
        
                        </div>
                        ) : (
                        <div className="mt-6 sm:flex sm:justify-between pr-6 pl-6 pb-6">
                            <div className="flex items-center">
                            {/* <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" /> */}

                            <svg color='goldenrod' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>

                            <p className="ml-2 text-sm font-medium text-gray-400">
                                Processing
                            </p>
                            </div>
        
                        </div>
                        )}

                        {/* change status button */}
                        <div class="pt-5 pl-20 z-30">

                            <button onClick={()=>onFulfilledClick(order._id)} class={`btn btn-outline btn-info btn-sm ${order.isDelivered && 'hidden'}`}>Fulfilled</button>
                        </div>

                    </div>
                    
                    
                  </div>

                  
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}
