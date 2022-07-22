import React from 'react'
import Post from './Post';
import Spinner from './Spinner'
import { useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTimeLinePosts } from '../features/post/postSlice';

import { useEffect } from "react";

import MarkerPin from './MarkerPin';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllTimelinePins = () => {
  // redux 
  const dispatch = useDispatch();
  const { user } = useSelector(
        (state) => state.auth
    )

  let { timelinePosts, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getTimeLinePosts(user.user._id));

    
    
  }, []);

  // console.log(timelinePosts)




  return (
    <div>
      
        {
          
        timelinePosts ? timelinePosts.map((post, id) => {
            if(post.userId === user.user._id ){
              return <MarkerPin data={post} key={id} color={"slategrey"} />;
            }else{
              return <MarkerPin data={post} key={id} color={"0EA5E9"} />;
            }
          }):null}
    </div>
  )
}

export default AllTimelinePins