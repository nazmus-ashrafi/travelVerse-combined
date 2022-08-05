import * as React from 'react';
import {useRef, useCallback, useEffect, useState} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';

import AllTimelinePins from '../../components/AllTimelinePins';
import LocationList from '../../components/LocationList';


import { useDispatch, useSelector } from "react-redux";
import { getTimeLinePosts } from '../../features/post/postSlice';



const VisualizeCompare = () => {

    // redux

    const { user } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTimeLinePosts(user.user._id))
  
    },[])

    let { timelinePosts, isLoading } = useSelector((state) => state.post);

    const ownPosts = timelinePosts.filter(post => post.userId === user.user._id)

    //



    // const mapRef = useRef<MapRef>(null);
    const mapRef = React.useRef();

    const initialViewState = {
        // latitude: ownPosts[0].latitude, // 23.77783437646191 
        // longitude: ownPosts[0].longitude, // 90.38149930538287 
        latitude: 23.77783437646191,
        longitude: 90.38149930538287,
        zoom: 1, // 11
        bearing: 0,
        pitch: 0
    };

  const onSelectLocation = useCallback(({longitude, latitude}) => {
    mapRef.current?.flyTo({center: [longitude, latitude], duration: 3000,zoom: 12});
    // console.log(longitude, latitude)
  }, []);

  return (

    
    <>
        <div class="grid grid-cols-2 mr-4 divide-x-8 divide-zinc-800">
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                // style={{width: "60vw", height: "100vh"}}
                style={{height: "100vh"}}

                class="col-start-1 col-span-2 "
            >
                <AllTimelinePins/>
            </Map>
      
            {/* <ControlPanel onSelectCity={onSelectCity} /> */}
            <LocationList ownPosts={ownPosts} onSelectLocation={onSelectLocation} class="col-start-2 col-span-2 "/>

        </div>
      
    </>
  );
  
}

export default VisualizeCompare