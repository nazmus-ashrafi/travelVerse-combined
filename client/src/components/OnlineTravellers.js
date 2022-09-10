import React from 'react'

import { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";

import axios from 'axios'

const OnlineTravellers = ({onlineUsers, currentId, setCurrentChat, socket }) => {

  // console.log(onlineUsersDetails)

  const { userDetails } = useSelector(
    (state) => state.user
  )

    const [details, setDetails] = useState([])

    // useEffect(() => {
    //   setDetails([])
    // }, [onlineUsers])

  useEffect(() => {
    
      

      

      
    
  }, [onlineUsers,socket]);
  
  
    console.log(onlineUsers)

  

  

  

  return (
    <>
    {onlineUsers.map((onlineFriend) => (
      <tr>
                            
        <td>
        <div className="flex items-center space-x-3">
          <div className="avatar online">
            <div className="mask mask-squircle w-12 h-12">
                

                <img class="object-cover rounded-full h-6 w-6" src={onlineFriend.user && onlineFriend.user.profileImage != undefined && onlineFriend.user.profileImage.length>0 ? onlineFriend.user.profileImage[0] : require('../img/default.png')} alt="avatar"/>
            </div>
          </div>
            <div>
            <div className="font-bold">{onlineFriend.user.username}</div>
            {/* <div className="text-sm opacity-50">United States</div> */}
          </div>
        </div>
        </td>
        
      </tr>

    ))}
    
    </>
  )
}

export default OnlineTravellers