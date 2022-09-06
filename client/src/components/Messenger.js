import React from 'react'
import Message from './Message/Message'

import SendRoundedIcon from '@mui/icons-material/SendRounded';

const Messenger = () => {
  return (
    
    // chatmenu, chatbox, online friends

    <>
        <div class="flex flex-col w-full lg:flex-row">

            <div class="grid flex-grow bg-base-300 rounded-box place-items-center overflow-y-auto h-fit no-scrollbar relative chats">

                <div className="overflow-x-auto w-full h-[40rem] no-scrollbar">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead className='sticky top-0 z-50'>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Chats</th>
                            
                        </tr>
                        <tr className=' '>
                            <th colSpan="2" className='p-2'>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </span>

                                    <input type="text" class="w-full py-2 pl-10 pr-4 input" placeholder="Search Chat"  />
                                </div>
                            </th>
                            
                        </tr>
                        </thead>
                        
                        <tbody className=''>

                            
                        {/* <!-- row 1 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Brice Swyre</div>
                                <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 3 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Marjy Ferencz</div>
                                <div className="text-sm opacity-50">Russia</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 4 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Yancy Tear</div>
                                <div className="text-sm opacity-50">Brazil</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 5 --> */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Yancy Tear</div>
                                <div className="text-sm opacity-50">Brazil</div>
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        </tbody>
                        
                        
                    </table>
                </div>
            
            </div> 

            <div class="divider lg:divider-horizontal"></div> 

            <div>
                <div class="p-3 bg-base-200 rounded-box place-items-center w-96 overflow-y-auto h-[40rem] no-scrollbar messages relative ml-4">

                    <div className='sticky top-0'>
                        <a class="flex items-center px-4 py-2 transition-colors duration-200 transform rounded-md hover:ring bg-base-100">

                            <img class="object-cover mx-1 rounded-full h-6 w-6" src={require('../img/default.png')} alt="avatar"/>

                            <span class="mx-2 font-medium">@john</span>
                        </a>
                    </div>

                    <div className=''>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                    </div>

                

                </div>

                <div class="form-control p-4 ">
                
                    <label class="input-group w-96">
                        <input type="text" placeholder="Aa" class="input input-bordered w-full" />
                        <button class="btn btn-square">
                        <SendRoundedIcon/>
                        </button>
                    </label>
                </div>
            </div>
            
            

            <div class="divider lg:divider-horizontal"></div> 

            <div class="grid flex-grow bg-base-300 rounded-box place-items-center overflow-y-auto h-fit no-scrollbar relative online-friends">

                <div className="overflow-x-auto w-full h-[40rem] no-scrollbar">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead className='sticky top-0 z-50'>
                        <tr>
                            
                            <th>Online Travellers</th>
                            
                        </tr>

                        <tr>
                            <th className='p-2'>
                                <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>

                                <input type="text" class="w-full py-2 pl-10 pr-4 input" placeholder="Search Travellers"  />
                            </div>
                            </th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        {/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        {/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>{/* <!-- row 1 --> */}
                        <tr>
                            
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img class="object-cover rounded-full h-6 w-6 " src={require('../img/default.png')} alt="avatar"/>
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">Hart Hagerty</div>
                                {/* <div className="text-sm opacity-50">United States</div> */}
                                </div>
                            </div>
                            </td>
                            
                        </tr>
                        
                        </tbody>
                        
                        
                    </table>
                </div>
            
            </div> 

        </div>
    </>

    
  )
}

export default Messenger