import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";



// @desc    Get user data
// @route   GET user/:id
// @access  Private
export const getUser = async (req, res) => {
  const id = req.params.id;
  

  try {
    const user = await UserModel.findById(id);
    console.log(user)

    if (user) {
      const { password, ...otherDetails } = user._doc;
      

      res.status(200).json(otherDetails);

    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
    
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  // const { currentUserId, currentUserAdminStatus, password } = req.body;

  console.log(req.body)

  
  const user = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(user);
  // console.log(user)

  // if (id === currentUserId || currentUserAdminStatus) {

  //   console.log(currentUserId)
  //   console.log(id)
  //   console.log(currentUserAdminStatus)

  //   try {
  //     // if (password) {
  //     //   const salt = await bcrypt.genSalt(10);
  //     //   req.body.password = await bcrypt.hash(password, salt);
  //     // }

  //     const user = await UserModel.findByIdAndUpdate(id, req.body, {
  //       new: true,
  //     });

  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // } else {
  //   res.status(403).json("Access Denied! you can only update your own profile");
  // }


};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;
  console.log(req.body)

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      // res.status(200).json("User deleted successfully");
      res.status(200).json(id);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
    console.log(currentUserId)
    console.log(id)
    console.log(currentUserAdminStatus)
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id; // user you want to follow

  const { currentUserId } = req.body;  // current user

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);  // user you want to follow
      const followingUser = await UserModel.findById(currentUserId); // current user

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });

        res.status(200).json(followUser);

      } else {
        res.status(403).json("User is already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);  // user you want to unfollow
      const followingUser = await UserModel.findById(currentUserId); // current user

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });

        res.status(200).json(followUser);
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// show notifications
export const showNotifications = async (req, res) => {
  
  if(req.body.userId){

    UserModel.findById(req.body.userId, (err, user) => {
      if(err){
        res.status(500).json(err);
      } else {
        let notifications = user.notifications;

        res.status(200).json(notifications);
      }
    })
    
  }else{
    res.status(500).json("No userId provided");
  }

   
}


// Dismiss notification
export const dismissNotifications = async (req, res) => {

  const id = req.params.id;
  
  if(id){

    UserModel.findById(id, (err, user) => {
      if(err){
        res.status(500).json(err);
      } else {
        let notifications = user.notifications;
        let blank = [];
        user.notifications = blank;
        user.save()

        res.status(200).json(notifications);
      }
    })

  }else{
    res.status(500).json("No userId provided");
  }

   
}