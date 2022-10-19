import React from 'react'

import AllProducts from './AllProducts'
import { useDispatch, useSelector } from "react-redux";

const ShopProfileElements = ({profileUserId}) => {

    const { user } = useSelector(
        (state) => state.auth
    )

  return (
    <>
        {/* {user.user.isShop & user.user._id === profileUserId ? 
         // show if user is a shop and the profile is the user's own profile
        <>
          <button class="btn btn-info mr-6">Set shop location</button>
          <button class="btn btn-success">Add products</button>
        </>:null
        } */}
        

        <AllProducts profileUserId={profileUserId}/> 
    </>
  )
}

export default ShopProfileElements