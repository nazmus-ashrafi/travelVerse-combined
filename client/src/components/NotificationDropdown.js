import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const NotificationDropdown = ({notification}) => {

  const { user } = useSelector(
        (state) => state.auth
    )



  return (
    <div>

            

            {/* <!-- Dropdown menu --> */}
          
           
                <a href="#" class="flex items-center px-4 py-3 -mx-2 transition-colors duration-200 transform border-b bg-base-100 border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 rounded-md">

                    <img class="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

                    <p class="mx-2 text-sm text-gray-600 dark:text-white"><span class="font-bold" href="#">{notification.currentUserId === user.user._id?"You ":notification.currentUserUsername}</span> {notification.interaction} <span class="font-bold text-blue-500" href="#">{notification.postDescription}</span></p>
                </a>
                
            
            
        
  
    </div>
  )
}

export default NotificationDropdown