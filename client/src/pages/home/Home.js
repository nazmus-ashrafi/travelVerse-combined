import Sidebar from '../../components/Sidebar'
import MessengerSideBar from '../../components/MessengerSideBar'
import Nav from '../../components/Nav'

import ProfileCard from '../../components/ProfileCard'

import UnExpandedPostMaker from '../../components/UnExpandedPostMaker'
import Post from '../../components/Post'



export default function Home() {

  // const [dark,setDark] = useState('dark')

  // const window = document.querySelector(".window");

  // useEffect(() => {
  //   const darkMode = ()=>{
  //     window.classList.toggle(dark);
  //   }

  //   darkMode()

  // },[setDark])


  return (
    
    
    <div class='window dark'>


      {/* nav bar */}
      <div class="sticky top-0 z-50">
        <Nav />
      </div>
      
  
      
      {/* body */}
      <div className='bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-base-100 ' >
        

        <div class="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1">

          <div class="top-10 left-0 fixed">
            
            <Sidebar/>
            
          </div>

          <div class="top-10 right-0 fixed invisible md:visible">
            <MessengerSideBar/>
          </div>
          
          <div class="xl:col-start-2 xl:col-span-3 lg:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-8/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full">

           

            <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

            

              {/* 'unexpanded post' card */}
              <div class="xl:col-start-2 xl:col-span-3 md:col-start-2 md:col-span-3 xl:ml-0 xl:mr-0 xl:w-full lg:w-11/12 lg:ml-0 lg:mr-10 md:w-10/12 md:ml-10 w-full">

                <UnExpandedPostMaker />
                <hr class="w-full xl:col-start-1 xl:col-span-3 mt-8 opacity-10"></hr>

                {/* post */}
                <Post/>

              </div>

          </div>

        </div>

       

      </div>
    

    </div>
    
    
    
  )
}

