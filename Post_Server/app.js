import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const port = process.env.PORT;

// creating schema

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Title = mongoose.model("title", schema);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/post", async (req, res) => {
  const title = await Title.find();
  res.json(title);
});
app.post("/post", async (req, res) => {
  try {
    const { title } = req.body;
    const newTitle = new Title({ title });
    await newTitle.save();
    res.status(201).json({ message: "Title created", data: newTitle });
  } catch (error) {
    console.log(error);
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
  .catch((err) => {
    console.log(err);
  });
