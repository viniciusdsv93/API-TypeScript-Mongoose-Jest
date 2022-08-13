const axios = require("axios");
const crypto = require("crypto");

function generate() {
	return crypto.randomBytes(10).toString("hex");
}

describe("posts operations", () => {
	it("should save a post", async () => {
		const data = { title: generate(), author: generate() };
		// console.log("response", data);
		const response = await axios.post("http://localhost:3333", data);
		expect(response.data).toHaveProperty("_id");
		await axios.delete(`http://localhost:3333/${response.data._id}`);
	});

	it("should get all posts", async () => {
		const post1 = await axios.post("http://localhost:3333", {
			title: generate(),
			author: generate(),
		});
		const post2 = await axios.post("http://localhost:3333", {
			title: generate(),
			author: generate(),
		});
		const post3 = await axios.post("http://localhost:3333", {
			title: generate(),
			author: generate(),
		});

		const response = await axios.get("http://localhost:3333");

		expect(response.data.posts).toHaveLength(3);

		await axios.delete(`http://localhost:3333/${post1.data._id}`);
		await axios.delete(`http://localhost:3333/${post2.data._id}`);
		await axios.delete(`http://localhost:3333/${post3.data._id}`);
	});

	it("should delete a post by id", async () => {
		const deleteSample = await axios.post("http://localhost:3333", {
			title: generate(),
			author: generate(),
		});

		await axios.delete(`http://localhost:3333/${deleteSample.data._id}`);

		const getAllResponse = await axios.get("http://localhost:3333");

		expect(getAllResponse.data.posts).toHaveLength(0);
	});

	it("should update a post by id", async () => {
		const updateSample = await axios.post("http://localhost:3333", {
			title: generate(),
			author: generate(),
		});

		await axios.put(`http://localhost:3333/${updateSample.data._id}`, {
			title: "modified title",
			author: "modified author",
		});

		const updateByIdResponse = await axios.get(
			`http://localhost:3333/${updateSample.data._id}`
		);

		// console.log("updateByIdResponse", updateByIdResponse);

		expect(updateByIdResponse.data.title).toBe("modified title");
		expect(updateByIdResponse.data.author).toBe("modified author");

		await axios.delete(`http://localhost:3333/${updateSample.data._id}`);
	});
});
