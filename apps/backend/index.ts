import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/api/hello", (req, res) => {
	res.json({ message: "Hello from Express!" });
});

app.listen(port, () => {
	console.log(`Backend listening at http://localhost:${port}`);
});
