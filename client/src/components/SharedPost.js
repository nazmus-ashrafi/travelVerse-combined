import React from 'react'
import Map from 'react-map-gl'

import {Marker} from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded'

import { useState, useEffect } from "react";

import axios from 'axios'



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
import Post from './Post';
import ExpandedSharedPostMaker from './ExpandedSharedPostMaker'

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UpdateSharedPostMaker from './UpdateSharedPostMaker'
import DeletePost from './DeletePost'


const SharedPost = ({ data, socket, hidden }) => {

    // useEffect(() => {
  //   console.log(data)
  // },[]);

    // share functionality-----------------------------------------------------
  const [shareModalOpened, setShareModalOpened] = useState(false)

  const onShareClick = () => {
    setShareModalOpened(true)

    // console.log(sharedPost)
  }


  //-------------------------------------------------------------------------


  // get shared post details
  const [sharedPost, setSharedPost] = useState({});

  const getSharedPostDetails = async () => {
    const response = await axios.get(process.env.REACT_APP_POST_URL + data.sharedPostId + "/getanypost")

  
    setSharedPost(response.data)

    // console.log(response.data)
    
  }

  useEffect(() => {
    getSharedPostDetails()
  }, []);

  //

  

  const [viewport, setViewport] = useState({
    zoom: 8
  });

  // Likes/Unlike
  // redux 
  const dispatch = useDispatch();

  const { user} = useSelector(
    (state) => state.auth
  )

  const { timelinePosts} = useSelector(
    (state) => state.post
  )

  //

  // Logic for getting the user who made this post and others
    const postMakerUserId = data.userId; // from params
    const [postMakerUser, setPostMakerUser] = useState({});

    useEffect(() => {
      const fetchPostMakerUser = async () => {
      const profileUser = await axios.get(process.env.REACT_APP_POST_URL + postMakerUserId + "/getanyuser")

      setPostMakerUser(profileUser.data);
      }

      fetchPostMakerUser();

      
    }, [user,timelinePosts]);


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
  
    socket.current.emit("sendNotification", {
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
    zoom: 11 // 6
                    
  })

  // shared post related
  const [isHidden, setIsHidden] = useState(hidden)
  // console.log(isHidden)

  //

  const [hover, setHover] = useState(false)


  // logic for update post
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const onUpdateClick = () => {
    setShowUpdateModal(true)
  }
  //

  // logic for delete post
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const onDeleteClick = () => {
    setShowDeleteModal(true)
  }
  //



  return (

    
    <div class=" w-full bg-base-100 shadow-xl card pr-10 pl-10 mt-10">

      {/* Shared post desc */}
      <div class="flex flex-col w-full border-opacity-50">

        <div class="grid h-full card bg-base-100 rounded-box place-items-center">
          <div class={`xl:grid xl:grid-cols-10 gap-0 w-full p-0 bg-base-100 shadow-xl card  pr-10 pl-10 mt-5 items-start ${hover && data.description.length<350?"h-28":""}`}>

            {/* avatar */}
            <div class="avatar pr-1 ">
                <div class="md:w-10 w-8 mask mask-squircle">
                    <img src={postMakerUser && postMakerUser.profileImage != undefined && postMakerUser.profileImage.length>0 ? postMakerUser.profileImage[0] : require('../img/default.png')}/>
                </div>
            </div>
    
            {/* title */}
            {<h3 class="grow w-full col-span-8">{data.description || <Skeleton/>}</h3>}

            
            {/* triple dot dropdown */}
            {postMakerUserId === user.user._id ?
            <div class="dropdown dropdown-left dropdown-hover col-span-1" 
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
            
              <button class="btn btn-ghost btn-circle">

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
                    <EditRoundedIcon color='primary'/>
                    <a onClick={onUpdateClick} class='flex-grow'>Edit</a>
                  </div>
                  
                </li>
                <li class="flex">
                    <div class="">
                      <DeleteRoundedIcon color='warning'/>
                      <a onClick={onDeleteClick} class='flex-grow'>Delete</a>
                    </div>
                    
                </li>
              </ul>
            </div>
            :null}

            
          {sharedPost.likes?
          <UpdateSharedPostMaker
              showModal={showUpdateModal}
              setShowModal={setShowUpdateModal}
              data={data}
              sharedPost={sharedPost}
            />:null
          }
            

            <DeletePost
              showModal={showDeleteModal}
              setShowModal={setShowDeleteModal}
              data={data}
            />
            
          

      
          </div>
          

          

        </div>

        {/* divider */}
        <div class="divider mt-10"></div> 

        {/* shared post */}
        <div class="grid h-full card bg-base-100 rounded-box place-items-center">

          {sharedPost.likes?<Post key={sharedPost._id} data={sharedPost} socket={socket} hidden={true} />:null}

          
        </div>

        {/* divider */}
        <div class="divider mb-10 mt-10"></div> 

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

          
          <button class="btn btn-info hover:bg-slate-600 flex-grow rounded-full normal-case font-normal btn-outline" onClick={onShareClick}><ReplyRoundedIcon/><span class='ml-2' >Share</span></button>

          

        </div>


          
        {/* comment section */}
        <div class="col-span-3 row-start-6 row-span-4 mt-6 mb-8">
          {/* {console.log(data.comments)} */}
          
          {/* comments */}
          {data.comments ? data.comments.map((comment) => (
            <>
              <Comment comment={comment}/> 
              {/* comment is an id instead of an object*/}
          
            </>

          )):null}
          
          <CommentMaker postId={data._id} handleNotification={handleNotification}/>

        </div>

        {sharedPost.likes?
          <ExpandedSharedPostMaker
          showModal={shareModalOpened}
          setShowModal={setShareModalOpened}
          sharedPost = {sharedPost}

          key={sharedPost._id} 
          socket={socket} 

          handleNotification={handleNotification}

          originalPosterId={data.userId}
          />
        : null }
        


        

      </div>


        
    </div>
  )
}

export default SharedPost