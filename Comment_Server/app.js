import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Schema for comment

const schema = mongoose.Schema({
  comment: {
    type: String,
  },
});

const Comment = mongoose.model("comment", schema);

app.get("/comment", async (req, res) => {
  try {
    const comment = await Comment.find();
    res.json({ comment: comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/comment", async (req, res) => {
  const { comment } = req.body;
  const newComment = Comment({ comment });
  await newComment.save();
  res.status(201).json({ message: "Comment created", comment: newComment });
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
