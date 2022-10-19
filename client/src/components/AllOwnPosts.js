import React from 'react'
import Post from './Post';
import Spinner from './Spinner'
import { useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getOwnPosts } from '../features/post/postSlice';

import { useEffect } from "react";
import { getUser } from '../features/user/userSlice';


const AllOwnPosts = ({socket,userId}) => {

    // redux 
    const dispatch = useDispatch();
    const { user } = useSelector(
      (state) => state.auth
    )

    const { ownPosts } = useSelector(
      (state) => state.post
    )



    useEffect(()=>{


    

      dispatch(getOwnPosts(userId)) 
      


    
    },[ownPosts])


  return (
    <div>
        {ownPosts ? ownPosts.map((post, id) => {
            return <Post key={id} data={post}  socket={socket} hidden={false} />;
          }):null}
    </div>
  )
}

export default AllOwnPosts