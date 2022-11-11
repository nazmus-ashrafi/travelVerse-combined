import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import randomstring from "randomstring";
import nodemailer from "nodemailer";



let transporter = nodemailer.createTransport({
  service: "gmail",
    auth: {
        user: "nazmus.s.ashrafi@gmail.com",
        pass: "qcbgjnhwgajndttd",
    },
  });


// Registering a new user
export const registerUser = async (req, res) => {
  const { email, username, password, firstname, lastname, shopname, isShop, shopnumber } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    email,
    username,
    password: hashedPass,
    firstname,
    lastname,
    shopname,
    isShop,
    shopnumber,
  });

  

  try {

    if (!username || !firstname || !lastname || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }

    const oldUser = await UserModel.findOne({ username });

    if (oldUser){
      // return res.status(400).json({ message: "User already exists" });
      res.status(400)
      throw new Error('User already exists')
    }

    
    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "30d" }
    );
    res.status(200).json({ user, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// Login user
export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
          const validity = await bcrypt.compare(password, user.password)


          if (!validity) {
            // res.status(400).json("Wrong password");

            res.status(400)
            throw new Error('Wrong password')


          } else {
            const token = jwt.sign(
              { username: user.username, id: user._id },
              process.env.JWTKEY,
              { expiresIn: "30d" }
            );
            res.status(200).json({ user, token });
          }
        }
        else{
            // res.status(404).json("User does not exist")

            res.status(404)
            throw new Error('User does not exist')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      // return res.status(404).json({ message: "User does not exist" });
      res.status(404)
      throw new Error('Email does not exist')
    }

      const token = randomstring.generate();
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;


      user.save().then((result)=>{
                 transporter.sendMail({
                     to:user.email,
                     from:"no-reply@travelverse.com",
                     subject:"password reset",
                     html:`
                     <p>You requested for password reset. Below link is valid for an hour.</p>
                     <h5>Click in this <a href="${process.env.SITE_URL}/reset/${token}">link</a> to reset password.</h5>
                     `
                 })
                //  res.json({message:"check your email"})
             })
      

    

    // send email with token
    console.log(email + " - authcontroller")

    res.status(200).json({ message: "Email sent" });
    


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Reset password
export const resetPassword = async (req, res) => {

    const newPassword = req.body.password
    const sentToken = req.body.token

    const salt = await bcrypt.genSalt(10);

    UserModel.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            // return res.status(422).json({error:"Try again session expired"})
            return res.status(422).json({message:"Try submitting email again, session expired"})
        }


        bcrypt.hash(newPassword,salt).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"Password updated successfully"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })

}