import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [post, setPost] = useState([]);
  const [getComment, setGetComment] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/post")
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8001/comment")
      .then((response) => {
        setGetComment(response.data.comment);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/post", { title })
      .then(() => {
        console.log("Submitted successfully");
        setTitle("");
        axios
          .get("http://localhost:8000/post")
          .then((response) => {
            setPost(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const commentSubmit = (postId) => {
    axios
      .post("http://localhost:8001/comment", { postId, comment })
      .then(() => {
        console.log("Submitted successfully");
        setComment("");
        axios
          .get("http://localhost:8001/comment")
          .then((response) => {
            setGetComment(response.data.comment);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="post">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
      <h1>All Post</h1> <hr />
      {post.map((postdata) => (
        <div
          key={postdata._id}
          style={{ border: "1px solid black", padding: "10px 60px" }}
        >
          {postdata.title} <br />
          Add Comment <br />
          {getComment
            .filter((commentdata) => commentdata.postId === postdata._id)
            .map((commentdata) => (
              <li key={commentdata._id}>{commentdata.comment} </li>
            ))}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={() => commentSubmit(postdata._id)}>Submit</button>
        </div>
      ))}
    </>
  );
};

export default App;
