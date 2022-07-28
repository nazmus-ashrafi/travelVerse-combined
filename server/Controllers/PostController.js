import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

// import asyncHandler from "express-async-handler"

import express from 'express'
const router = express.Router()
import multer from 'multer'



// Create new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  // if (!req.body.title) {
  //       // res.status(400)
  //       // throw new Error('Please add a title')
        
  //   } else if (!req.body.description) {
  //       res.status(400)
  //       throw new Error('Please add a description')
  //   }else if (!req.body.latitude) {
  //       res.status(400)
  //       throw new Error('Please add a latitude')
  //   }else if (!req.body.longitude) {
  //       res.status(400)
  //       throw new Error('Please add a longitude')
  //   }

  try {
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
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
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
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
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

      originalPoster.notifications.push({"message" :currentUser.username +" likes a post you made: "+ post.description,"currentUserUsername":currentUser.username,"postDescription":post.description,"interaction":" liked the post: ","currentUserId":currentUser._id})

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

      originalPoster.notifications.push({"message" :currentUser.username +" likes a post you made: "+ post.description,"currentUserUsername":currentUser.username,"postDescription":post.description,"interaction":" unliked the post: ","currentUserId":currentUser._id})

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
// @route   GET /id/timeline
// @access  Private
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

