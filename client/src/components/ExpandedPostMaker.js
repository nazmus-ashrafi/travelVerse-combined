import React from 'react'
import { useDimensions } from "../dimentions/Dimentions"
import { useRef, useState } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, reset } from '../features/post/postSlice'

const ExpandedPostMaker = ({showModal,setShowModal}) => {

    const constraintsRef = useRef(null);
    const { width,height } = useDimensions(constraintsRef);

    // const desc = useRef();

    const initialState = {
        title: "",
        description: "",
    
    };

    const [data, setData] = useState(initialState);

    // Handle change in input
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [initialViewState,setInitialViewState]= useState({
        
        longitude: 90.38149930538287,
        latitude: 23.77783437646191,
        zoom: 4
                        
    })
    const [viewport, setViewport] = useState({
        zoom: 6
    });
    const [newPlace,setNewPlace]= useState({
        lat: 23.77783437646191,
        long: 90.38149930538287
    })

    // redux
    const dispatch = useDispatch()
    const { user } = useSelector(
        (state) => state.auth
    )





    const handleMapClick = (e) => {

        // const [lng,lat] = e.lngLat

        const long = e.lngLat.lng
        const lat = e.lngLat.lat

        setNewPlace({
            lat,
            long,
        })

        // console.log(long)
        // console.log(lat)
    }

    // handle post upload
    const handleUpload = async (e) => {
        e.preventDefault();

        // post data
        if(data.description && newPlace.lat && newPlace.long){
            const newPost = {
                userId: user.user._id,
                title: data.title,
                description: data.description,
                latitude: newPlace.lat,
                longitude: newPlace.long,
            };

            console.log(newPost)

            // create post 
            dispatch(createPost(newPost,user))

            setShowModal(false)

            resetShare()



        }
        

        // if there is an image with post
        // if (image) {
        //     const data = new FormData();
        //     const fileName = Date.now() + image.name;
        //     data.append("name", fileName);
        //     data.append("file", image);
        //     newPost.image = fileName;
        //     console.log(newPost);
        //     try {
        //         dispatch(uploadImage(data));
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }


        // dispatch(uploadPost(newPost));
        // resetShare();

    }

    // Reset Post Share
    const resetShare = () => {
        
        // reset description and title
        setData(initialState)

        // reset map market
        setNewPlace({
            lat: 23.77783437646191,
            long: 90.38149930538287
        })

        // reset map focus
        setInitialViewState({
            longitude: 90.38149930538287, 
            latitude: 23.77783437646191,
            zoom: 4
        })
    };
    
    

  return (
      
    <>
        
        <Modal size="" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" >

            {/* class="bg-base-100 shadow-xl z-50 xl:w-1/2 w-11/12 rounded-xl pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 absolute" */}

            <div class="grid place-items-center bg-base-100"> 
             {/* form */}

                <ModalHeader toggler={() => setShowModal(false)}/>
                    

                <div class="flex justify-start items-center pt-3 pb-4">
                    <div class="avatar pr-5">
                        <div class="md:w-20 w-16 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>

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
                    {/* <h3>Maluha is feeling good at Sibui.</h3> */}
                    {/* <input type="text" placeholder="Write a title" /> */}

                    <input type="text" name='title' placeholder="Mini title for your trip" class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200" maxlength="20" onChange={handleChange} value={data.title}></input>
                </div>

                
                {/* map */}
                <div class=" card w-full bg-base-100 shadow-xl grid place-items-center mr-5 ml-5 mb-5" ref={constraintsRef}>

                    <input type="text" placeholder="Where did you go?" class="absolute z-10 input input-bordered text-lg w-8/12 rounded-full mb-80 opacity-90"></input>

                    {/* <Map
                        initialViewState={{
                            longitude: 23.8103,
                            latitude: 44.57875,
                            zoom: 10
                        }}
                        style={{width: "90vw", height: 400}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                    /> */}

                    <Map
                        {...initialViewState}
                        onMove={evt => setInitialViewState(evt.initialViewState)}
                        style={{width: "90vw", height: 400}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                        onDblClick={handleMapClick}
                    >
                        
                        <Marker longitude={newPlace.long} latitude={newPlace.lat} anchor="bottom" >
                         <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                        </Marker>
                        

                    </Map>
                    
                </div>

                <textarea id="description" name='description' type="text" rows="5" placeholder="Write something about your trip...." class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 " onChange={handleChange} value={data.description} required></textarea>

                <div class='flex flex-row justify-between items-center xl:p-3 p-1 space-x-3 w-full border-solid border-2 border-base-200 rounded-xl mt-4 pb-1'>

                    <h2 class="basis-1/2 font-medium ml-5">Add to your post</h2>


                    <div class="flex flex-row basis-1/4">

                        <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal ">Photo</button>
                    
                        <button class="flex btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">
                        <span>Mood</span>
                        </button>

                    </div>
                        

                </div>

                {/* <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 w-full" onClick={handleUpload}>Post</button> */}

                {
                    (newPlace && data.description)?(
                        <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 w-full" onClick={handleUpload}>Post</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mt-4 mb-2 w-full pointer-events-none opacity-20" >Post</button>
                        
                    )

                }

            </div>

        </Modal>
        
    </>
  )
}


export default ExpandedPostMaker