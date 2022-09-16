import React from 'react'
import FollowerSlider from './FollowerSlider'

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'

import { useState, useEffect } from "react";

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import HomeMaxOutlinedIcon from '@mui/icons-material/HomeMaxOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteAccount from './DeleteAccount';


const Sidebar = ({tab, setTab}) => {

    const { userDetails } = useSelector(
        (state) => state.user
    )

    const { user} = useSelector(
        (state) => state.auth
    )



    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
    const onDeleteClick = () => {
        setShowDeleteAccountModal(true)
    }



  return (
      <>
      {/* sidebar */}

      <div class="sidebarController md:relative transition duration-100 ease-in-out">
    
    <div class="sidebar flex flex-col md:w-52 lg:w-64 lg:right-0 h-screen py-8 bg-white border-r dark:bg-base-200 dark:border-base-100 inset-y-0 left-0 -translate-x-full lg:translate-x-0 transform  md:relative transition duration-100 ease-in-out ">


            {/* -translate-x-full md:translate-x-0 */}

            <div class="flex flex-col items-center mt-0 -mx-2">
                {/* <img class="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/> */}

                <img class="object-cover w-24 h-24 mx-2 rounded-full" src={userDetails && userDetails.profileImage != undefined && userDetails.profileImage.length>0 ? userDetails.profileImage[0] : require('../img/default.png')} alt="avatar"/>

                
                <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{userDetails?userDetails.firstname:"..."}</h4>
                <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">@{userDetails?userDetails.username:"..."}</p>
            </div>
            
            <div class="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <a class={`flex items-center px-4 py-2 btn-ghost cursor-pointer ${tab === 'home'?'glass':''}`} onClick={()=>{setTab("home")}}>
                        <HomeMaxOutlinedIcon fontSize='medium' />

                        <span class="mx-4 font-medium">Dashboard</span>
                    </a>
                    
                    <Link to={`/profile/${user.user._id}`} >

                        <a class="flex items-center px-4 py-2 mt-5 btn-ghost" href="#">
                            <PersonOutlineRoundedIcon fontSize='medium' />

                            <span class="mx-4 font-medium">Profile</span>

                        </a>

                    </Link>

                    <a class={`flex items-center px-4 py-2 mt-5 btn-ghost cursor-pointer ${tab === 'messenger'?'glass':''}`} onClick={()=>{setTab("messenger")}}>
                        {/* <ChatBubbleOutlineRoundedIcon fontSize='medium' /> */}

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            
                        </svg>

                        <span class="mx-4 font-medium">Messenger</span>

                    </a>

                    <a class={`flex items-center px-4 py-2 mt-5 btn-ghost cursor-pointer `} onClick={onDeleteClick} >
                        {/* <ChatBubbleOutlineRoundedIcon fontSize='medium' /> */}

                        <DeleteOutlineRoundedIcon color='warning'/>

                        <span class="mx-4 font-medium text-amber-600">Delete Account</span>

                    </a>

                    <DeleteAccount
                    showModal={showDeleteAccountModal}
                    setShowModal={setShowDeleteAccountModal}
                    // data={data}
                    userId = {user.user._id}
                    />

                    {/* <a class="flex items-center px-4 py-2 mt-5 btn-ghost" href="#">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span class="mx-4 font-medium">Settings</span>
                    </a>
                    

                    {/* <a class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span class="mx-4 font-medium">Tickets</span>
                    </a> */}

                    {/* <a class="flex items-center px-4 py-2 mt-5 btn-ghost" href="#">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span class="mx-4 font-medium">Settings</span>
                    </a> */}

                    <a class="flex items-center px-4 py-2 mt-5  transition-colors duration-200 transform ">

                        
                        
                        <FollowerSlider/>
              


                    </a>
                    
                </nav>
            </div>
        
    </div>

    

    </div>

    </>
    
  )
}

export default Sidebar
