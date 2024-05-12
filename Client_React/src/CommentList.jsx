import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/post/${postId}/comment`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const renderComments = comments.map((comment) => (
    <li key={comment._id}>{comment.content}</li>
  ));

  return <ul>{renderComments}</ul>;
};

export default CommentList;
