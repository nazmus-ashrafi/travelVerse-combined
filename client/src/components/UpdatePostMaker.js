import React from 'react'
import { useDimensions } from "../dimentions/Dimentions"
import { useRef, useState, useEffect } from "react";

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, reset, getTimeLinePosts } from '../features/post/postSlice'
import Spinner from './Spinner';

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";

import { isWebUri } from 'valid-url';

import GeocoderControl from './geocoder-control';

const UpdatePostMaker = ({showModal,setShowModal,data}) => {

    const constraintsRef = useRef(null);
    const { width,height } = useDimensions(constraintsRef);

    function validURL(str) {
        if (!isWebUri(str)) {
            return false;
        } else {
            return true;
        }
    }

    const [formData, setFormData] = useState(data);
    useEffect(() => {
        setFormData(data);

        

        
    } , [data]);

    // useEffect(() => {
    //     setInitialViewState(
    //         {longitude: formData.longitude + 0.67,
    //     latitude: formData.latitude,
    //     zoom: 9}
    //     )

    //     setNewPlace(
    //         {lat: formData.latitude,
    //     long: formData.longitude
    //     }
    //     )
    // } , []);

    // const desc = useRef();

    const initialState = {
        title: "",
        description: "",
    
    };

    // const [data, setData] = useState(initialState);

    // Handle change in input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [initialViewState,setInitialViewState]= useState({
        
        longitude: formData.longitude,
        latitude: formData.latitude,
        zoom: 14
                        
    })
    const [viewport, setViewport] = useState({
        zoom: 6
    });
    const [newPlace,setNewPlace]= useState({
        lat: formData.latitude,
        long: formData.longitude
    })

    const [progressFull,setProgressFull]= useState(false)

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

    let { timelinePosts, isLoading } = useSelector((state) => state.post);

    // handle post update
    let codedImages = [];
    const handleUpload = async (e) => {
        e.preventDefault();

        // post data
        if(formData.description && formData.title && newPlace.lat && newPlace.long){
            const newPost = {
                
                _id: formData._id,
                userId: user.user._id,
                title: formData.title,
                description: formData.description,
                images: null,
                latitude: newPlace.lat,
                longitude: newPlace.long,

                likes: formData.likes,
                comments: formData.comments,
                shares: formData.shares,
                
                isSharedPost: false,
                

                // isSharedPost: true,
                // sharedPostId: "62e6ac743c78d143c17d8165",
                
                
            };

            // console.log(newPost)


            if (images && images.length>0) { // if there is an image with post

                if(!validURL(images[0])){
                        images.map((image) => {

                    
                    

                    const storage = getStorage();
                    const fileName = Date.now() + image.name;
                    const storageRef = ref(storage, fileName);
                    const uploadTask = uploadBytesResumable(storageRef, image);

                    // Firebase image upload boilerplate
                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        if(progress === 100){
                            setProgressFull(true);
                        }

                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                        }
                    }, 
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        // let url = URL.createObjectURL(downloadURL);

                        codedImages.push(`${downloadURL}`);
                        // console.log(codedImages)
                        }).then(() => {
                            
                            
                            if(codedImages.length === images.length){
                                newPost.images = codedImages;
                                dispatch(updatePost(newPost))
                                
                                setShowModal(false)

                                resetShare()

                                window.location.reload()
                            }


                        })
                    }
                    );


                }) 
                }else{
                    images.map((image) => {
                        codedImages.push(image);
                    })
                    if(codedImages.length === images.length){
                                newPost.images = codedImages;
                                dispatch(updatePost(newPost))
                                
                                setShowModal(false)

                                resetShare()

                                window.location.reload()
                            }
                }

                
                
                
            } else { // if there is no image with post

                // create post 
                dispatch(updatePost(newPost))

        

                // dispatch(getTimeLinePosts(user.user._id));
                

                setShowModal(false)

                resetShare()

                window.location.reload() 

            }




        }
        

    

    }

    // Reset Post Share
    const resetShare = () => {
        
        // reset description and title
        setFormData(initialState)

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

        // reset images array
        setImages(null)

    };


    // handle image upload
    const [images, setImages] = useState();
    const imageRef = useRef();
    const currImages = []

    // view prev image logic
     useEffect(() => {
        if(formData.images){
            setImages(formData.images)
        }

        // console.log(images)
    } , [data]);

    //

    



    const onImageChange = (event) => {
    
        if (event.target.files && event.target.files[0]) {

            
            

            for (let i = 0; i < event.target.files.length; i++) {
                let img = event.target.files[i];
                // let url = URL.createObjectURL(img);
                

                currImages.push(img)

                
            }

            setImages(currImages);
            // setImage({
            //     image: URL.createObjectURL(img),
            // });

        
            
            
        }
    };

    // useEffect(()=>{


    //     console.log(images)

    // },[onImageChange])
    
    

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
                    {/* <h3>Maluha is feeling good at Sibui.</h3> */}
                    {/* <input type="text" placeholder="Write a title" /> */}

                    <input type="text" name='title' placeholder="Mini title for your trip" class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200" maxlength="20" onChange={handleChange} value={formData.title}></input>
                </div>

                
                {/* map */}
                <div class=" card w-full bg-base-100 shadow-xl grid place-items-center mr-5 ml-5 mb-5" ref={constraintsRef}>

                    {/* <input type="text" placeholder="Where did you go?" class="absolute z-10 input input-bordered text-lg w-8/12 rounded-full mb-80 opacity-90"></input> */}

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
                        style={{width: "40vw", height: 400}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                        onDblClick={handleMapClick}
                    >
                        
                        <Marker longitude={newPlace.long} latitude={newPlace.lat} anchor="bottom" >
                         <RoomRoundedIcon style={{color:"slategrey",fontSize:viewport.zoom * 5}}/>
                        </Marker>

                        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX} position="top-left" />
                        

                    </Map>
                    
                </div>

                <textarea id="description" name='description' type="text" rows="5" placeholder="Write something about your trip...." class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 " onChange={handleChange} value={formData.description} required></textarea>

                <div class='flex flex-row justify-between items-center xl:p-3 p-1 space-x-3 w-full border-solid border-2 border-base-200 rounded-xl mt-4 pb-1'>

                    <h2 class="basis-1/2 font-medium ml-5">Add to your post</h2>


                    <div class="flex flex-row basis-1/4">

                        <button class="btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal flex" onClick={()=>imageRef.current.click()}><InsertPhotoRoundedIcon  color='primary'/><span className='ml-1'>Photo</span></button>
                    
                        <button class="flex btn btn-ghost hover:bg-slate-600 flex-grow rounded-full normal-case font-normal">
                        <span>Mood</span>
                        </button>

                        <div style={{ display: "none" }}>
                            
                            <input
                                type="file"
                                
                                ref={imageRef}
                                onChange={onImageChange}
                                multiple
                                accept='image/*'
                                
                            />

                            
                            
                        </div>

                    </div>
                        

                </div>

                {images && images[0]? (
                <div class="carousel carousel-center w-full  p-4 space-x-4 bg-base-200 rounded-box mt-4">

                    {images.map((image) => (

    
                        
                        <div class="carousel-item">

                            <CancelRoundedIcon onClick={()=>{
                                setImages(images.filter((e) => e !== image));


                                console.log(images)

                            }}/>

                            {validURL(image)?<img src={image} class="rounded-box w-60 h-60"  />:<img src={URL.createObjectURL(image)} class="rounded-box w-60 h-60"  />}

                            {/* <img src={URL.createObjectURL(image)} class="rounded-box w-60 h-60"  /> */}
                            
                        </div>

                    ))}

                </div>):null}

                {/* <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 w-full" onClick={handleUpload}>Post</button> */}

                {
                    (newPlace && formData.description && formData.title)?(
                        (progressFull)?(<button data-modal-toggle="defaultModal" class="btn loading mt-4 mb-2 w-full">Update</button>) :
                        

                        <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 w-full" onClick={handleUpload}>Update</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mt-4 mb-2 w-full pointer-events-none opacity-20" >Update</button>
                        
                    )

                }

            </div>

        </Modal>
        
    </>
  )
}


export default UpdatePostMaker