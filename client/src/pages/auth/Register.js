import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const Register = () => {
  return (

      <div class="text-gray-600 bg-base-100 body-font relative h-screen">
        <div class="container px-5 py-24 mx-auto  ">

        {/* <motion.div
          key="modal"
          initial={{ zoom: 0 }}
          animate={{ zoom: 1 }}
          exit={{ zoom: 0 }}
        > */}
          {/* <h1 class="font-['Abril'] italic font-bold text-4xl text-sky-500 pb-1 flex flex-col text-center w-full mb-1">Around the world</h1> */}
        {/* </motion.div> */}
          
          
          <div class=" bg-base-300 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-col text-center w-full mb-2">
              <h1 class="sm:text-2xl text-2xl font-medium title-font mb-0 text-zinc-400">Sign up for</h1>
              <h1 class="font-['Abril'] italic font-bold text-2xl text-cyan-700 pb-1 flex flex-col text-center w-full mb-1">Travelverse</h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-zinc-400">It's quick and easy.</p>
            </div>
            <div class="relative mb-4">
              <label for="username" class="leading-7 text-sm text-zinc-400">Name</label>
              <input type="name" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-zinc-400">Email</label>
              <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-zinc-400">Password</label>
              <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <button class="text-white bg-cyan-700 hover:bg-cyan-800 border-0 py-2 px-8 focus:outline-none rounded text-lg">Sign Up</button>

            {/* <Link class="text-s text-purple-400 hover:text-purple-500 mt-3 cursor-pointer m-auto" to="/">
              Back to login

            </Link> */}
          
          </div>
          
        </div>
      </div>

  )
}

export default Register