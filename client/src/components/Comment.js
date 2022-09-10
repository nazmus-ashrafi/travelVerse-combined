import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment,getAnyUser } from '../features/post/postSlice';

import axios from 'axios'
import { Skeleton } from '@mui/material';


const Comment = ({comment}) => {

  // redux 
  const dispatch = useDispatch();
  const { user } = useSelector(
        (state) => state.auth
    )

  const { users } = useSelector(
        (state) => state.post
    )
  //


  // console.log(comment)

  const handleDeleteComment = () => {
    // console.log('delete comment')
    console.log(comment._id,user.user._id,comment.postId)

    dispatch(deleteComment({commentId:comment._id, commenterId:user.user._id, postId:comment.postId}))
  }

  // get commenter details
  const [commenterUser, setCommenterUser] = useState(null);

  const getCommenterUserDetails = async () => {
    const response = await axios.get(process.env.REACT_APP_POST_URL + comment.user + "/getanyuser")
    
    setCommenterUser(response.data)
    
  }

  useEffect(() => {
    getCommenterUserDetails()
  }, []);

  //

  return (
    
    <>
    {/* comments */}
          <div class="pb-5 flex justify-start items-center">
            
            {/* avatar */}
            <div class="avatar pr-5 ">
                <div class="md:w-10 w-8 mask mask-squircle">
                    {/* <img src="https://api.lorem.space/image/face?hash=92048"/> */}

                    <img src={commenterUser && commenterUser.profileImage != undefined && commenterUser.profileImage.length>0 ? commenterUser.profileImage[0] : require('../img/default.png')}/>
                </div>
            </div>
              
            {/* comment */}
            <h3 class="w-full text-lg p-2 rounded-xl resize-none border-solid border-2 border-base-200 bg-base-200 h-full"
            >

              {/* {comment.desc} by {commenterUser ? commenterUser.username : <Skeleton/>} */}
              {comment.desc}
            </h3>


            {/* triple dot dropdown */}
            {comment.user === user.user._id &&
              <div class="dropdown dropdown-end dropdown-hover ml-2">
            
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
                  <li onClick={handleDeleteComment}><a><DeleteRoundedIcon color='warning'/>Delete </a></li>
                  
                </ul>
              </div>

            
            }
          
              
          </div>
    </>
  )
}

export default Comment