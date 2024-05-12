import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { randomBytes } from "crypto";

const app = express();
dotenv.config();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Define Comment schema
const commentSchema = new mongoose.Schema({
  postId: String,
  commentId: String,
  content: String,
});

// Define Comment model
const Comment = mongoose.model("Comment", commentSchema);

app.get("/post/:id/comment", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/post/:id/comment", async (req, res) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { comment } = req.body;

    const newComment = new Comment({
      postId: req.params.id,
      commentId,
      content: comment,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
