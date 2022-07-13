import React from 'react'
import Post from './Post';
import Spinner from './Spinner'

import { useSelector, useDispatch } from "react-redux";
import { getTimeLinePosts } from '../features/post/postSlice';

import { useEffect } from "react";

const AllPosts = () => {

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
        {isLoading
        ? <Spinner/>
        : timelinePosts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  )
}

export default AllPosts