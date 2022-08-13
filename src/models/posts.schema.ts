import mongoose, { Schema } from "mongoose";
import { IPostModel } from "../interfaces/posts.interface";

const postsSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IPostModel>("Post", postsSchema);
