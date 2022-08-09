import React from 'react'
import { useState, useEffect } from "react";
import { createComment } from '../features/post/postSlice';
import { useSelector, useDispatch } from "react-redux";

const CommentMaker = ({postId, handleNotification}) => {

    // redux
    const dispatch = useDispatch();
    const { user } = useSelector(
        (state) => state.auth
    )
    //

    const [textareaRows,setTextareaRows] = useState(1)
    const [comment,setComment] = useState({
        length:0,
        value:"",

    })

    const onEnterClick = ()=>{

        // console.log(comment.value)
        dispatch(createComment({desc:comment.value, postId:postId, userId:user.user._id}))
        setComment({
            length:0,
            value:"",
        })

        // socket
        handleNotification()

    }

  useEffect(()=>{

    if(comment.length > 350){
        console.log(comment.length)
        setTextareaRows(8)
    }else if(comment.length > 79){
        setTextareaRows(4)
    }else{
        setTextareaRows(1)
    }

  },[comment])

    


  return (
    <div>
        {/* make a comment */}
        {/* 50 rows */}
        <textarea type="text" rows={textareaRows} placeholder="Write a comment..." class="input w-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 h-full" value={comment.value} onChange={(e)=>{
            setComment({ 
            length: e.target.value.split('').length,
            value: e.target.value,
        })

        }}
        
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    console.log('enter')
                    console.log(comment.value)
                    
                    // Create comment
                    onEnterClick()

                }
            }}>
            
        </textarea>

    </div>
  )
}

export default CommentMaker