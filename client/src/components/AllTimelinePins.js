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

const AllTimelinePins = ({posts}) => {
  // redux 
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {


  }, []);

  // console.log(timelinePosts)




  return (
    <div>
      
      {
        
        posts ? posts.map((post, id) => {


          if(post.isSharedPost === true){
            
            return <MarkerPin data={post} key={id} color={"mediumseagreen"} size={9} />; // shared post
            
          }

      

          if(post.userId !== user.user._id){

            return <MarkerPin data={post} key={id} color={"cornflowerblue"} size={8} />; // friend's post
            
            
          }else{

            return <MarkerPin data={post} key={id} color={"grey"} size={8} />; // your post

          }

          


        }):null
      
      }
      
    </div>
  )
}

export default AllTimelinePins