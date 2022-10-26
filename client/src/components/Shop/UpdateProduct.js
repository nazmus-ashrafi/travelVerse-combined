import React from 'react'
import Modal from "../../components/Modal";
import ModalHeader from "../../components/ModalHeader";

import { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { updateUser } from "../../features/user/userSlice";
import { updateProduct } from '../../features/product/productSlice';


const UpdateProduct = ({setShowProfileModal, showProfileModal, data}) => {

  const [formData, setFormData] = useState(data);
  useEffect(() => {
    setFormData(data);
  } , [data]);


  const [progressFull,setProgressFull]= useState(false)
  
  
  // console.log(data);
  // console.log(formData)
  const [profileImage, setProfileImage] = useState(null);
  // const [imgUrl, setImgUrl] = useState(null);
  let imgUrl = []

  const dispatch = useDispatch();
  const param = useParams();

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImage(img)
        
    }
  };


  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // let userData = {...formData, profileImage:null};
    let userData = {...formData};

    if (profileImage) {
      const storage = getStorage();
      const fileName = Date.now() + profileImage.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, profileImage);


      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if(progress === 100){
            setProgressFull(true);
          }

          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);

            

            // setFormData({ ...formData, profileImage: downloadURL });
            imgUrl.push(`${downloadURL}`)
            // console.log(imgUrl);
            // formData.profileImage = []
            

            
          }).then(() => {
            userData.profileImage = imgUrl

            dispatch(updateProduct(userData));

            setShowProfileModal(false);
            setProfileImage(null);

            // window.location.reload();
          } )
        }
      );

      
    }else {
      console.log(userData);

      dispatch(updateProduct(userData));

      setShowProfileModal(false);
      setProfileImage(null);

      // window.location.reload();
    }
    


    
  };
  

  return (
    <>
        
        <Modal size="" id="defaultModal" active={showProfileModal} toggler={() => setShowProfileModal(false)} aria-hidden="true" >

        

          <div class="grid place-items-center bg-base-100"> 
            {/* form */}

            <ModalHeader toggler={() => setShowProfileModal(false)}/>

            
            <article class="prose">
              <h2 for="" class="mt-3 mb-3 tracking-wider ">Update Product</h2>
              
            </article>

            


            {/* profile image */}
            
            <div class="form-control mt-5 mb-5 ml-5 mr-5 flex flex-row justify-between">


              <div class="avatar">
                <div class="w-24 mask mask-squircle">
                    <img src={profileImage ? URL.createObjectURL(profileImage) : (formData.profileImage != undefined ? formData.profileImage : require('../../img/default.png'))}/>
                </div>
              </div>
              
              <input type="file" id="img" name="profileImage" class="cursor-pointer mt-6 ml-6" onChange={onImageChange}/>

            </div>
                  

            {/* infos */}

            <div class="form-control mt-4">

              <label class="input-group">
                <span>Product Name</span>
                <input type="text" name='name' placeholder="Name" class="input input-bordered" onChange={handleChange} value={formData.name} />
              </label>
            </div>

            <div class="form-control mt-4">

              <label class="input-group">
                <span>Brand Name</span>
                <input type="text" name='brand' placeholder="Brand" class="input input-bordered" onChange={handleChange} value={formData.brand} />
              </label>
            </div>

            <div class="form-control mt-4">

              <label class="input-group">
                <span>Product Price (৳)</span>
                <input type="text" placeholder="Price" class="input input-bordered" onChange={handleChange} name='price' value={`${formData.price}`} />
              </label>
            </div>

            <div class="form-control mt-4">

              <label class="input-group">
                <span>Product Qty</span>
                <input type="text" placeholder="Number in stock" class="input input-bordered" onChange={handleChange} name='countInStock' value={formData.countInStock} />
              </label>
            </div>
              
              

            <textarea id="description" name='description' type="text" rows="4" placeholder="Description" class="input w-full h-full text-lg pr-2 pt-2 pb-2 rounded-xl resize-none border-solid border-2 border-base-200 mt-8 " onChange={handleChange} value={formData.description}></textarea>
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. */}

              
            
                  
            {
                    (formData.name && formData.brand && formData.price && formData.countInStock && formData.description && formData.profileImage) ? (

                      (progressFull)?(<button data-modal-toggle="defaultModal" class="btn loading mt-8 mb-2 w-full">Update</button>) :
                        
                        
                        <button data-modal-toggle="defaultModal" type="button" class="btn bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-8 mb-2 w-full" onClick={handleSubmit} >Update</button>
                    ):(
                        <button data-modal-toggle="defaultModal" type="button" class="btn no-animation mb-2 w-full pointer-events-none opacity-20 mt-8" >Update</button>
                        
                    )

                }
                      
                  

          </div>

        </Modal>
        
    </>
  )
}

export default UpdateProduct