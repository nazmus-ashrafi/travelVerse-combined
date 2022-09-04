import * as React from 'react';
import {useRef, useCallback, useEffect, useState} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';

import AllTimelinePins from '../../components/AllTimelinePins';
import LocationList from '../../components/LocationList';


import { useDispatch, useSelector } from "react-redux";
import { getTimeLinePosts } from '../../features/post/postSlice';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';

import {useNavigate} from 'react-router-dom';



const VisualizeCompare = () => {

    const navigate = useNavigate();

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
        zoom: 3, // 11
        bearing: 0,
        pitch: 0
    };

  const onSelectLocation = useCallback(({longitude, latitude,zoom}) => {
    mapRef.current?.flyTo({center: [longitude, latitude], duration: 6000 ,zoom: zoom ? zoom:17});
    // console.log(longitude, latitude)
  }, []);

  const [isOn, setIsOn] = useState(false); // Following's posts: on/off

  const swapOnClick = () => {
    setIsOn(true);
  }

  const swapOffClick = () => {
    setIsOn(false);
  }

  return (

    
    <>
        <div class="grid grid-cols-2 mr-4 divide-x-8 divide-zinc-800">
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapStyle = {process.env.REACT_APP_MAPBOX_STYLE}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                // style={{width: "60vw", height: "100vh"}}
                style={{height: "100vh"}}

                class="col-start-1 col-span-2 "
            >
                {/* {isOn?<AllTimelinePins posts={timelinePosts} userId={user.user._id}/>: <AllTimelinePins posts={ownPosts} userId={user.user._id}/>} */}

                <AllTimelinePins posts={timelinePosts} userId={user.user._id}/>
                
            </Map>

            
      
            {/* <ControlPanel onSelectCity={onSelectCity} /> */}
            <div class="col-start-2 col-span-2 h-screen overflow-auto ">

                <div class="flex justify-between">

                    {/* <div class='flex'>
                        <h1 class="mt-5 ml-6">Following's posts:</h1>
                
                        <label class="swap mt-3 ml-2">
                            <input type="checkbox" />
                            <div class="swap-on" onClick={swapOnClick} >ON</div>
                            <div class="swap-off" onClick={swapOffClick} >OFF</div>
                        </label>
                    </div> */}

                    <div class='flex'>
                        <h1 class="mt-5 ml-6"><b>Timeline posts:</b></h1>
                
                        {/* <label class="swap mt-3 ml-2">
                            <input type="checkbox" />
                            <div class="swap-on" onClick={swapOnClick} >ON</div>
                            <div class="swap-off" onClick={swapOffClick} >OFF</div>
                        </label> */}
                    </div>
                    
                    
                    <div class='p-1 mt-3 flex gap-3'>
                        
                        <div class="cursor-pointer">
                            <ZoomOutRoundedIcon fontSize='large' onClick={() => onSelectLocation(initialViewState)}/>
                        </div>

                        <div class="cursor-pointer">
                            {/* <AccountCircleRoundedIcon onClick={() => navigate(-1)} /> */}
                            <div class="w-8 mask mask-squircle">
                                <img src={user.user.profileImage != undefined && user.user.profileImage.length>0 ? user.user.profileImage[0] : require('../../img/default.png')} onClick={() => navigate(-1)}/>
                            </div>
                        </div>
                        
                    </div>

                    
                    
                    
                </div>
                

                {/* <LocationList posts={isOn ? timelinePosts : ownPosts} onSelectLocation={onSelectLocation} class=""/> */}

                <LocationList timelinePosts={timelinePosts} ownPosts={ownPosts} onSelectLocation={onSelectLocation} class=""/>


            </div>
            

        </div>
      
    </>
  );
  
}

export default VisualizeCompare