import React from 'react'
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

import { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { deletePost } from '../features/post/postSlice';

const DeletePost = ({showModal,setShowModal,data}) => {

    const dispatch = useDispatch()

    const onDeleteClick = () => {

        console.log(data)

        dispatch(deletePost(data))
        setShowModal(false)
        // window.location.reload()

    }

  return (
    <>
        
        <Modal size="" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" >

        

          <div class="grid place-items-center bg-base-100"> 
            

            <ModalHeader toggler={() => setShowModal(false)}/>

            
            <article class="prose">
              <h3 for="" class="mt-3 mb-3 tracking-wider ">Are you sure you want to delete this post?</h3>
              
            </article>

            <div class="grid grid-cols-2 gap-4 mt-4">
                
                <button onClick={onDeleteClick} class="btn btn-error btn-wide">Yes</button>
                <button onClick={() => setShowModal(false)} class="btn btn-primary btn-wide">No</button>
                
            </div>

            


           
                  

            
  
           
                      
                  

          </div>

        </Modal>
        
    </>
  )
}

export default DeletePost