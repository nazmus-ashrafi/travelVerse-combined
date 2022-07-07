import { motion } from "framer-motion"


import React from 'react'
import { useRef, useState } from "react";

const FollowerCard = () => {


  return (
<div>
    <div class="w-64 carousel rounded-box">
  
  
  <div class="carousel-item w-full">
    {/* follower card */}
        <div
            
            key="modal"
            
            // drag
            // dragConstraints={{ left: 0, right: 0,top: 0,bottom:0 }}
            // dragConstraints={constraintsRef}
            
            className='z-10 xl:col-start-3 xl:col-span-1 md:col-start-2 md:col-span-1'
            
            
            >
                {/* follow card */}
                <div class="card w-56 h-60 bg-base-100 shadow-xl grid place-items-center z-10 space-y-0">

                    

                    {/* avatar */}
                    <div class="avatar pt-4">
                        <div class="w-20 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>
                        </div>
                    </div>

                
                    {/* name, description and follow button */}
                    <div class="card-body items-center text-center ">
                        
                        <h2 class="text-lg font-extrabold">Simon Polokson</h2>

                        <div class="text-base-content text-sm text-opacity-60">20 fellow travellers</div>
                    
                        
                        <div class="card-actions">
                            <button class="btn btn-info btn-sm">Follow</button>
                        </div>
                        
                    </div>

                
                </div>
                


         </div>
  </div> 
  <div class="carousel-item w-full">
    {/* follower card */}
        <div
            
            key="modal"
            
            // drag
            // dragConstraints={{ left: 0, right: 0,top: 0,bottom:0 }}
            // dragConstraints={constraintsRef}
            
            className='z-10 xl:col-start-3 xl:col-span-1 md:col-start-2 md:col-span-1'
            
            
            >
                {/* follow card */}
                <div class="card w-56 h-60 bg-base-100 shadow-xl grid place-items-center z-10 space-y-0">

                    

                    {/* avatar */}
                    <div class="avatar pt-4">
                        <div class="w-20 mask mask-squircle">
                            <img src="https://api.lorem.space/image/face?hash=92048"/>
                        </div>
                    </div>

                
                    {/* name, description and follow button */}
                    <div class="card-body items-center text-center ">
                        
                        <h2 class="text-lg font-extrabold">Simon Polokson</h2>

                        <div class="text-base-content text-sm text-opacity-60">20 fellow travellers</div>
                    
                        
                        <div class="card-actions">
                            <button class="btn btn-info btn-sm">Follow</button>
                        </div>
                        
                    </div>

                
                </div>
                


         </div>
  </div>
</div>

         
</div>
  )
}

export default FollowerCard


       