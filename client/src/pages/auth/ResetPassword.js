
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion"
import Spinner from "../../components/Spinner";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { reset, resetPassword} from '../../features/auth/authSlice'
import { getUser } from '../../features/user/userSlice'

import { useFormik } from "formik";
import { passwordResetSchema } from "../../formSchemas";


const ResetPassword = () => {


    const {token} = useParams()

    // console.log(token)


  const onSubmit = (values,actions) => {
    

    dispatch(resetPassword(values))

    actions.resetForm()
    
  };


  // Formik

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  }  = useFormik({
    initialValues: {
      
      password: "",
      confirmpass: "",
      token: token

    },
    validationSchema: passwordResetSchema,
    onSubmit,
    
  })

  


  // redux
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )


 

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      // window.location.reload();

      navigate('/')
      // console.log(user)

      toast.success(message)

    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  if (isLoading) {
    return <Spinner />
  }
  




  return (

      // <div class="text-gray-600 bg-base-100 body-font relative h-screen">
      <div class='window dark body-font flex h-screen' data-theme={process.env.REACT_APP_THEME}>

        <form class="container px-5 py-5 mx-auto infoForm authForm" onSubmit={handleSubmit} >

          
          
          
          <div class=" bg-base-300 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-col text-center w-full mb-2">
              {/* <h1 class="sm:text-2xl text-2xl font-medium title-font mb-0 text-zinc-400">Sign up for</h1> */}
              <h1 class="font-['Abril'] italic font-bold text-2xl text-cyan-700 pb-1 flex flex-col text-center w-full mb-1">Travelverse</h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-zinc-400">Reset your password</p>
            </div>

            

            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-zinc-400">Password</label>
              <input type="password" id="password" name="password" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.password ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.password} onBlur={handleBlur} />


              {errors.password && touched.password && <p className="text-orange-700 error">{errors.password}</p>}
            </div>

            <div class="relative mb-4">
              <label for="confirmpassword" class="leading-7 text-sm text-zinc-400">Confirm password</label>
              <input type="password" id="confirmpass" name="confirmpass" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.confirmpass ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.confirmpass} onBlur={handleBlur} />


              {errors.confirmpass && touched.confirmpass && <p className="text-orange-700 error">{errors.confirmpass}</p>}
            </div>

            


            <button class="text-white bg-cyan-700 hover:bg-cyan-800 border-0 py-2 px-8 focus:outline-none rounded text-lg mt-5" type="submit">Submit</button>

            <Link class="text-s text-cyan-700 hover:text-cyan-800 mt-3 cursor-pointer m-auto" to="/login">
              Back to login

            </Link> 
            
          
          </div>
          
        </form>
      </div>

  )
}

export default ResetPassword