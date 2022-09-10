import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";

const Conversation = ({conversation,currentUser}) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== currentUser._id);

        const getUser = async () => {
        try {
            const res = await axios("/post/" + friendId + "/getanyuser");
            setUser(res.data);
            
        } catch (err) {
            console.log(err);
        }
        };
        getUser();
    }, [currentUser, conversation]);

  return (
    <>
        {/* <!-- row 1 --> */}
        
            <th>
            <label>
                <input type="checkbox" className="checkbox" />
            </label>
            </th>
            <td>
            <div className="flex items-center space-x-3">
                <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    
                    <img class="object-cover rounded-full h-6 w-6" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../img/default.png')}/>
                </div>
                </div>
                <div>
                <div className="font-bold">@{user?.username}</div>
                <div className="text-sm opacity-50">{user?.firstname} {user?.lastname}</div>
                </div>
            </div>
            </td>
            
       
    </>
  )
}

export default Conversation