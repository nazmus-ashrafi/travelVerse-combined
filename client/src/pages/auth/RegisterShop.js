
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import Spinner from "../../components/Spinner";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import { getUser } from '../../features/user/userSlice'

import { useFormik } from "formik";
import { registerShopSchema } from "../../formSchemas";


const RegisterShop = () => {


  const onSubmit = (values,actions) => {

    // console.log(values)
    dispatch(register(values))
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
      firstname: "",
      lastname: "",
      username: "",
      shopname: "",
      shopnumber: "",
      email: "",
      password: "",
      confirmpass: "",
      isShop: true,
    },
    validationSchema: registerShopSchema,
    onSubmit,
    
  })

  //

  // const initialState = {
  //   firstname: "",
  //   lastname: "",
  //   username: "",
  //   password: "",
  //   confirmpass: "",
  // };

  // const [data, setData] = useState(initialState);
  // const [confirmPass, setConfirmPass] = useState(true);


  // redux
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )


  // Handle change in input
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  // Form submission
  // const handleSubmit = (e) => {

  //   setConfirmPass(true);
  //   e.preventDefault();

  //   if(data.password !== data.confirmpass){
  //     setConfirmPass(false);

  //   }else{
  //     dispatch(register(data))
      
  //   }
    
  // };


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      // window.location.reload();
      navigate('/')
      console.log(user)
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
              <h1 class="sm:text-2xl text-2xl font-medium title-font mb-0 text-zinc-400">Sign up for a shop in</h1>
              <h1 class="font-['Abril'] italic font-bold text-2xl text-cyan-700 pb-1 flex flex-col text-center w-full mb-1">Travelverse</h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-zinc-400">It's quick and easy.</p>
            </div>

            <div class="relative mb-4">
              <label for="username" class="leading-7 text-sm text-zinc-400">Shop name</label>

              <input type="name" id="shopname" name="shopname" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.shopname ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.shopname} onBlur={handleBlur} />


              {errors.shopname && touched.shopname && <p className="text-orange-700 error">{errors.shopname}</p>}
            </div>

            <div class="relative mb-4">
              <label for="username" class="leading-7 text-sm text-zinc-400">Shop registration licence</label>

              <input type="name" id="shopnumber" name="shopnumber" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.shopnumber ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.shopnumber} onBlur={handleBlur} />


              {errors.shopnumber && touched.shopnumber && <p className="text-orange-700 error">{errors.shopnumber}</p>}
            </div>

            <div class="relative mb-4">
              <label for="username" class="leading-7 text-sm text-zinc-400">Manager's first name</label>

              <input type="name" id="firstname" name="firstname" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.firstname ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.firstname} onBlur={handleBlur} />


              {errors.firstname && touched.firstname && <p className="text-orange-700 error">{errors.firstname}</p>}
            </div>

            <div class="relative mb-4">
              <label for="username" class="leading-7 text-sm text-zinc-400">Manager's last name</label>
              <input type="name" id="lastname" name="lastname" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.lastname ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.lastname} onBlur={handleBlur} />


              {errors.lastname && touched.lastname && <p className="text-orange-700 error">{errors.lastname}</p>}
            </div>

            <div class="relative mb-4">
              <label for="username" class="leading-7 text-sm text-zinc-400">Username</label>
              <input type="name" id="username" name="username" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.username ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.username} onBlur={handleBlur} />


              {errors.username && touched.username && <p className="text-orange-700 error">{errors.username}</p>}
            </div>

            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-zinc-400">Email</label>
              <input type="email" id="email" name="email" class={`w-full bg-white rounded border border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${errors.email ?'input-error focus:border-red-700 focus:ring-red-400  ':""}`} onChange={handleChange} value={values.email} onBlur={handleBlur} />


              {errors.email && touched.email && <p className="text-orange-700 error">{errors.email}</p>}
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

            {/* <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
            >
              *Confirm password is not same
            </span> */}


            <button class="text-white bg-cyan-700 hover:bg-cyan-800 border-0 py-2 px-8 focus:outline-none rounded text-lg mt-5" type="submit">Sign Up</button>

            <Link class="text-s text-cyan-700 hover:text-cyan-800 mt-3 cursor-pointer m-auto" to="/login">
              Back to login

            </Link> 
            
          
          </div>
          
        </form>
      </div>

  )
}

export default RegisterShop