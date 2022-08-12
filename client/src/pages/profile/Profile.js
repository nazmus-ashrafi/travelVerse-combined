import React from 'react'
import Map from 'react-map-gl';
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react";
import { UilPen } from "@iconscout/react-unicons";

//material icons
import HomeMaxOutlinedIcon from '@mui/icons-material/HomeMaxOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { useDimensions } from "../../dimentions/Dimentions"

import UnExpandedPostMaker from '../../components/UnExpandedPostMaker';
// import ExpandedPostMaker from './profilePageComponents/ExpandedPostMaker';
import Post from '../../components/Post';
import FriendsBlock from '../../components/FriendsBlock';
import ProfileModal from '../../components/ProfileModal';
import AllPosts from '../../components/AllPosts';


import AllTimelinePins from '../../components/AllTimelinePins';

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, reset, getTimeLinePosts } from '../../features/post/postSlice'

import { useParams } from "react-router-dom";
import axios from 'axios'



const ProfilePage = () => {
    
    const constraintsRef = useRef(null);
    const { width,height } = useDimensions(constraintsRef);

    const [showModal, setShowModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const [viewport, setViewport] = useState({
        zoom: 8
    });

    

    // redux

    const { user } = useSelector(
        (state) => state.auth
    )

    const { userDetails } = useSelector(
        (state) => state.user
    )

    const dispatch = useDispatch()
    let { timelinePosts, isLoading } = useSelector((state) => state.post);

    useEffect(()=>{
        // console.log(userDetails)
  
    },[userDetails])

    //

    const { id } = useParams() // getting user id from url

    const homeOnClick = () =>{
        // Map.remove()
    }


    const visualizeOnClick = () =>{
        
    }

    // Logic for seeing whose profile is being viewed
    const profileUserId = id; // from params
    const [profileUser, setProfileUser] = useState({});

    useEffect(() => {
        const fetchProfileUser = async () => {
        if (profileUserId === user.user._id) {
            setProfileUser(userDetails);
        } else {
            console.log("fetching")
            const profileUser = await axios.get(process.env.REACT_APP_POST_URL + profileUserId + "/getanyuser")

            setProfileUser(profileUser.data);
            
            console.log(profileUser)
        }
        };
        fetchProfileUser();
    }, [user,userDetails]);



    //
 


    const profileCardVariants = {
        open: {
        
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
        closed: {
            
            y: height,
            opacity: 1,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    }
    
    const [isOpen, setIsOpen] = useState(true)


    const slideButtonClick = () =>{
        const section2 = document.querySelector(".section-2");
        const friends = document.querySelector(".friends-block");

        setIsOpen(!isOpen)

        //
        section2.classList.toggle("translate-y-96")
        section2.classList.toggle("md:translate-y-96")
        section2.classList.toggle("xl:translate-y-0")

        //
        friends.classList.toggle("translate-y-0")
        friends.classList.toggle("md:translate-y-0")
        friends.classList.toggle("xl:translate-y-96")
        

    }

  

  return (

    
      
    <div class='window dark' data-theme={process.env.REACT_APP_THEME} > 
    {/* cupcake dark coffee */}
        {/* 1st section */}
        <div class={`grid place-items-center md:grid-cols-3 pt-10 mb-10 ${user.user.description?"":" mt-10"} `}  >


            {/* profile card */}
            <motion.div
            
            key="modal"
            
            // drag
            // dragConstraints={{ left: 0, right: 0,top: 0,bottom:0 }}
            // dragConstraints={constraintsRef}
            
            className='z-10 xl:col-start-3 xl:col-span-1 md:col-start-2 md:col-span-1'
            variants={profileCardVariants} animate={isOpen ? "open" : "closed"}
            
            >
                {/* follow card */}
                <motion.div class="card w-72 bg-base-100 shadow-xl grid place-items-center z-10">

                    {/* vertical slide button */}
                    <button className='slideBtn rounded-md  btn-secondary outline-transparent btn-sm mt-5 ml-5 absolute top-0 left-0' onClick={slideButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12.91" height="17.879" viewBox="0 0 12.91 17.879">
                        <path id="XMLID_225_" d="M12.739,75.172a.587.587,0,0,0-.83,0L6.456,80.625,1,75.172a.587.587,0,0,0-.83.83L6.041,81.87a.587.587,0,0,0,.83,0L12.739,76A.587.587,0,0,0,12.739,75.172Z" transform="translate(-0.001 -64.163)" fill="#fff"/>
                        <path id="XMLID_225_2" data-name="XMLID_225_" d="M12.738.172a.587.587,0,0,0-.83,0L6.455,5.625,1,.172A.587.587,0,0,0,.172,1L6.04,6.87a.587.587,0,0,0,.83,0L12.738,1A.587.587,0,0,0,12.738.172Z" transform="translate(12.91 7.042) rotate(-180)" fill="#fff"/>
                        </svg>
                    </button>

                    {/* side buttons */}
                    <div className='sideButtons'>

                        <label for="home" class="mt-6 mr-6 absolute top-0 right-0 modal-button cursor-pointer">
                            <Link to={'/home'}>
                                <HomeMaxOutlinedIcon onClick={homeOnClick}/>
                                {/* map.remove */}
                            </Link>
                            
                        </label>



                        {user.user._id === profileUserId ? ( // show if own profile
                        <>
                            <label for="visualize-compare" class="mt-16 mr-6 absolute top-0 right-0 modal-button cursor-pointer">
                                <Link to={'/visualize'}>
                                    <RadioButtonCheckedIcon onClick={visualizeOnClick}/>
                                </Link>
                                
                            </label>
                            <label for="" class="mt-28 mr-5 absolute top-0 right-0 modal-button cursor-pointer">
                                <UilPen
                                width="2rem"
                                height="1.2rem" 
                                onClick={()=>setShowProfileModal(true)}               
                                />
                            </label>
                        </>
                        
                        ) : (null)}

                        


                    </div>


                    <ProfileModal showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} data={userDetails} />

                    {/* avatar */}
                    <div class="avatar pt-10">
                        <div class="w-24 mask mask-squircle">
                            <img src={profileUser.profileImage ? profileUser.profileImage[0] : require('../../img/default.png')}/>
                            {/* <img src={require('../../img/default.png')}/> */}
                        </div>
                    </div>

                
                    {/* name, description and follow button */}
                    <div class="card-body items-center text-center">
                        <h2 class="text-lg font-extrabold">{profileUser.firstname+" "+ profileUser.lastname}</h2>

                        <div class="text-base-content my-3 text-sm text-opacity-60">{profileUser.description?profileUser.description:""}</div>
                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. */}
                    
                        {user.user._id != profileUser._id &&
                        <div class="card-actions">
                            <button class="btn btn-primary text-white  btn-sm ">Follow</button>
                        </div>
                        }
                        


                    </div>
                
                </motion.div>
                


            </motion.div>

            
            {/* map */}
            <div class=" absolute card w-100 bg-base-100 shadow-xl grid place-items-center" ref={constraintsRef}>
                <Map
                    initialViewState={{
                        longitude: 103.8342,
                        latitude: 36.0614,
                        zoom: 2
                    }}
                    style={{width: "90vw", height: 400}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                >

                    <AllTimelinePins posts={timelinePosts} userId={id}/>

                </Map>
                
            </div>
            
        </div>

        {/* <div class="flex">
            <div class="flex-none bg-slate-400">
                01
            </div>
            <div class="flex-auto w-96 bg-slate-300">
                02
            </div>
            <div class="flex-auto w-96 bg-slate-200">
                03
            </div>
        </div> */}
        
        {/* 2nd section */}
        <div class="section-2 grid xl:grid-cols-4 grid-cols-1 pt-10 xl:pl-28 xl:pr-28 xl:relative transition duration-200 ease-in-out pl-7 pr-7 mt-3 xl:place-items-stretch place-items-center">

            {/* friends block */}
            <FriendsBlock/>

            {/* tab */}
            <div class=" tabs pb-5 xl:col-start-2 xl:col-span-3 ">
                
                <a class="tab tab-bordered tab-active">Timeline</a> 
                <a class="tab tab-bordered">Shares</a> 
                <a class="tab tab-bordered">Posts</a>

                
            </div>

            {/* 'unexpanded post' card */}
            <div class="xl:col-start-1 xl:col-span-3 w-full">
                <UnExpandedPostMaker showModal={showModal} setShowModal={setShowModal}/>
                <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

                {/* posts */}
                {/* no need to pass socket because we dont care about live notifications in this page */}
                <AllPosts userId={id}/>
            </div>
             


        </div>

            
        {/* 'expanded post' card */}
        {/* <div class="grid place-items-center">
            <ExpandedPostMaker showModal={showModal} setShowModal={setShowModal}/>

        </div> */}

        
        
    </div>
  )
}

export default ProfilePage