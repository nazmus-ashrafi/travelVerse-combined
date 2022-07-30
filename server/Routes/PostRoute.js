import express from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, getUserPosts} from "../Controllers/PostController.js";
const router = express.Router()
import multer from 'multer'

// const upload = multer({ dest: "public/images" });

// boiler
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
//



router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)
router.get("/:id/posts", getUserPosts)



export default router;