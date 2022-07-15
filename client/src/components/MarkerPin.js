import React from 'react'
import { useRef, useState } from "react";

import {Marker} from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import RoomRoundedIcon from '@mui/icons-material/RoomRounded'

const MarkerPin = ({data,color}) => {

    const [viewport, setViewport] = useState({
        zoom: 8
    });

    // console.log(color)

    
    return (
        <div>
            <Marker longitude={data.longitude} latitude={data.latitude} anchor="bottom" >
                <RoomRoundedIcon style={{color:color,fontSize:viewport.zoom * 5}}/>
            </Marker>
        </div>
    )
}

export default MarkerPin