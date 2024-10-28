import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { commentOnPost, createPost,deletePost,getAllPosts,getPostById,LikePost,updatePost } from "../controllers/postControllers.js";

const postRoute = express.Router();

postRoute.post('/create-post', authenticate, upload.single('image'), createPost)
postRoute.post('/update-post/:id', authenticate, upload.single('image'), updatePost)
postRoute.get('/get-all-posts', getAllPosts);
postRoute.get('/like-post/:id', authenticate, LikePost);
postRoute.post('/comment-post/:id', authenticate, commentOnPost)
postRoute.get('/get-postById/:id', authenticate, getPostById);
postRoute.delete('/delete-post/:id', authenticate, deletePost );


export default postRoute;