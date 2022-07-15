import React from 'react'
import Post from './Post';
import Spinner from './Spinner'
import { useRef, useState } from "react";

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


  // sort and iterate thru timeline posts
  const [arrayForSort,setArrayForSort] = useState([])

  useEffect(()=>{


    if(timelinePosts){
      setArrayForSort([...timelinePosts])
    }else{
      setArrayForSort([])

    }

  
  },[timelinePosts])

  

  const sortedTimelinePosts = arrayForSort.sort(function(a,b){

    // console.log(a.updatedAt)
    // console.log(b.updatedAt)

    return b.updatedAt.localeCompare(a.updatedAt);  
    

  })

  //


  return (
    <div>
        {isLoading
        ? <Spinner/>
        : sortedTimelinePosts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  )
}

export default AllPosts