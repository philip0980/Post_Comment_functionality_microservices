import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8000/post`, { title: title });
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Create Post</h1>
      <label>TItle</label>
      <input
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default PostCreate;
