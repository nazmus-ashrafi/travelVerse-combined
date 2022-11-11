import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useSyncExternalStore } from "react";
import axios from 'axios'

import { logout, reset } from '../../features/auth/authSlice'

const AdminHome = () => {


  const { user } = useSelector(
    (state) => state.auth
  )

  // const state = useSyncExternalStore(user.subscribe, user.getSnapshot);

  // console.log(state)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const [allUsers, setAllUsers] = useState([])
  const [allPosts, setAllPosts] = useState([])
  
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get(process.env.REACT_APP_POST_URL + user.user._id  + "/getallusers")
      
      setAllUsers(response.data)
    
    }

    getAllUsers()

    
  }, [user]);


  useEffect(() => {
    const getAllPosts = async () => {
      const response = await axios.get(process.env.REACT_APP_POST_URL + user.user._id  + "/getallposts")
      
      setAllPosts(response.data)
    
    }

    getAllPosts()

    
  }, [user]);



  const onDeleteUserClick = async (id) => {
    const response = await axios({
            method: 'delete',
            url: '/user/' + id,
            headers: {}, 
            data:{currentUserId:user.user._id, currentUserAdminStatus:"true"}
        });

    if(response.status === 200){
        window.location.reload()
    }
  }

  const onDeletePostClick = async (id) => {
    const response = await axios({
      method: 'delete',
      url: '/post/' + id,
            
    });

    if(response.status === 200){
        window.location.reload()
    }
  }


  const getUserDetails = async (userid) => {
    
    const response =  await axios.get(process.env.REACT_APP_POST_URL + userid  + "/getanyuser")
    return response.data

    
  }


  const Author = ({ info }) => {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {

      getUserDetails(info).then((data) => {
        setCurrentUser(data)
      })
  
   }, [info]);
   

   return (
    <div class="flex items-center space-x-3">
      <div class="avatar">
        <div class="mask mask-squircle w-12 h-12">
          <img class="" src={currentUser && currentUser.profileImage != undefined && currentUser.profileImage.length>0 ? currentUser.profileImage[0] : require('../../img/default.png')} alt="avatar"/>
        </div>
      </div>
      <div>
        <div class="font-bold">@{currentUser?.username}</div>
        <div class="text-sm opacity-50">{currentUser?.email}</div>
      </div>
    </div>
   )

  }

 
  return (
    <div class="overflow-x-auto w-full">


      {/* nav */}
      <div class="sticky top-0 z-50">
        <div class="navbar bg-base-100">
          <div class="flex-1">
            <h1 class="font-['Abril'] italic font-bold text-2xl text-cyan-700 ml-2 ">Travelverse</h1>
            <a class=" ml-4 normal-case text-xl">Admin Panel</a>
          </div>
          <div class="flex-none">
            <ul class="menu menu-horizontal p-0">
              
              <li>
                <a
                  class="btn btn-active mr-1"
                  href="/login"
                  onClick={onLogout}
                >Logout
                </a>
              </li>
            </ul>
          </div>
      </div>
        
      </div>


      {/* users and shops */}
      <h1 class="text-4xl font-bold p-3 ml-3">Users & Shops</h1>
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            {/* <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th> */}
            <th>Name</th>
            <th>Stats</th>
            <th>Type</th>
            <th>Shop Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length ===0 && <tr><td className=''>No users found</td></tr>}
          {allUsers.map((user) => (
            <>
            {/* <!-- row 1 --> */}
              <tr>
                {/* <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th> */}
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        {/* <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" /> */}

                        <img class="" src={user && user.profileImage != undefined && user.profileImage.length>0 ? user.profileImage[0] : require('../../img/default.png')} alt="avatar"/>
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">@{user.username}</div>
                      <div class="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td >
                  <div className='badge badge-ghost badge-lg '>
                    {user.followers.length} followers / {user.following.length} following
                  </div>
                  
                  <br/>
                  {/* <span class="badge badge-ghost badge-sm">8 posts</span> */}
                </td>
                {user.isShop ?<td><div class="badge badge-primary">Shop</div></td>:<td><div class="badge badge-secondary">User</div>
                </td>}

                {user.isShop ? <td><div class="badge badge-primary">{user.shopnumber}</div></td>: <td><div class="badge badge-primary"></div></td>}
                
                <th>
                  <button class="btn btn-error btn-xs" onClick={()=>onDeleteUserClick(user._id)}>delete</button>
                </th>
              </tr>
            </>
            
          ))}
        </tbody>
        {/* <!-- foot --> */}
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
        
      </table>

      <hr className='mt-4 mb-4 opacity-50'/>

      {/* posts */}
      <h1 class="text-4xl font-bold p-3 ml-3">Posts</h1>
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            {/* <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th> */}
            <th>Author</th>
            <th>Title / Stats</th>
            {/* <th>Stats</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allPosts.length === 0 && <tr><td className=''>No posts found</td></tr>}
          {allPosts.map((post) => (
            <>
            {/* <!-- row 1 --> */}
              <tr>
                {/* <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th> */}
                <td>
                  <Author info={post.userId}/>
                </td>
                <td>
                  {post.title}
                  <br/>
                  <span class="badge badge-ghost badge-sm">{post.likes.length} likes / {post.comments.length} comments</span>
                </td>
                {/* <td>
                  <div>
                    {post.likes.length} likes / {post.comments.length} comments
                    </div>
                </td> */}

                {/* {<td><div class="badge badge-primary">Shop</div></td>} */}
                
                <th>
                  <button class="btn btn-error btn-xs" onClick={()=>onDeletePostClick(post._id)}>delete</button>
                </th>
              </tr>
            </>
            
          ))}
        </tbody>
        {/* <!-- foot --> */}
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
        
      </table>
    </div>
    
  )
}

export default AdminHome