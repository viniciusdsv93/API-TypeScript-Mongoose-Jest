import express from "express";
import PostsController from "../controllers/posts.controller";

const postsRoute = express.Router();

postsRoute.get("/", PostsController.getPosts);
postsRoute.post("/", PostsController.savePost);
postsRoute.get("/:post_id", PostsController.getPostById);
postsRoute.put("/:post_id", PostsController.updatePostById);
postsRoute.delete("/:post_id", PostsController.deletePostById);

export default postsRoute;
