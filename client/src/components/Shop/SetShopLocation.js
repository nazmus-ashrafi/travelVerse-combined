import React from 'react'
import { useDimensions } from '../../dimentions/Dimentions';
import { useRef, useState, useEffect,useCallback  } from "react";

import Modal from "../Modal";
import ModalHeader from '../ModalHeader';

import Map, {Marker}  from 'react-map-gl';
import GeocoderControl from '../geocoder-control';


import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import StoreIcon from '@mui/icons-material/Store';

import { useDispatch, useSelector } from "react-redux";

import Spinner from '../Spinner';

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import Picker from 'emoji-picker-react';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';

import { updateUser } from '../../features/user/userSlice';

const SetShopLocation = ({showModal,setShowModal}) => {

  const { userDetails } = useSelector(
        (state) => state.user
    )

  const [formData, setFormData] = useState(userDetails);
  useEffect(() => {
    setFormData(userDetails);
  } , [userDetails]);

  const dispatch = useDispatch();
  const handleClick = (e) => {
    
    dispatch(updateUser({...formData, latitude : newPlace.lat, longitude : newPlace.long}));
    setShowModal(false);
  }

  // Using geo location to set initial location to the current location of the user
  useEffect(() => {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true
        })

        function successLocation(position) {

            if(userDetails.latitude && userDetails.longitude){
              setInitialViewState({longitude:userDetails.longitude, latitude:userDetails.latitude, zoom: 15})
              setNewPlace({lat:userDetails.latitude,long:userDetails.longitude})
                
            }else{
              setInitialViewState({longitude:position.coords.longitude, latitude:position.coords.latitude})
              setNewPlace({lat:position.coords.latitude,long:position.coords.longitude})

            }
            
        }

        function errorLocation() {
            setInitialViewState({longitude:-2.24, latitude:53.48})
            setNewPlace({lat:53.48,long:-2.24})
        }
        
    }, []);
    //


  const constraintsRef = useRef(null);
  const [initialViewState,setInitialViewState]= useState({
        
        longitude: 103.38149930538287,
        latitude: 23.77783437646191,
        zoom: 14 //4
                        
    })

    const [viewport, setViewport] = useState({
        zoom: 6
    });

     const [newPlace,setNewPlace]= useState({
        lat: 23.77783437646191,
        long: 90.38149930538287
    })

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


  return (
    <>
        
        <Modal size="" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" >

            {/* class="bg-base-100 shadow-xl z-50 xl:w-1/2 w-11/12 rounded-xl pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 absolute" */}

            <div class="grid place-items-center bg-base-100"> 
             {/* form */}

              <ModalHeader toggler={() => setShowModal(false)}/>
                  

              
              {/* map */}
              <div class=" card w-full bg-base-100 shadow-xl grid place-items-center mr-5 ml-5 mb-5" ref={constraintsRef}>

                  {/* <input type="text" placeholder="Where did you go?" class="absolute z-10 input input-bordered text-lg w-8/12 rounded-full mb-80 opacity-90">
                      
                  </input> */}

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
                      mapStyle = {process.env.REACT_APP_MAPBOX_STYLE}
                      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                      onDblClick={handleMapClick}
                      // addControl={geocoder}
                      
                      
                  >
                      
                    <Marker longitude={newPlace.long} latitude={newPlace.lat} anchor="bottom" >
                      <StoreIcon style={{color:"Peru",fontSize:viewport.zoom * 5}}/>
                    </Marker>

                    <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX} position="top-left" />
                      
                      

                  </Map>

                  
                  
              </div>
                  
              <button class="btn btn-info mr-6" onClick={()=>handleClick()}>Set shop location</button>

            </div>

        </Modal>
        
    </>
  )
}

export default SetShopLocation