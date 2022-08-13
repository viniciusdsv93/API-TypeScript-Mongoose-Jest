import { Document } from "mongoose";

export interface IPost {
	title: string;
	author: string;
}

export interface IPostModel extends IPost, Document {}
