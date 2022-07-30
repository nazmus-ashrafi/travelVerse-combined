import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new user
export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashedPass,
    firstname,
    lastname,
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