import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/posts.schema";

class PostsController {
	public getPosts(request: Request, response: Response, next: NextFunction) {
		Post.find()
			.exec()
			.then((results) => {
				return response.status(200).json({ posts: results });
			})
			.catch((err) => {
				console.log("Err", err);
				return response
					.status(500)
					.json({ message: "Internal server error", err });
			});
	}

	public getPostById(request: Request, response: Response, next: NextFunction) {
		const post_id = request.params.post_id;

		if (!mongoose.Types.ObjectId.isValid(post_id))
			return response.status(400).json({ message: "Invalid id" });

		return Post.findById(post_id).then((post) =>
			post
				? response.status(200).json(post)
				: response.status(404).json({ message: "Not found" })
		);
	}

	public savePost(request: Request, response: Response, next: NextFunction) {
		const { title, author } = request.body;

		if (!title) {
			return response.status(400).json({ ok: false, message: "title is required" });
		}

		if (!author) {
			return response
				.status(400)
				.json({ ok: false, message: "author is required" });
		}

		const newPost = new Post({
			_id: new mongoose.Types.ObjectId(),
			title,
			author,
		});

		return newPost
			.save()
			.then((post) => response.status(201).json(post))
			.catch((err) => response.status(500).json(err));
	}

	public deletePostById(request: Request, response: Response, next: NextFunction) {
		const post_id = request.params.post_id;

		if (!mongoose.Types.ObjectId.isValid(post_id))
			return response.status(400).json({ message: "Invalid id" });

		return Post.findByIdAndDelete(post_id).then((post) =>
			post
				? response.status(200).json({
						message: `Object with id ${post_id} successfully deleted`,
				  })
				: response.status(404).json({ message: "Not found" })
		);
	}

	public updatePostById(request: Request, response: Response, next: NextFunction) {
		const post_id = request.params.post_id;

		if (!mongoose.Types.ObjectId.isValid(post_id))
			return response.status(400).json({ message: "Invalid id" });

		return Post.findById(post_id).then((post) => {
			if (post) {
				post.set(request.body);

				return post
					.save()
					.then((post) => response.status(201).json(post))
					.catch((err) =>
						response
							.status(500)
							.json({ message: "Could not update the post" })
					);
			}
			response.status(404).json({ message: "Not found" });
		});
	}
}

export default new PostsController();
