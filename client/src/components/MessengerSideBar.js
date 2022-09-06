import React from 'react'
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import axios from 'axios'

import { followUser, unfollowUser } from '../features/user/userSlice'

const MessengerSideBar = () => {

    // redux
    const { userDetails } = useSelector(
        (state) => state.user
    )

    const { user } = useSelector(
      (state) => state.auth
    )
    

    const dispatch = useDispatch()
    //

    const [allFollows, setAllFollows] = useState([])
    const [allFollowers, setAllFollowers] = useState([])

    // let allFollows=[]

    // get each follow detail
    useEffect(() => {
        const fetchFollowingsDetails = async () => {
        
            console.log("fetching")

            // console.log(userDetails.following)

            setAllFollows([])

            userDetails && userDetails.following.forEach(async (follow) => {
              const followDetails = await axios.get(process.env.REACT_APP_POST_URL + follow + "/getanyuser")

            //   console.log(follows.data)

                // setAllFollows(current => [...current, follows.data])

                let currFollow = allFollows.includes(followDetails.data) ? null : followDetails.data

                // console.log(currFollow+"hi this is currFollow")
                

                setAllFollows(current => 
                    // allFollows.includes(current)? null : [...current, follows.data]
                    [...current, currFollow]
                )

                
            })

            // console.log(allFollows)
       
            
        }

        const fetchFollowersDetails = async () => {
        
            console.log("fetching")

            // console.log(userDetails.following)

            setAllFollowers([])

            userDetails && userDetails.followers.forEach(async (follow) => {
              const followerDetails = await axios.get(process.env.REACT_APP_POST_URL + follow + "/getanyuser")

            //   console.log(follows.data)

                // setAllFollows(current => [...current, follows.data])

                let currFollowers = allFollowers.includes(followerDetails.data) ? null : followerDetails.data

                // console.log(currFollow+"hi this is currFollow")
                

                setAllFollowers(current => 
                    // allFollows.includes(current)? null : [...current, follows.data]
                    [...current, currFollowers]
                )

                
            })

            // console.log(allFollows)
       
            
        }

        fetchFollowingsDetails();
        fetchFollowersDetails();
        // console.log(allFollows)
        
    }, [userDetails]);
    //

    const [query, setQuery] = useState("");


    // people who you might want to follow

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

    
  }, [userDetails]);

  //



  return (

    
    <>

    <div class="messengerSidebarController md:relative transition duration-100 ease-in-out">

        <div class="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-base-200 dark:border-base-100 translate-x-full md:translate-x-0 transform  md:relative transition duration-100 ease-in-out">
        

        <div class="relative mt-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>

            <input type="text" class="w-full py-2 pl-10 pr-4 input" placeholder="Search Travelverse"  onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
        </div>

        <div class="overflow-y-auto no-scrollbar">

            <div>
                <hr class="my-6 border-gray-200 dark:border-gray-600" />

                <article class="prose ">
                    <p for="" class="mt-3 mb-3 tracking-wider prose-lg ml-3"><b>Following</b></p>
                    
                </article>
                
                
                <div class=" mt-6 ">
                    
                    <nav>
                        {allFollows && allFollows.filter((user) =>
                        user.username.toLowerCase().includes(query)
                        ).map((currUser, index) => {

                            
                            return(
                            <div class="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md hover:ring justify-between" >



                                <a href={`profile/${currUser._id}`}>
                                    <img class="object-cover mx-1 rounded-full h-6 w-6 ml-4" src={currUser && currUser.profileImage != undefined && currUser.profileImage.length>0 ? currUser.profileImage[0] : require('../img/default.png')} alt="avatar"/>

                                    <span class="font-medium">@{currUser.username}</span>
                                </a>

                                

                                {user && user.user._id != currUser._id &&

                                    (
                                        userDetails && userDetails.following.includes(currUser._id) ? 
                                            <div class="card-actions">
                                                <button class="btn btn-error text-white  btn-xs " onClick={()=>{
                                                dispatch(unfollowUser({followUser: currUser._id, userId: user.user._id}))
                                                }}>Unfollow</button>
                                            </div>    :
                                        
                                            <div class="card-actions">
                                                <button class="btn btn-primary text-white  btn-xs " onClick={()=>{
                                                    dispatch(followUser({followUser: currUser._id, userId: user.user._id}))
                                                }}>Follow</button>
                                            </div>
                                    )
                                }

                                
                            </div>

                            )

                        })}

                    

                        <hr class="my-6 border-gray-200 dark:border-gray-600" />


                        

                        
                    </nav>

                    
                </div>

            </div>
            

            <div>
                <article class="prose ">
                    <p for="" class="mt-3 mb-3 tracking-wider prose-lg ml-3"><b>Followers</b></p>
                
                </article>
            
            
                <div class="flex flex-col justify-between flex-1 mt-6">
                    
                    <nav>
                        {allFollowers && allFollowers.filter((user) =>
                        user.username.toLowerCase().includes(query)
                        ).map((user, index) => {

                            
                            return(
                            <a class="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md hover:ring " href={`profile/${user._id}`}>

                                <img class="object-cover mx-1 rounded-full h-6 w-6" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../img/default.png')} alt="avatar"/>

                                <span class="mx-2 font-medium">@{user.username}</span>
                            </a>
                            )

                        })}

                    

                        <hr class="my-6 border-gray-200 dark:border-gray-600" />


                        
                    </nav>

                
                </div>


                

            </div>

            <div>

                

                <article class="prose ">
                    <p for="" class="mt-3 mb-3 tracking-wider prose-lg ml-3"><b>People You May Know</b></p>
                    
                </article>
            
            
                <div class=" mt-6 ">
                    
                    <nav>
                        {allUsers && allUsers.filter((user) =>
                        user.username.toLowerCase().includes(query)
                        ).map((currUser, index) => {

                            
                            return(
                            <div class="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md hover:ring justify-between" >



                                <a href={`profile/${currUser._id}`}>
                                    <img class="object-cover mx-1 rounded-full h-6 w-6 ml-4" src={currUser && currUser.profileImage != undefined && currUser.profileImage.length>0 ? currUser.profileImage[0] : require('../img/default.png')} alt="avatar"/>

                                    <span class="font-medium">@{currUser.username}</span>
                                </a>

                                

                                {user && user.user._id != currUser._id &&

                                    (
                                        userDetails && userDetails.following.includes(currUser._id) ? 
                                            <div class="card-actions">
                                                <button class="btn btn-error text-white  btn-xs " onClick={()=>{
                                                dispatch(unfollowUser({followUser: currUser._id, userId: user.user._id}))
                                                }}>Unfollow</button>
                                            </div>    :
                                        
                                            <div class="card-actions">
                                                <button class="btn btn-primary text-white  btn-xs " onClick={()=>{
                                                    dispatch(followUser({followUser: currUser._id, userId: user.user._id}))
                                                }}>Follow</button>
                                            </div>
                                    )
                                }

                                
                            </div>

                            )

                        })}

                    

                        <hr class="my-6 border-gray-200 dark:border-gray-600" />


                        

                        
                    </nav>

                    
                </div>

            </div>
            

        </div>
    </div>


    </div>

    
    </>
  )
}

export default MessengerSideBar


