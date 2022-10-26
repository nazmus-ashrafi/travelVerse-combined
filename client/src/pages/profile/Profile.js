import React from 'react'
import Map from 'react-map-gl';
import StaticMap from 'react-map-gl'


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
import AllOwnPosts from '../../components/AllOwnPosts';
import SetShopLocation from '../../components/Shop/SetShopLocation';

import AllTimelinePins from '../../components/AllTimelinePins';

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, reset, getTimeLinePosts } from '../../features/post/postSlice'
import { followUser, unfollowUser } from '../../features/user/userSlice'

import { useParams } from "react-router-dom";
import axios from 'axios'

import {themeChange} from "theme-change";
import ShopProfileElements from '../../components/Shop/ShopProfileElements';

import { getUser } from '../../features/user/userSlice'

import {Marker} from 'react-map-gl'

import StoreIcon from '@mui/icons-material/Store';
import AddProduct from '../../components/Shop/AddProduct';




const ProfilePage = () => {
    
    const constraintsRef = useRef(null);
    const { width,height } = useDimensions(constraintsRef);

    const [showModal, setShowModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const [shopLocationModalOpened, setShopLocationModalOpened] = useState(false)
    const [addProductModalOpened, setAddProductModalOpened] = useState(false)

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
    let { timelinePosts, isLoading, ownPosts  } = useSelector((state) => state.post);

    useEffect(()=>{

        if(user){
            dispatch(getUser(user)) // this populated the user state when the app first loads
        }
       
  
    },[])


    // mapbox component saves the previously initialized map to the DOM (bug)
    // reload page once on load 
    // const reloadCount = sessionStorage.getItem('reloadCount');
    // useEffect(() => {
    //     if(reloadCount < 2) {
    //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //     window.location.reload();
    //     } else {
    //     sessionStorage.removeItem('reloadCount');
    //     }
    // }, []);
    //



    //

    const { id } = useParams() // getting user id from url

    const homeOnClick = () =>{
        // Map.remove()
        
    }

    // Follow user logic

    const onFollowClick = () => {
        dispatch(followUser({followUser: profileUserId, userId: user.user._id}))
        // user.user._id != profileUser._id
    }

    //

    // Unfollow user logic
    const onUnfollowClick = () => {
        dispatch(unfollowUser({followUser: profileUserId, userId: user.user._id}))

    }

    //

    
    function refreshPage() {

        setTimeout(()=>{

            window.location.reload(false);

        }, 500);
        console.log('page to reload')

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
            // console.log('user details', userDetails)
        } else {
            console.log("fetching")
            const profileUser = await axios.get(process.env.REACT_APP_POST_URL + profileUserId + "/getanyuser")

            setProfileUser(profileUser.data);
            
            // console.log(profileUser)
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



    useEffect(()=> {
    themeChange(false)
  });


  // Using geo location to set initial location to the current location of the user

    const [initialViewState,setInitialViewState] = useState({
        
        longitude: 103.38149930538287,
        latitude: 23.77783437646191,
        zoom: 2 //4
                        
    })

    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true
        })

        function successLocation(position) {
            if(profileUser && profileUser.longitude && profileUser.latitude){
                setInitialViewState({longitude:profileUser.longitude, latitude:profileUser.latitude})
            } else{
                

                setInitialViewState({longitude:position.coords.longitude, latitude:position.coords.latitude})
            }
            
        }

        function errorLocation() {
            setInitialViewState({longitude:-2.24, latitude:53.48})
            
        }
        
    }, []);
 

    //

    

  

  return (

    
      
    // <div class='window dark' data-theme={process.env.REACT_APP_THEME} > 
    <div class='window dark' > 
    {/* cupcake dark coffee */}



        {/* 1st section */}
        <div class={`grid place-items-center md:grid-cols-3 pt-10 mb-10 mt-10 ${user.user.description?"":" mt-15"} `}  >


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
                            {/* <Link to={'/home'} onClick={refreshPage} > */}
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

                    
                    {profileUser && user.user._id === profileUser._id && // show if own profile
                        <ProfileModal showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} data={userDetails} /> 
                    }

                    {/* avatar */}
                    <div class="avatar pt-10">
                        <div class="w-24 mask mask-squircle">
                            <img src={profileUser && profileUser.profileImage != undefined && profileUser.profileImage.length>0 ? profileUser.profileImage[0] : require('../../img/default.png')}/>
                            {/* <img src={require('../../img/default.png')}/> */}
                        </div>
                        {/* {console.log(profileUser.profileImage != undefined)} */}
                    </div>

                
                    {/* name, description and follow button */}
                    <div class="card-body items-center text-center">
                        <h2 class="text-lg font-extrabold">{profileUser && profileUser.firstname+" "+ profileUser.lastname}</h2>

                        <div class="text-base-content my-3 text-sm text-opacity-60">{profileUser && profileUser.description?profileUser.description:""}</div>
                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. */}
                    
                        {profileUser && user.user._id != profileUser._id &&

                            (
                                userDetails && userDetails.following.includes(profileUser._id) ? 
                                    <div class="card-actions">
                                       <button class="btn btn-error text-white  btn-sm " onClick={onUnfollowClick}>Unfollow</button>
                                    </div>    :
                                
                                    <div class="card-actions">
                                        <button class="btn btn-primary text-white  btn-sm " onClick={onFollowClick}>Follow</button>
                                    </div>
                            )
                        }
                        


                    </div>
                
                </motion.div>
                


            </motion.div>

            
            {/* map */}
            <div class=" absolute card w-100 bg-base-100 shadow-xl grid place-items-center" ref={constraintsRef}>
                <Map
                    // initialViewState={{
                    //     longitude: 103.8342,
                    //     latitude: 36.0614,
                    //     zoom: 2
                    // }}

                    {...initialViewState}
                    onMove={evt => setInitialViewState(evt.initialViewState)}
                    onRender={evt => setInitialViewState(initialViewState)}

                    style={{width: "90vw", height: 400}}
                    mapStyle = {process.env.REACT_APP_MAPBOX_STYLE}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                >

                    

                    {
                        
                    profileUser && profileUser.isShop ? // if the profile is a shop's profile
                    
                    profileUser.longitude && profileUser.latitude && // if the shop has a location set
                        <Marker longitude={profileUser.longitude} latitude={profileUser.latitude} anchor="bottom">
                            <StoreIcon style={{color:"Peru",fontSize:viewport.zoom * 5}}/>
                        </Marker>

                    : // else if the profile is a user's profile

                        <AllTimelinePins posts={ownPosts} userId={id}/>

                    }


                    
                    

                </Map>

                

                {/* <StaticMap
                    width={400}
                    height={400}
                    longitude= {103.38149930538287}
                    latitude= {23.77783437646191}
                    zoom= {4 }
                    style={{width: "90vw", height: 400}}
                    mapStyle = {process.env.REACT_APP_MAPBOX_STYLE}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                >
                    <AllTimelinePins posts={timelinePosts} userId={id}/>
                </StaticMap> */}
                
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
            { user.user._id === profileUserId && !user.user.isShop ? ( // show if own profile and user is not a shop
                <FriendsBlock/>
            ) : null }
            

            {/* tab */}
            {/* <div class=" tabs pb-5 xl:col-start-2 xl:col-span-3 ">
                
                <a class="tab tab-bordered tab-active">Timeline</a> 
                <a class="tab tab-bordered">Shares</a> 
                <a class="tab tab-bordered">Posts</a>

                
            </div> */}

            {profileUser && // profileUser is not null
            user.user.isShop && profileUser.isShop || user.user._id != profileUserId && profileUser.isShop  ?
                // if 
                // logged in user is shop and profile user is shop
                // or 
                // not own profile and profile user is shop
                <>

                <div class="xl:col-start-1 xl:col-span-3 w-full">

                    {/* buttons */}
                    {user.user.isShop & user.user._id === profileUserId ? 
                        // show if user is a shop and the profile is the user's own profile
                        <>
                        <button class="btn btn-info mr-6" onClick= {()=> setShopLocationModalOpened(true)}>Shop location</button>

                        <button class="btn btn-success" onClick= {()=> setAddProductModalOpened(true)}>Add product</button>

                        </> : null
                    }
                    
                    {/* cart items */}
                    <ShopProfileElements profileUserId={profileUserId}/>  

                </div>

                <SetShopLocation showModal={shopLocationModalOpened} setShowModal={setShopLocationModalOpened} profileUserId={profileUserId}/>

                <AddProduct showProfileModal={addProductModalOpened} setShowProfileModal={setAddProductModalOpened} data={userDetails}/>
                    
                    
                </> :
                <>
                    {/* 'unexpanded post' card */}
                    <div class="xl:col-start-1 xl:col-span-3 w-full">

                        {user.user._id === profileUserId ? ( // show if own profile
                            <UnExpandedPostMaker showModal={showModal} setShowModal={setShowModal}/>
                        ):null}

                        <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

                        {/* posts */}
                        {/* no need to pass socket because we dont care about live notifications in this page */}

                        {/* <AllPosts userId={id}/> */}
                        <AllOwnPosts userId={id}/>


                    </div>
                </>
            }
             


        </div>

            
        {/* 'expanded post' card */}
        {/* <div class="grid place-items-center">
            <ExpandedPostMaker showModal={showModal} setShowModal={setShowModal}/>

        </div> */}

        
        
    </div>
  )
}

export default ProfilePage