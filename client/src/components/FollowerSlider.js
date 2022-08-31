
import { motion } from "framer-motion"


import React from 'react'
import { useRef, useState } from "react";

import { useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

import { followUser, unfollowUser } from '../features/user/userSlice'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";

const FollowerSlider = () => {

    const { user } = useSelector(
      (state) => state.auth
    )

    const { userDetails } = useSelector(
        (state) => state.user
    )
    

    const dispatch = useDispatch()

    //-------------------------------------------------------------------------

  // get all unfollowed users
  const [allUsers, setAllUsers] = useState();
  // const [allUnfollowedUsers, setAllUnfollowedUsers] = useState();
  

  const getAllUsers = async () => {
    const response = await axios.get(process.env.REACT_APP_POST_URL + user.user._id  + "/getallnotfollowedusers")
    
    setAllUsers(response.data)
    // console.log(response.data)
    


    // console.log(response.data)
    // setAllUnfollowedUsers(allUsers)
    // console.log(allUnfollowedUsers)
    
  }

  useEffect(() => {
    getAllUsers()

    
  }, []);


  


  return (
    <div class="overflow-y-auto h-96 no-scrollbar">
      {/* h-64  h-72 */}

      <article class="prose ">
        <p for="" class="mt-3 mb-3 tracking-wider prose-lg ml-3"><b>People You May Know</b></p>
              
      </article>

      <hr class="w-11/12 xl:col-start-1 xl:col-span-3 mb-4 opacity-10"></hr>

      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-full"
      >

        {allUsers && allUsers.map((currUser, index) => {
          return (
          <SwiperSlide>
            <div class="w-full">
              {/* follower card */}
                <div
                  
                  key="modal"
                  
                  // drag
                  // dragConstraints={{ left: 0, right: 0,top: 0,bottom:0 }}
                  // dragConstraints={constraintsRef}
                  
                  className='z-10 xl:col-start-3 xl:col-span-1 md:col-start-2 md:col-span-1 '
                  
                  
                >
                  {/* follow card */}
                  <div class="card w-56 bg-base-100 shadow-xl grid place-items-center z-10 space-y-0">

                      

                    {/* avatar */}
                    <a class="avatar pt-4" href={`profile/${currUser._id}`}>
                      <div class="w-20 mask mask-squircle">
                        <img src={currUser.profileImage != undefined && currUser.profileImage.length>0 ? currUser.profileImage[0] : require('../img/default.png')}/>
                      </div>
                    </a>

                    

                  
                    {/* name, description and follow button */}
                    <div class="card-body items-center text-center ">
                        
                      <h2 class="text-lg font-extrabold">{currUser.username}</h2>

                      <div class="text-base-content text-sm text-opacity-60">{currUser.description}</div>
                  
                      
                      {/* <div class="card-actions">
                        <button class="btn btn-info btn-sm">Follow</button>
                      </div> */}

                      {user && user.user._id != currUser._id &&

                        (
                            userDetails && userDetails.following.includes(currUser._id) ? 
                                <div class="card-actions">
                                    <button class="btn btn-error text-white  btn-sm " onClick={()=>{
                                    dispatch(unfollowUser({followUser: currUser._id, userId: user.user._id}))
                                    }}>Unfollow</button>
                                </div>    :
                            
                                <div class="card-actions">
                                    <button class="btn btn-primary text-white  btn-sm " onClick={()=>{
                                      dispatch(followUser({followUser: currUser._id, userId: user.user._id}))
                                    }}>Follow</button>
                                </div>
                        )
                      }
                        
                    </div>

                  
                  </div>
                      


                </div>

              
                  
              </div> 

          </SwiperSlide>
          )

        })}
        
      </Swiper>
      

          
    </div>

    

    
  )
}

export default FollowerSlider

