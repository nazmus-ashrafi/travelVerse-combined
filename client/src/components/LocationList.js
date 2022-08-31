import React from 'react'
import {useRef, useCallback, useEffect, useState} from 'react';
import Post from './Post';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';



const LocationList = ({timelinePosts, onSelectLocation, ownPosts}) => {

    // const [posts, setPosts] = useState(timelinePosts);

    
    
    // useEffect(() => {
    //     setPosts(timelinePosts);
    // }, [isOn]);



  return (
    <div>
        <div className="">

            
            {timelinePosts.map((post) => (

                
                <div className="">
                    
                    

                    <div class="collapse mt-4 mb-2 rounded-xl mr-1 ml-5 ">
                        <input type="checkbox" class="peer w-full" /> 

                        
                        
                        <div class="collapse-title bg-base-300  grid grid-flow-col grid-cols-7 gap-4">
                            <div class=' col-start-1 col-span-5 ml-5 '>
                                {post.isSharedPost ? post.description : post.title}
                            </div>
                            
                            <div class='col-start-6 col-span-1  '>
                                
                                {post.isSharedPost? <div class="badge badge-success mt-0.5 mr-2">shared</div> : null}
                                
                                
                            </div>
                            <div class='col-start-7 col-span-1 '>
                                <UnfoldMoreIcon className=''/>
                            </div>
                            
                            
                            
                        </div>
                        


                        <div class="collapse-content bg-base-300 "> 

                            <div class="flex">
                                <input
                                    type="radio"
                                    name="location"
                                    class="radio"
                                    // checked={false}
                    
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