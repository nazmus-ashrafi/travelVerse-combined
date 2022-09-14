import React from 'react'

import { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";

import axios from 'axios'

const OnlineTravellers = ({onlineUsers, currentId, setCurrentChat, socket, conversations, setConversations }) => {

  // console.log(onlineUsersDetails)

  const { user } = useSelector(
      (state) => state.auth
    )

  const { userDetails } = useSelector(
    (state) => state.user
  )

    const [details, setDetails] = useState([])

    // useEffect(() => {
    //   setDetails([])
    // }, [onlineUsers])

  useEffect(() => {
    
    
  }, [onlineUsers,socket]);
  
  
  // console.log(onlineUsers)


  const onTravellerClick = async (onlineTraveller) => {
    // console.log(onlineTraveller.user.username)

    try {
      const res = await axios.get("/conversation/find/" + user.user._id + "/" + onlineTraveller.user._id);

      // console.log(res.data)
      // console.log(conversations.filter(conversation => conversation._id === res.data._id).length>0)


      if(res.data && conversations.filter(conversation => conversation._id === res.data._id).length > 0){
        // console.log(conversations.filter(conversation => conversation._id === res.data._id))
        setCurrentChat(conversations.filter(conversation => conversation._id === res.data._id)[0])
      }else{
        // create conversation ,set current chat

        // console.log(onlineTraveller.user._id)
        const newConversation = {
          senderId: user.user._id,
          receiverId: onlineTraveller.user._id,
          createdAt: new Date(),
        }

        try {
          const res = await axios.post("/conversation/", newConversation);
          setConversations([...conversations, res.data])
          setCurrentChat(res.data)

          // send conversation to other user
          socket && socket.current.emit("sendConversation", {
            senderUserId: user.user._id,
            receiverUserId: onlineTraveller.user._id,
            conversation: res.data,
          });

        } catch (error) {
          console.log(error)
        }
      

      }
      
    } catch (error) {
      console.log(error)
      
    }


  }

  

  return (
    <>
    {onlineUsers.map((onlineTraveller) => (
      <tr>                   
        <td>
          <div className="flex items-center space-x-3 cursor-pointer" onClick={()=>onTravellerClick(onlineTraveller)}> 
            <div className="avatar online">
              <div className="mask mask-squircle w-12 h-12">
                <img class="object-cover rounded-full h-6 w-6" src={onlineTraveller.user && onlineTraveller.user.profileImage != undefined && onlineTraveller.user.profileImage.length>0 ? onlineTraveller.user.profileImage[0] : require('../img/default.png')} alt="avatar"/>
              </div>
            </div>
            <div>
              <div className="font-bold">{onlineTraveller.user.username}</div>
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