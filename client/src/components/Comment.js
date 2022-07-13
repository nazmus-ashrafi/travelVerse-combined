import React from 'react'


const Comment = () => {

  return (
    <>
    {/* comments */}
          <div class="pb-5 flex justify-start items-center">
            
            {/* avatar */}
            <div class="avatar pr-5 ">
                <div class="md:w-10 w-8 mask mask-squircle">
                    <img src="https://api.lorem.space/image/face?hash=92048"/>
                </div>
            </div>
              
            {/* comment */}
            <h3 class="w-full text-lg p-2 rounded-xl resize-none border-solid border-2 border-base-200 bg-base-200 h-full"
            >

              This is a comment.
            </h3>
              
          </div>
    </>
  )
}

export default Comment