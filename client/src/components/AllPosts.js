import React from 'react'
import Post from './Post';
import Spinner from './Spinner'
import { useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTimeLinePosts,createPost } from '../features/post/postSlice';

import { useEffect } from "react";
import { getUser } from '../features/user/userSlice';


const AllPosts = ({socket}) => {

  // redux 
  const dispatch = useDispatch();
  const { user } = useSelector(
        (state) => state.auth
    )

  let { timelinePosts, isLoading } = useSelector((state) => state.post);



  useEffect(()=>{



    //running the api call on first render/refresh 
    dispatch(getTimeLinePosts(user.user._id))
    dispatch(getUser(user.user._id))

    //running the api call every one minute

    // const interval = setInterval(() => {
    //  dispatch(getTimeLinePosts(user.user._id))
    // dispatch(getUser(user.user._id))
    // console.log("bye")
    // }, 10000);
    // return () => clearInterval(interval);
  
  },[])

  
  

  // const sortedTimelinePosts = arrayForSort.sort(function(a,b){

  //   // console.log(a.updatedAt)
  //   // console.log(b.updatedAt)

  //   return b.createdAt.localeCompare(a.createdAt);  
    

  // })

  //\
  
  


  return (
    <div>
        {timelinePosts ? timelinePosts.map((post, id) => {
            return <Post data={post} key={id} socket={socket} />;
          }):null}
    </div>
  )
}

export default AllPosts