/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

import { useState, useEffect } from "react";
import { getUser } from '../features/user/userSlice';
import NotificationDropdown from './NotificationDropdown'

import { dismissNotifications } from '../features/user/userSlice'





const NotificationBell = ({socket}) => {

  //socket
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    try {

      socket.current.on("getNotification", (data) => {

        setNotifications((prev) => [...prev, data]);
        setIsOn(true)

      
      });
      
    } catch (error) {

      console.log(error)
      // console.log(notifications)
      
    }
      
  }, [socket]);

  // console.log(notifications)



  //



  // redux
 
    const dispatch = useDispatch()

    const { user } = useSelector(
        (state) => state.auth
    )

    const { userDetails } = useSelector(
        (state) => state.user
    )

    const { isLoading } = useSelector(
        (state) => state.post
    )

    const handleClick = (e) => {
     

      dispatch(getUser(user)) // getUser can only be fed with a user, not id

      

      setNotifications([])
      setIsOn(false)



    
    };


    useEffect(()=>{

      
        
          // dispatch(getUser(user._id))
        

        // console.log(user.notifications)
        
        // {user.notifications ? (user.notifications.length > 0 ? setIsOn(true) : setIsOn(false)) : setIsOn(false)}

        // {user.notifications.length > 0 ? setIsOn(true) : setIsOn(false)}

      

    },[])



    //

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [isOn, setIsOn] = useState(true);

    //

  //   const notifications = user.notifications
  // .map((notification)=>{

  //   // grab comments from each post and store in slice
  //   // dispatch(getCommentsForPost(post._id))

  //   return(
  //     <a
  //                             href="#"
  //                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
  //                           >
  //                             {notification}
  //                           </a>

  //   )
              
  // })


  const dismissCurrentNotifications = () => {
    dispatch(dismissNotifications(userDetails._id))

  }
    


  return (
    <div>
        <Menu as="div" className="mr-3 relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-400  dark:focus:ring-white z-50">

                      <span className="sr-only">Open notification menu</span>
                      {/* bell */}
                      <button
                        type="button"
                        className="shadow-md  p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-gray-400 dark:focus:ring-white"

                        onClick={handleClick}
                    
                        >
                            <span className="sr-only">View notifications</span>

                            <span 
                            className={classNames(isOn ? 'badge p-1.5 bg-red-600 text-white  opacity-100 absolute ' :  'badge p-1.5 bg-red-600 text-white  opacity-100 absolute hidden')}
                            >{userDetails ? userDetails.notifications ? userDetails.notifications.length + notifications.length:  notifications.length:null}</span>

                            {/* {user.notifications ? user.notifications.length + notifications.length: notifications.length} */}

                            

                            {/* <span 
                            className='badge p-1.5 bg-red-600 text-white  opacity-100 absolute '
                            >{notifications.length}</span> */}


                            <BellIcon className="h-6 w-6" aria-hidden="true" />

                  
                      </button>
                    </Menu.Button>
                  </div>

                  {/* profile pic menu */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 bg-base-300 ring-1 ring-black ring-opacity-5 focus:outline-none h-96 overflow-auto">
                      <Menu.Item>
                        {({ active }) => (
                            
                          <>
                            
                            {userDetails.notifications ? [...userDetails.notifications].reverse()
                            .map((notification)=>{


                            return(
                              <>
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                {/* {notification} */}
                                <NotificationDropdown notification={notification}/>
                                
                              </a>

                             

                              </>

                              

                            )
                
                              }):null}

                               {/* <a href="#" class="block py-2 font-bold text-center text-white bg-red-400 dark:bg-base-200 hover:underline ">Dismiss all notifications</a> */}

                               {/* <button  type="button" class="btn btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-white mt-4 mb-2 " >Dismiss all notification</button> */}
                                {notifications.length+userDetails.notifications.length>0?
                               <div class="grid place-items-center p-2 sticky bottom-0">
                                <button class="btn btn-primary btn-sm row-span-full p-2" onClick={dismissCurrentNotifications}>Dismiss all</button>
                               </div>:
                               <div class="grid place-items-center p-2 sticky bottom-0">
                                <h1 class="mt-40">No notifications to show</h1>
                               </div>}

                               
                            
                              {/* <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                This is a notification message
                              </a> */}
    

                          </>
                          
                          
                        )}
                      </Menu.Item>
                      
                      
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item> */}
                      
                    </Menu.Items>

                    
                    
                  </Transition>
                  
                  
                </Menu>
        
    </div>
  )
}

export default NotificationBell