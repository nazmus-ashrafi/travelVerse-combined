import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Invalid password" })
    .required("Required"),
  
});


export const registerSchema = yup.object().shape({
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  username: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password. 1 upper case letter, 1 lower case letter, 1 numeric digit" })
    .required("Required"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const registerShopSchema = yup.object().shape({
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  username: yup.string().required("Required"),
  shopname: yup.string().required("Required"),
  shopnumber: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password. 1 upper case letter, 1 lower case letter, 1 numeric digit" })
    .required("Required"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});


export const forgetPasswordSchema = yup.object().shape({
  
  email: yup.string().email("Please enter a valid email").required("Required"),
  
});

export const passwordResetSchema = yup.object().shape({
  
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Invalid password" })
    .required("Required"),
  confirmpass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});