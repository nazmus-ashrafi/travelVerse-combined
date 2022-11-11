/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import NotificationBell from './NotificationBell'

import { useRef, useState } from "react";
import Logo from './Logo'

import {themeChange} from "theme-change";
import MessageBell from './MessageBell'
import CartIcon from './Shop/CartIcon'

const themeValues = [
        "Dark",
        "Cupcake",
        "Bumblebee",
        "Emerald",
        "Corporate",
        "Synthwave",
        "Retro",
        "Cyberpunk",
        "Valentine",
        "Halloween",
        "Garden",
        "Forest",
        "Aqua",
        "Lofi",
        "Pastel",
        "Fantasy",
        "Wireframe",
        "Black",
        "Luxury",
        "Dracula",
        "Cmyk",
        "travelverseTheme",
        "travelverseThemeSecondary",
    ]

    



const navigation = [
  { name: 'Refresh', href: '', current: true, onClick: () => { window.location.reload() } },
  // { name: 'Theme', href: '#', current: false, onClick: () => {} },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
]


// add our event listener for the click
const burgerButtonClick = () =>{
  const sidebar = document.querySelector(".sidebarController");

  sidebar.classList.toggle("translate-x-64");
  sidebar.classList.toggle("md:-translate-x-64");

  // ['transform','translate-x-0', 'transition', 'duration-200','ease-in-out'].map(v=> sidebar.classList.toggle(v) )

}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = ({dark,setDark, socket, unOpenedMessages, setUnOpenedMessages}) => {

  useEffect(()=> {
    themeChange(false)
  });

  // navbell lag
  const [isHide, setIsHide] = useState(true);
  setTimeout(() => setIsHide(false), 4000);
  //


  // const darkBtn = ()=>{
  //     setDark('dark')
  // }

  //redux
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )

  const { userDetails } = useSelector(
    (state) => state.user
  )

  const { cartItems } = useSelector(
    (state) => state.cart
  )

  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

function refreshPage() {

  setTimeout(()=>{

    window.location.reload(false);

  }, 500);
  console.log('page to reload')

}

    
  return (

    
    <Disclosure as="nav" className="bg-gray-300 dark:bg-base-200">
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
            
            <div className="relative flex items-center justify-between h-16">
                {/* <button onClick={darkBtn}>Dark mode</button> */}
              
              {/* Mobile menu button */}
              <div onClick={burgerButtonClick} className="mobile-menu-button xs:absolute inset-y-0 left-0 flex items-center hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    // <XIcon className="block h-6 w-6" aria-hidden="true" />
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                
              </div>
              
              {/* <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className={"absolute left-0 top-20"}>
                  <Sidebar/>
                </Disclosure.Panel>
              </Transition> */}
              

              
              <div className="flex-1 flex items-center justify-start ml-5 xl:ml-0 sm:items-stretch sm:justify-start">

                
                  {/* Mobile menu button */}
                  {/* <div className="inset-y-0 left-0 flex items-center ">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div> */}
                
                
                
                {/* <Link to={`/profile/${user.user._id}`} onClick={refreshPage}  className="flex-shrink-0 flex items-center sm:ml-6"> */}
                <Link to={`/profile/${user.user._id}`} className="flex-shrink-0 flex items-center sm:ml-6">

                  <Logo size={'20'}/>

                  
                  <h1 class="font-['Abril'] italic font-medium text-2xl text-sky-600 pb-0 flex flex-col text-center w-full mr-10 sm:mr-5 ml-3">Travelverse</h1>
                  {/* <h1 class="font-['Abril'] font-bold italic text-5xl text-sky-500">Around the world</h1> */}
                </Link>
                  
                {/* refresh button */}
                <div className="hidden sm:block sm:ml-5">
                  <div className="flex space-x-4">
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={item.onClick}
                        className={classNames(
                          item.current ? 'bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))} */}

                    {/* <select className="text-primary" data-choose-theme>
                      <option className="text-primary" option value="">Default Value</option>
                      {themeValues.map((value) => (
                        <option className="text-primary" key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
                      ))}
                    </select> */}

                    <div class="dropdown mt-1 ">
                      <label tabindex="0" class="btn btn-sm ">Theme</label>
                      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-72 ">
                        <li>
                          <a>
                            <select className="select w-full max-w-xs " data-choose-theme>
                              <option className="text-primary" option value="">Default Value</option>
                              {themeValues.map((value) => (
                                <option className="text-primary" key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
                              ))}
                            </select>
                          </a>
                        </li>
                        {/* <li><a>Item 2</a></li> */}
                      </ul>
                    </div>

                  </div>

                  
                </div>
              </div>
              

              {/* rightside */}

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                <h1 class="font-['Abril'] italic font-medium text-2xl text-zinc-400 mr-3">@{user.user.username} {user.user.isShop ? `- ${user.user.shopnumber}`:""}</h1>

                  {/* <CartIcon/> */}

                  <label tabindex="0" class="btn btn-ghost btn-circle mr-0">
                    <div class="indicator" onClick={()=>navigate("/cart")}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span class="badge badge-sm indicator-item">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                    </div>
                  </label>

                  <MessageBell unOpenedMessages={unOpenedMessages} setUnOpenedMessages ={setUnOpenedMessages}/>

                  {/* notification button */}
                  {!isHide ? <NotificationBell socket={socket}/> :null}
                

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-400 dark:focus:ring-offset-gray-800 dark:focus:ring-white z-50">
                      <span className="sr-only">Open user menu</span>
                      {/* profile picture */}

                      <img className="h-8 w-8 rounded-full" src={userDetails && userDetails.profileImage != undefined && userDetails.profileImage.length>0 ? userDetails.profileImage[0] : require('../img/default.png')} alt="avatar"/>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <>
                          {/* <Link to={`/profile/${user.user._id}`} onClick={refreshPage} > */}
                          <Link to={`/profile/${user.user._id}`} >
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                            
                          </Link>

                          <Link to={`/allorders`} >
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Order History
                            </a>
                          </Link>

                            
                          <Link to={`/login`} >
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={onLogout}
                            >
                              Logout
                            </a>
                          </Link>
                            


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
            </div>
          </div>
          
          {/* nav open after mobile */}
          {/* <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">

              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

            </div>
            
          </Disclosure.Panel> */}
        </>
      )}
      
    </Disclosure>
  )
}

export default Nav