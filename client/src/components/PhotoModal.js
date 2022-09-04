import React from 'react'

import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";

const PhotoModal = ({showModal,setShowModal,data}) => {
  return (
    <>
    <Modal size="lg" id="defaultModal" active={showModal} toggler={() => setShowModal(false)} aria-hidden="true" class="">

        

        <div class="grid place-items-center bg-base-100 "> 
        

            <ModalHeader toggler={() => setShowModal(false)}/>

            <Swiper
                pagination={{
                    type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper  max-w-6xl max-h-screen "
                >

                    {data ? data.map((image) => (

                
                    <SwiperSlide><img src={image} class="rounded-box h-full w-full "/></SwiperSlide>
                

                )) : null }

                </Swiper>

            

           


        </div>
    </Modal>
    </>
  )
}

export default PhotoModal