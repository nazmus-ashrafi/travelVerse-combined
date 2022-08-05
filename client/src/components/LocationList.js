import React from 'react'
import {useRef, useCallback, useEffect, useState} from 'react';
import Post from './Post';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';



const LocationList = ({ownPosts, onSelectLocation}) => {



  return (
    <div>
        <div className="h-screen overflow-auto">
            

            {ownPosts.map((post) => (

                
                <div className="">
                    

                    <div class="collapse mt-4 mb-2 rounded-xl mr-1 ml-5 ">
                        <input type="checkbox" class="peer w-full" /> 

                        
                        
                        <div class="collapse-title bg-base-300 text-primary-content peer-checked:bg-base-300 peer-checked:text-secondary-content flex justify-between">
                            <div class='ml-9'>
                                {post.isSharedPost?post.description:post.title}
                            </div>
                            
                            {post.isSharedPost? <div class="badge badge-success ml-96 mt-0.5">shared</div> : null}
                            
                            <UnfoldMoreIcon className=''/>
                            
                            
                        </div>
                        


                        <div class="collapse-content bg-base-300 text-primary-content peer-checked:bg-base-300 peer-checked:text-secondary-content"> 

                            <div class="flex">
                                <input
                                    type="radio"
                                    name="location"
                                    class="radio"
                    
                                    // defaultChecked={post._id === ownPosts[0]._id}
                                    onClick={() => onSelectLocation(post)}
                                />
                                <label class="ml-3">Target</label>
                            </div>
                            
                            <Post data={post} hidden={false}/>
                            

                        </div>
                        
                        <hr class="w-full xl:col-start-1 xl:col-span-3 rounded-xl opacity-10"></hr>

                    </div>
                </div>

            ))}


        </div>
    </div>
  )
}

export default LocationList