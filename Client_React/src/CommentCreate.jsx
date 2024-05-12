import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8001/post/${postId}/comment`, {
        comment: content,
      });
      setContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <label>New Comment</label>
      <input
        value={content}
        type="text"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CommentCreate;
