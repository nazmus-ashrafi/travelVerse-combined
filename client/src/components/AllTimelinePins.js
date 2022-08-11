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

const AllTimelinePins = ({posts, userId}) => {
  // redux 
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {


  }, []);

  // console.log(timelinePosts)


  const following = user.user.following.map((follow) => {
                if(follow === userId){ // if user is following this user

                  // console.log(posts)
                  
                  return true;

                  // setFollowing(true)


                }else{
                  return false;
                }

              })



  return (
    <div>
      
      
      {

        userId === user.user._id ? // id from params === id from auth 
        // this is the case if user is visiting his own profile
          <>
            {posts ? posts.map((post, id) => {


              if(post.isSharedPost === true){
                
                return <MarkerPin data={post} key={id} color={"salmon"} size={9} />; // shared post
                
              }

      

              if(post.userId !== user.user._id){ 

                return <MarkerPin data={post} key={id} color={"cornflowerblue"} size={8} />; // friend's post
              
              
              }else{

                return <MarkerPin data={post} key={id} color={"grey"} size={8} />; // your post

              }

 
            }):null}
          </> 
        
        :  // this is the case if user is visiting someone else's profile

          <>
            
            {
              posts && following  ? // is the user following this user?
                posts.map((post, id) => {

                  console.log(post)
                  return <MarkerPin data={post} key={id} color={"cornflowerblue"} size={8} />;
                  
                })
              : 
              null // if not, don't show any posts
            }
            
          
          </>

          // console.log("visiting someone else's profile")


          // null
          
          
          // show followers pins

          // Follow to show pins, timeline posts and also compare
        

        
      
      }
      
    </div>
  )
}

export default AllTimelinePins