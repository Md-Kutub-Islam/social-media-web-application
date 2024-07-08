import express from 'express'
import { deletePost, getFeedposts, getUserPosts, likePost } from "../controllers/posts.js"
import  {verifyToken}  from '../middleware/auth.js'

const router = express.Router()

// Read verifyToken,verifyToken,verifyToken,
router.get("/", getFeedposts) // feed route
router.get("/:userId/posts",  getUserPosts)

// Update 
router.patch("/:id/like", likePost)

// delete Post 
router.delete("/:id/delete", deletePost)

export default router