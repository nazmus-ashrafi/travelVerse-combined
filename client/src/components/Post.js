import React from 'react'
import Map from 'react-map-gl'

import {Marker} from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded'

import { useState, useEffect } from "react";



import { likePost } from "../features/post/postSlice";
import { getUser } from '../features/user/userSlice'
import { useSelector, useDispatch } from "react-redux";
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { getTimeLinePosts } from '../features/post/postSlice';
import NotificationBell from './NotificationBell'

import CommentMaker from './CommentMaker'
import Comment from "./Comment"
import SharedPost from './SharedPost'


const Post = ({ data, socket, hidden }) => {

  // useEffect(() => {
  //   console.log(data)
  // },[]);

  

  const [viewport, setViewport] = useState({
    zoom: 8
  });

  // Likes/Unlike
  // redux 
  const dispatch = useDispatch();

  const { user} = useSelector(
    (state) => state.auth
  )



  //

  // const thisPostIndex = timelinePosts.findIndex((post)=> post._id === data._id)
  // const thisPost = timelinePosts[thisPostIndex]


  const [liked, setLiked] = useState(data.likes.includes(user.user._id));
  const [likes, setLikes] = useState(data.likes.length)

  
  //
  

  const handleLike = () => {
    
    dispatch(likePost({ postId : data._id, userId : user.user._id }));
    setLiked((prev) => !prev);

    // console.log(data)
    // console.log(timelinePosts)
    // console.log(thisPostIndex)
    
    
    // console.log(data._id)
    // console.log(user.user._id)
  
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)

    // dispatch(getUser(user.user._id))

    //socket
    handleNotification(1)
    

  
  };


  const handleNotification = (type) => {
    //socket
  
    socket.emit("sendNotification", {
      senderId: user.user._id,
      receiverId: data.userId,
      data: data,
      type,
    });

    // console.log(user.user._id)
    // console.log(data.userId)
  };

  //

  const [viewState,setViewState]= useState({
    
    longitude: data.longitude,
    latitude: data.latitude,
    zoom: 6
                    
  })

  // shared post related
  const [isHidden, setIsHidden] = useState(hidden)

  //


  if ( !data.isSharedPost ) {
    return (

    
      <div class={`xl:grid xl:grid-cols-3 flex gap-6 w-full grid-rows-8 p-4 ${isHidden?"bg-base-300":"bg-base-100"} shadow-xl card pt-10 pr-10 pl-10 mt-5 items-start`}>

          {/* main post section */}
          <div class="col-span-1 row-span-3 text-center p-2 card rounded-none h-60">
            <Map
                  {...viewState}
                  onMove={evt => setViewState(evt.viewState)}
                  onRender={evt => setViewState(viewState)}

                  // style={{width: "w-full", height: 250}}
                  attributionControl="none"
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                    

                >
                  <Marker longitude={data.longitude} latitude={data.latitude} anchor="bottom" >
                    <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                  </Marker>
            </Map>
                
          </div>

          <div class="col-span-2 p-1 flex place-items-center h-10 ">
            
            {/* avatar */}
            <div class="avatar pr-5 ">
                <div class="md:w-10 w-8 mask mask-squircle">
                    <img src="https://api.lorem.space/image/face?hash=92048"/>
                </div>
            </div>
            
            {/* title */}
            {<h3 class="grow">{data.title || <Skeleton/>}</h3>}
            
            {isHidden ? null :  

              <>
                {/* triple dot dropdown */}
                <div class="dropdown dropdown-end dropdown-hover">
                
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
                    <li><a>Update</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>

              </>
            
            }
            

          </div>

          <div class="col-span-2 p-1 -mt-6 h-30">

            <h3>{data.description || <Skeleton count={2}/>}         
              </h3>

          </div>

          <div class="col-span-2 p-1 flex place-items-center justify-between h-10">

            <h3 class=""><b>{Date(data.date) || <Skeleton/>}</b> <br/>
                        by Biman 
              (Dhaka to Kathmandu)</h3>

            <h3>Airline logo</h3>

          </div>

          {/* photos section */}
          
          <div class="col-span-3 row-start-4 flex place-items-center h-70 space-x-4 pr-5 pl-5 ">
              
            {data.images && data.images[0]  ? 
            <>
              <div class="carousel carousel-center w-full  p-4 space-x-4 bg-base-200 rounded-box">

                {data.images ? data.images.map((image) => (

            
                  <div class="carousel-item">
                    <img src={image} class="rounded-box w-60 h-60" />
                  </div> 

                )) : null }
                
                
              </div>
            
            </>
            : null }  
            

          </div>

          {isHidden ? null :  
          
            <>


              {/* likes/comment/share section */}
              <div class="col-span-3 row-start-5 flex place-items-center mt-2 h-10 space-x-4 ">
                
                <button class="btn btn-info hover:bg-slate-600 flex-grow rounded-full normal-case font-normal btn-outline z-20" onClick={handleLike}>
                  
                  <span class='mr-8'>
                    {likes} {likes <= 1?"like":"likes"}
                  </span>
                  

                  {liked ? <ThumbUpAltRoundedIcon fontSize='small'/> : <ThumbUpAltOutlinedIcon fontSize='small'/> }
                  
                  <span class='ml-2' >Like</span>
                </button>


                <button class="btn btn-info hover:bg-slate-600 flex-grow rounded-full normal-case font-normal btn-outline "><ModeCommentRoundedIcon fontSize='small'/><span class='ml-2' >Comment</span></button>

                <button class="btn btn-info hover:bg-slate-600 flex-grow rounded-full normal-case font-normal btn-outline"><ReplyRoundedIcon/><span class='ml-2' >Share</span></button>

              </div>


          
              {/* comment section */}
              <div class="col-span-3 row-start-6 row-span-4">
                {/* {console.log(data.comments)} */}
                
                {/* comments */}
                {data.comments ? data.comments.map((comment) => (
                  <>
                  <Comment comment={comment}/> 
                  {/* comment is an id instead of an object*/}
                
                  </>

                )):null}
                
                <CommentMaker postId={data._id}/>

              </div>
              
            </>
          }
          
          
      </div>

    
      
    )
  } else {  // shared post

    return <SharedPost key={data._id} data={data}  socket={socket} hidden={true}/>

  }

  
  
}

export default Post