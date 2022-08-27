import React from 'react'
import { UilPen } from "@iconscout/react-unicons";

import ExpandedPostMaker from './ExpandedPostMaker'; 
import { useState } from "react";

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';

import { useSelector, useDispatch } from "react-redux";

const UnExpandedPostMaker = ({showModal,setShowModal}) => {

    const [modalOpened, setModalOpened] = useState(false)

    const { userDetails } = useSelector(
        (state) => state.user
    )

  return (
    <>
    <div className='flex justify-start items-center bg-base-100 shadow-xl z-10 pt-2 pb-2 xl:pr-10 xl:pl-10 pr-5 pl-5 rounded-xl'>
        {/* avatar */}
                <div class="avatar pr-10">
                    <div class="md:w-20 w-16 mask mask-squircle">
                        <img class="object-cover mx-1 rounded-full h-6 w-6" src={userDetails && userDetails.profileImage != undefined && userDetails.profileImage.length>0 ? userDetails.profileImage[0] : require('../img/default.png')} alt="avatar"/>
                    </div>
                </div>
                
                {/* buttons */}
                <div class='flex-grow pt-4'>

                    {/* bg-slate-600 hover:bg-slate-500 hover:text-slate-50 */}
                    <div class=" btn-outline cursor-pointer rounded-full p-2 outline outline-1 outline-zinc-400 "  data-modal-toggle="defaultModal" type="button" onClick= {()=> setModalOpened(true)}><span class='text-lg pl-3'>{`Where did you go${userDetails ? ', '+ userDetails.firstname + ' ?':'..'}`}</span></div>

                    {/* <label for="post-modal" class="mt-6 mr-5 absolute top-0 right-0 modal-button">
                        <UilPen
                        width="2rem"
                        height="1.2rem"  
                        onClick= {()=> setModalOpened(true)}             
                    />
                    </label> */}


                    <ExpandedPostMaker
                        showModal={modalOpened}
                        setShowModal={setModalOpened}
                    />


                    <div class='flex justify-center items-center xl:p-3 p-1 space-x-3'>
                        <button class="btn btn-ghost  flex-grow rounded-full normal-case font-normal" onClick= {()=> setModalOpened(true)}><AddLocationAltRoundedIcon color='accent'/><span className='ml-1'>Location</span></button>

                        <button class="btn btn-ghost  flex-grow rounded-full normal-case font-normal flex" onClick= {()=> setModalOpened(true)}><InsertPhotoRoundedIcon  color='primary'/><span className='ml-1'>Photo</span></button>
                        
                        <button class="flex btn btn-ghost  flex-grow rounded-full normal-case font-normal" onClick= {()=> setModalOpened(true)}>
                            <SentimentVerySatisfiedRoundedIcon color='secondary'/>
                            <span className='ml-1'>Mood</span>
                        </button>

                    </div>
                    

                </div>



    </div>
                
    </>
  )
}

export default UnExpandedPostMaker