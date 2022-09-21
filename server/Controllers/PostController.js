import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import CommentModel from "../Models/commentModel.js";
import mongoose from "mongoose";

// import asyncHandler from "express-async-handler"

import express from 'express'
const router = express.Router()
import multer from 'multer'



// Create new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);


  try {

    // notify if post is a shared post
    if(req.body.isSharedPost){
      
      try {
        const originalPoster = await UserModel.findById(req.body.originalPostId)
        const currentUser = await UserModel.findById(req.body.userId);

        originalPoster.notifications.push({
          "message" :currentUser.username +" shared a post you made: "+ req.body.sharedPostTitle,"currentUserUsername":currentUser.username,
          "postDescription": req.body.sharedPostTitle,
          "interaction":" shared the post: ",
          "currentUserId":currentUser._id
        })

        originalPoster.save()
        
      } catch (error) {
        console.log(error)
        
      }

    }
    //
    

    await newPost.save();
    

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
}; 

// Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body }, { timestamps: false })

      // const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      //   new: true,
      // })
    
      res.status(200).json(req.body);
      
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  // const { userId } = req.body;

  // console.log(userId)

  try {
    const post = await PostModel.findById(id);
    
    // if (post.userId === userId) {
    //   await post.deleteOne();
    //   res.status(200).json("Post deleted successfully");
    // } else {
    //   res.status(403).json("Action forbidden");
    // }

      await post.deleteOne();
      // res.status(200).json("Post deleted successfully");
      res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } }, { timestamps: false });

      // notify
      try {
        const originalPoster = await UserModel.findById(post.userId)
        const currentUser = await UserModel.findById(userId);

        originalPoster.notifications.push({
          "message" :currentUser.username +" likes a post you made: "+ post.title,"currentUserUsername":currentUser.username,
          "postDescription":post.title,
          "interaction":" liked the post: ",
          "currentUserId":currentUser._id
        })

        originalPoster.save()
        
      } catch (error) {
        console.log(error)
        
      }
      //

      res.status(200).json(post);
    } else {
      await post.updateOne({ $pull: { likes: userId } }, { timestamps: false });

      // notify
      try {
        const originalPoster = await UserModel.findById(post.userId)
        const currentUser = await UserModel.findById(userId);

      // originalPoster.notifications.pull(currentUser.username +" likes a post you made: "+ post.description)

      originalPoster.notifications.push({
        "message" :currentUser.username +" likes a post you made: "+ post.title,"currentUserUsername":currentUser.username,
        "postDescription":post.title,
        "interaction":" unliked the post: ",
        "currentUserId":currentUser._id
      })

      originalPoster.save()

      
        
      } catch (error) {
        console.log(error)
        
      }
      
      
      //
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
// export const getTimelinePosts = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const currentUserPosts = await PostModel.find({ userId: userId });
//     const followingPosts = await UserModel.aggregate([
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "following",
//           foreignField: "userId",
//           as: "followingPosts",
//         },
//       },
//       {
//         $project: {
//           followingPosts: 1,
//           _id: 0,
//         },
//       },
//     ]);

//     res
//       .status(200)
//       .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
//       .sort((a,b)=>{
//           return b.createdAt - a.createdAt;
//       })
//       );
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// @desc    Get all timeline posts
// @route   GET /:id/timeline
// @access  
export const getTimelinePosts = async(req,res) =>{
    try {

    const userId = req.params.id;
    const currentUser = await UserModel.findById(userId);
    const userPosts = await PostModel.find({ userId: userId });

    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return PostModel.find({ userId : friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts).sort((a,b)=>{
          return b.createdAt - a.createdAt;
      }))

    } catch (err) {
        res.status(500)
        throw new Error(err)
    }

}



// Get all posts by current user
export const getUserPosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    res.status(200).json(currentUserPosts);
    
  } catch (error) {
    res.status(500).json(error);
  }
};


