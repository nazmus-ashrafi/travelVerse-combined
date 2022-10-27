import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const ShopNav = () => {

    const navigate = useNavigate()
    const { user } = useSelector(
        (state) => state.auth
    )
    const { cartItems } = useSelector(
        (state) => state.cart
    )

  return (
    <>
    <div class="navbar bg-base-200 fixed w-full z-10 top-0">
        <div class="flex-1">   
            <a class="cursor-pointer" onClick={()=>navigate("/")}>
                <h1 class="font-['Abril'] italic font-medium text-2xl text-sky-600 text-center ml-5" >Travelverse</h1>
            </a>
            
            <a class=" ml-4 normal-case text-xl">Shops</a>
        </div>
        <div class="flex-none mr-6">
            <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle mr-5">
                <div class="indicator" onClick={()=>navigate("/cart")}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span class="badge badge-sm indicator-item">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </div>
            </label>
            
            </div>
            <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                {/* <img src="https://placeimg.com/80/80/people" /> */}
                <img src={user.user && user.user.profileImage != undefined && user.user.profileImage.length>0 ? user.user.profileImage[0] : require('../../img/default.png')} alt="avatar"/>
                </div>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                {/* <li>
                <a class="justify-between">
                    Profile
                    <span class="badge">New</span>
                </a>
                </li> */}
                <li><a onClick={()=>navigate("/")}>Dashboard</a></li>
                {/* <li><a>Logout</a></li> */}
            </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShopNav