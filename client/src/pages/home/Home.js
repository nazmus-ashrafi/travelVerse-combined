import Sidebar from '../../components/Sidebar'
import MessengerSideBar from '../../components/MessengerSideBar'
import Nav from '../../components/Nav'

import ProfileCard from '../../components/ProfileCard'

import UnExpandedPostMaker from '../../components/UnExpandedPostMaker'
import AllPosts from '../../components/AllPosts'
import NotificationBell from '../../components/NotificationBell'
import Messenger from '../../components/Messenger'


import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";

import { getUser } from '../../features/user/userSlice'
import {themeChange} from "theme-change";
import AdminHome from '../../components/Admin/AdminHome'

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AllTransactionsScreen from '../../components/Shop/AllTransactionsScreen'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home({socket}) {

  const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

  // const [dark,setDark] = useState('dark')

  // const window = document.querySelector(".window");

  // useEffect(() => {
  //   const darkMode = ()=>{
  //     window.classList.toggle(dark);
  //   }

  //   darkMode()

  // },[setDark])


  // reload page once on load 
    // const reloadCount = sessionStorage.getItem('reloadCount');
    // useEffect(() => {
    //     if(reloadCount < 2) {
    //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //     window.location.reload();
    //     } else {
    //     sessionStorage.removeItem('reloadCount');
    //     }
    // }, []);
  //


  

  const [unOpenedMessages, setUnOpenedMessages] = useState([]);

  // redux
  const dispatch = useDispatch()


  const { user } = useSelector(
        (state) => state.auth
    )


  useEffect(()=>{

    if(user){
      dispatch(getUser(user)) // this populated the user state when the app first loads
    }
    

  },[])

  //

  useEffect(()=> {
    themeChange(false)
  });


  // tab selection in home
  const [tab, setTab] = useState('home')




  return (


    
    
    
    // <div class='window dark' data-theme={process.env.REACT_APP_THEME}>
    <div class='window dark'>

      {user.user.isAdmin ? <AdminHome/> :
        <>

          {/* nav bar */}
          <div class="sticky top-0 z-50">
            <Nav socket={socket} unOpenedMessages={unOpenedMessages} setUnOpenedMessages ={setUnOpenedMessages}/>
            
          </div>
          
          {/* body */}
          {/* <div className='bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-base-100 ' > */}
          <div className=' ' >

            <div class="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1">

              <div class="top-10 left-0 fixed">
                
                <Sidebar tab={tab} setTab={setTab}/>
                
              </div>

              <div class="top-10 right-0 fixed invisible md:visible">
                <MessengerSideBar/>
              </div>
              
              <div class="xl:col-start-2 xl:col-span-3 lg:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-8/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full">

              
              {/* <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr> */}
                

                {user.user.isShop ? (
                  <>
                    {/* shop dashboard */}

                    <div class="grid grid-cols-8">
                      <div class="xl:col-start-3 xl:col-span-4 lg:p-10 lg:pb-0 md:col-start-2 md:col-span-6  col-start-2 col-span-6 p-5 " >
                        <Doughnut data={data} />
                        {/* orders received / orders fulfilled */}
                      </div>
                      
                      
                    </div>

                    <AllTransactionsScreen/>
                    
                    
                  </>
                  
                ):
                  <>
                    {/* post elements */}
                    <div class={`xl:col-start-2 xl:col-span-3 md:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-11/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full ${tab === 'home'?'':'hidden'}`}>
                      

                      <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>
                      
                      {/* 'unexpanded post' card */}
                      <UnExpandedPostMaker />

                      <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

                      {/* post */}
                      <AllPosts socket={socket} userId={user.user._id}/>

                    </div>
                  </>
                  
                }


                {/* messenger elements */}
                <div class={`xl:col-start-2 xl:col-span-3 md:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-11/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full ${tab === 'messenger'?'':'hidden'}`}>

                  <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 mb-8 opacity-10"></hr>
                  
                  {/* messenger */}
                  <Messenger socket={socket} unOpenedMessages={unOpenedMessages} setUnOpenedMessages ={setUnOpenedMessages}/>

                </div>

              </div>

            </div>

          

          </div>

        </>
        
      }


      
    

    </div>
    
    
    
  )
}

