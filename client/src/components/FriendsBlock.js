import React from 'react'
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import axios from 'axios'

const FriendsBlock = () => {

        // redux
    const { userDetails } = useSelector(
        (state) => state.user
    )

    const [allFollows, setAllFollows] = useState([])

    // let allFollows=[]

    // get each follow detail
    useEffect(() => {
        const fetchFollowingsDetails = async () => {
        
            console.log("fetching")

            // console.log(userDetails.following)

            userDetails && userDetails.following.forEach(async (follow) => {
              const follows = await axios.get(process.env.REACT_APP_POST_URL + follow + "/getanyuser")

              console.log(follows.data)

                setAllFollows(current => [...current, follows.data])
            })

            // console.log(allFollows)
       
            
        }

        fetchFollowingsDetails();
        // console.log(allFollows)
        
    }, [userDetails]);


  return (
    <>
    {/* friends */}
            <div class="friends-block xl:ml-12 xl:mt-8 mb-8 xl:mb-80 xl:col-start-4 xl:col-span-1 card xl:w-96 w-72 bg-base-100 shadow-xl grid grid-cols-3 gap-4 p-5 xl:absolute justify-center" >

                <h2 class="col-start-1 col-span-3"><b>Your Follows</b></h2>

                <hr class="w-full xl:col-start-1 xl:col-span-3 opacity-10"></hr>

                {allFollows && allFollows.map((user, index) => {
                    return(
                        <div class='grid grid-row-2 gap-4'>
                            <div class="avatar row-start-1 row-span-1 justify-self-center">
                                <a href={`${user._id}`}>
                                    <div class="w-20 mask mask-squircle">
                                        <img class="" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../img/default.png')} alt="avatar"/>
                                    </div>

                                </a>
                               
                                
                            </div>
                            <span class="mx-2 font-medium row-start-2 row-span-1 justify-self-center">@{user.username}</span>
                        </div>
                        
                    )
                })}

                {/* <div class="avatar">
                    <div class="w-20 mask mask-squircle">
                        <img src="https://api.lorem.space/image/face?hash=92048"/>
                    </div>
                </div> */}
                

            </div>
    </>
  )
}

export default FriendsBlock