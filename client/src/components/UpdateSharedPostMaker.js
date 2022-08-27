import React from 'react'
import { useDimensions } from "../dimentions/Dimentions"
import { useRef, useState, useEffect } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, reset, getTimeLinePosts} from '../features/post/postSlice'
import Spinner from './Spinner';

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";

import Post from './Post';

import axios from 'axios'


const UpdateSharedPostMaker = ({showModal,setShowModal,sharedPost, data}) => {


    // const desc = useRef();

    const initialState = {
        title: "",
        description: "",
    
    };

    const [formData, setFormData] = useState(data);
    useEffect(() => {
        setFormData(data);

        
    } , [data]);

    // Handle change in input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   

    const [progressFull,setProgressFull]= useState(false)

    // redux
    const dispatch = useDispatch()
    const { user } = useSelector(
        (state) => state.auth
    )
    //

    // get shared post user

    const [sharedPostUser, setSharedPostUser] = useState({})
    
    useEffect(()=>{

        const fetchSharedPostUser = async () => {
       
            const profileUser = await axios.get(process.env.REACT_APP_POST_URL + sharedPost.userId + "/getanyuser")

            setSharedPostUser(profileUser.data)
        }

        fetchSharedPostUser()
    },[])

    //



    // handle post update
    const handleUpload = async (e) => {
        e.preventDefault();

        // post data
        if(formData.description){
            const newPost = {
               

                //

                _id: formData._id,
                userId: user.user._id,
                title: formData.title,
                description: formData.description,
                images: null,
                latitude: sharedPost.latitude,
                longitude: sharedPost.longitude,

                likes: formData.likes,
                comments: formData.comments,
                shares: formData.shares,
                
                isSharedPost: true,
                sharedPostId: sharedPost._id,
                
                
            };
            // console.log(newPost)

            
            
            


            // update post 
            dispatch(updatePost(newPost,user))

    

            // dispatch(getTimeLinePosts(user.user._id));
            

            setShowModal(false)

            resetShare()


            

            // window.location.reload() 

        




        }
        

    

    }

    // Reset Post Share
    const resetShare = () => {
        
        // reset description and title
        setFormData(initialState)

        

      
    };



    const [viewState,setViewState]= useState({
    
        longitude: sharedPost.longitude,
        latitude: sharedPost.latitude,
        zoom: 6
                    
    })

    const [viewport, setViewport] = useState({
        zoom: 8
    });

   
    
    

  return (
      
    <>
        
        <Modal size="" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" >

            {/* class="bg-base-100 shadow-xl z-50 xl:w-1/2 w-11/12 rounded-xl pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 absolute" */}

            <div class="grid place-items-center bg-base-100"> 
             {/* form */}

                <ModalHeader toggler={() => setShowModal(false)}/>
                    

                <div class="flex justify-start items-center pt-3 pb-4">
                    <div class="avatar pr-5">
                        <div class="md:w-16 w-14 mask mask-squircle">
                            <img src={user && user.user.profileImage != undefined && user.user.profileImage.length>0 ? user.user.profileImage[0] : require('../img/default.png')}/>

                            {/* <img
                                src={
                                user.profilePicture
                                    ? serverPublic + user.profilePicture
                                    : serverPublic + "defaultProfile.png"
                                }
                                alt="Profile"
                            /> */}

                        </div>
                    </div>

                    <div class="avatar pr-5">
                        <div class="md:w-16 w-14 mask mask-squircle">
                            <img src={sharedPostUser && sharedPostUser.profileImage != undefined && sharedPostUser.profileImage.length>0 ? sharedPostUser.profileImage[0] : require('../img/default.png')}/>

                            {/* <img
                                src={
                                user.profilePicture
                                    ? serverPublic + user.profilePicture
                                    : serverPublic + "defaultProfile.png"
                                }
                                alt="Profile"
                            /> */}

                        </div>
                    </div>
                    

                    {/* <input type="text" name='title' placeholder="Mini title for your trip" class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200" maxlength="20" onChange={handleChange} value={data.title}></input> */}
                </div>

            

                <textarea id="description" name='description' type="text" rows="5" placeholder="Write something about the post you are sharing...." class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 " onChange={handleChange} value={formData.description} required></textarea>

                <div class="card w-96 glass mt-5">

                    
                        <div class="col-span-1 row-span-3 text-center p-3 card rounded-none h-60">
                            <Map
                                    {...viewState}
                                    onMove={evt => setViewState(evt.viewState)}
                                    onRender={evt => setViewState(viewState)}

                                    // style={{width: "w-full", height: 250}}
                                    attributionControl="none"
                                    mapStyle = {process.env.REACT_APP_MAPBOX_STYLE}
                                    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                                    
                                    style={{flex: 1, height: '100%', width: '100%', borderRadius: 10, }}
                                    

                                >
                                    <Marker longitude={sharedPost.longitude} latitude={sharedPost.latitude} anchor="bottom" >

                                     <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                                     
                                    </Marker>
                            </Map>
              
                         </div>
                    

                    <div class="card-body">
                        <h2 class="card-title">{sharedPost.title}</h2>
                        <p>{sharedPost.description}</p>
                        <div class="card-actions justify-end">
                        {/* <button class="btn btn-primary">Learn now!</button> */}
                        </div>
                    </div>
                </div>

                

                {
                    (formData.description)?(
                        (progressFull)?(<button data-modal-toggle="defaultModal" class="btn loading mt-4 mb-2 w-full">Update</button>) :
                        

                        <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 w-full" onClick={handleUpload}>Update</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mt-4 mb-2 w-full pointer-events-none opacity-20" >Update</button>
                        
                    )

                }

                {/* {sharedPost.likes?<Post key={sharedPost._id} data={sharedPost}  hidden={true} socket={socket} />:null} */}

                
                

            </div>

        </Modal>
        
    </>
  )
}


export default UpdateSharedPostMaker