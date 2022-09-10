import React from 'react'
import "./message.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

export default function Message({ message, own }) {

  const [user, setUser] = useState(null);
    useEffect(() => {
        const senderId = message.sender

        const getUser = async () => {
        try {
            const res = await axios("/post/" + senderId + "/getanyuser");
            setUser(res.data);
            
        } catch (err) {
            console.log(err);
        }
        };
        getUser();
    }, [message,own]);

  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        
        <img
          className="messageImg"
          src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../../img/default.png')}
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}