// @desc    Add comment to post
// @route   POST /:postid/addcomment
// @access  Private
export const addComment = async (req, res, next) => {

  const user = await UserModel.findById(req.body.userId);
  const newComment = new CommentModel({ desc: req.body.desc, user: req.body.userId, postId: req.params.postid });

  try {

    const savedComment = await newComment.save();
    const post = await PostModel.findById(req.params.postid);
    
  
    
    await post.updateOne({ $push: { 
      comments: savedComment
                
    } }, { timestamps: false });

    //notify
    try {
        const originalPoster = await UserModel.findById(post.userId)
        const currentUser = await UserModel.findById(req.body.userId);

      originalPoster.notifications.push(
      {
        "message" :currentUser.username +" commented on a post you made: "+ post.title,
        "currentUserUsername":currentUser.username,
        "postDescription":post.title,
        "interaction":" commented on the post: ",
        "currentUserId":currentUser._id
      })

      originalPoster.save()

    
        
      } catch (error) {
        console.log(error)
        
      }
          

    res.status(200).send(savedComment);

  } catch (err) {
    next(err);
  }
};

// @desc    Delete comment
// @route   PUT /:commentid/deletecomment
// @access  Private
export const deleteComment = async (req, res, next) => {

  const userCommenter = await UserModel.findById(req.body.commenterId);
  const post = await PostModel.findById(req.body.postId);
  const commentId = req.params.commentid;
  

  try {

    const comment = await CommentModel.findById(commentId);
    // console.log((comment.user).toString())
    // console.log((userCommenter._id).toString())

    if ((comment.user).toString() === (userCommenter._id).toString()) {

      await comment.deleteOne();

      // console.log(comment)
      // console.log(userCommenter)


      await post.updateOne({ $pull: { 
        comments: comment 

                
      }}, { timestamps: false });

      console.log(comment)
      res.status(200).json(comment);
    } else {
      res.status(403).json("Action forbidden");
    }

  } catch (error) {
    res.status(500).json(error);
  }
};





// -------------------------------- Functionality which will not change redux state -----
// -------------------------------- To be called directly from the component  --------------------

// @desc    Get any user data
// @route   GET post/:id/getanyuser
// @access  
export const getAnyUser = async (req, res) => {
  const id = req.params.userid;
  

  try {
    const user = await UserModel.findById(id);
    // console.log(user)

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


// @desc    Get any post data
// @route   GET post/:id/getanypost
// @access  
export const getAnyPost = async (req, res) => {
  const id = req.params.postid;
  

  try {
    const post = await PostModel.findById(id);
    // console.log(user)

    if (post) {
      
      res.status(200).json(post);

    } else {
      res.status(404).json("No such post exists");
    }
  } catch (error) {
    res.status(500).json(error);
    
  }
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------



// @desc    Get all users except current user and current user's follows
// @route   GET post/:userid/getallnotfollowedusers
// @access  
export const getAllNotFollowedUsers = async (req, res) => {

  // console.log("get all users")
  const userId = req.params.userid;
  const currentUser = await UserModel.findById(userId);

  try {
    const users = await UserModel.find();
    
    
    // console.log(users.findIndex(user => user._id.toString() === currentUser._id.toString()))
    // exclude current user
    users.splice(users.findIndex(user => user._id.toString() === currentUser._id.toString()), 1) 

    // exclude followers of current user
    currentUser.following.forEach(friendId => {
      users.splice(users.findIndex(user => user._id.toString() === friendId.toString()), 1)
    })

    // exclude admin
    users.splice(users.findIndex(user => user.isAdmin === true), 1)
  
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


// @desc    Get all users except current user 
// @route   GET post/:userid/getallusers
// @access  
export const getAllUsers = async (req, res) => {

  // console.log("get all users")
  const userId = req.params.userid;
  const currentUser = await UserModel.findById(userId);

  try {
    const users = await UserModel.find();
    
    
    // console.log(users.findIndex(user => user._id.toString() === currentUser._id.toString()))
    // exclude current user
    users.splice(users.findIndex(user => user._id.toString() === currentUser._id.toString()), 1) 

    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


// @desc    Get all posts
// @route   GET post/:userid/getallusers
// @access  
export const getAllPosts = async (req, res) => {

  // console.log("get all users")
  const userId = req.params.userid;
  const currentUser = await UserModel.findById(userId);

  try {
    const posts = await PostModel.find(); 

    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};