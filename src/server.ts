import express from "express";
import cors from "cors";
import postsRoute from "./routes/posts.route";
import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

class App {
	private express: express.Application;
	private PORT = process.env.PORT || 3333;

	constructor() {
		this.dbConnect()
			.then(() => {
				this.express = express();
				this.middlewares();
				this.routes();
				this.listen();
			})
			.catch((err) => console.log("Err", err));
	}

	private async dbConnect() {
		return await mongoose.connect(MONGO_URL);
	}

	private middlewares() {
		this.express.use(express.json());
		this.express.use(cors());
	}

	private routes() {
		this.express.use(postsRoute);
	}

	private listen() {
		this.express.listen(this.PORT, () =>
			console.log(`Server running on port ${this.PORT}`)
		);
	}
}

export default App;
