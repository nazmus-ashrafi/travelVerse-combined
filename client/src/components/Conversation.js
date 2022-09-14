import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Conversation = ({conversation,currentUser, setConversations, conversations, setCurrentChat, socket , unOpened}) => {

    const [user, setUser] = useState(null);
    

    useEffect(() => {

        
        
    }, []);


    

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

    const onDeleteClick = async () => {
        try {
            const res = await axios.delete("/conversation/" + conversation._id);
            setConversations(conversations.filter((c) => c._id !== conversation._id));
            setCurrentChat(null)

            // delete all messages related to this conversation
            
        } catch (error) {
            console.log(error)
            
        }
    }

    

    


  return (
    <>
        {/* <!-- row 1 --> */}
        
        {/* <th>
            <label>
                <input type="checkbox" className="checkbox" />
            </label>
        </th> */}
        <td>
            <div className="flex items-center space-x-3 justify-between">
                
                <div className="flex items-center space-x-3">

                    {/* <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            
                            
                            <img class="object-cover rounded-full h-6 w-6" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../img/default.png')}/>
                        </div>
                    </div> */}
                    {unOpened?(<div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            
                            
                            <img class="object-cover rounded-full h-6 w-6" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../img/default.png')}/>
                        </div>
                    </div>):(<div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            
                            
                            <img class="object-cover rounded-full h-6 w-6" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../img/default.png')}/>
                        </div>
                    </div>)}
                    

                    <div>
                        <div className="font-bold">@{user?.username}</div>
                        <div className="text-sm opacity-50">{user?.firstname} {user?.lastname}</div>
                    </div>

                    
                    
                </div>    

                <div className="flex items-center space-x-2">

                    <div class="dropdown dropdown-end dropdown-hover ">


                    
            
                        <button class="btn btn-ghost btn-circle ">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5" viewBox="0 0 23 5">
                            <g id="Group_1" data-name="Group 1" transform="translate(-1547 -727)">
                                <circle id="Ellipse_21" data-name="Ellipse 21" cx="2.5" cy="2.5" r="2.5" transform="translate(1547 727)" fill="#a7adb9"/>
                                <circle id="Ellipse_22" data-name="Ellipse 22" cx="2.5" cy="2.5" r="2.5" transform="translate(1556 727)" fill="#a7adb9"/>
                                <circle id="Ellipse_23" data-name="Ellipse 23" cx="2.5" cy="2.5" r="2.5" transform="translate(1565 727)" fill="#a7adb9"/>
                            </g>
                            </svg>

                        </button>

                
                
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">

                
                            <li class="flex">
                                <div class="">
                                <DeleteRoundedIcon color='warning'/>
                                <a onClick={onDeleteClick} class='flex-grow'>Delete</a>
                                </div>
                                
                            </li>
                    
                
                        </ul>

                    

                    
                
                    </div>

                    {unOpened?<div class="">
                            <span class="inline-flex rounded-full h-3 w-3 bg-sky-500 "/>
                    </div>:null}
                    
                </div>        
            
                
            </div>
        </td>
            
       
    </>
  )
}

export default Conversation