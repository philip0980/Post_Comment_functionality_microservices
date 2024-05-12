import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/post`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = posts.map((post) => {
    return (
      <div
        key={post._id}
        style={{ border: "1px solid black", padding: "4px", margin: "8px" }}
      >
        {post.title}
        <CommentList postId={post._id} />
        <CommentCreate postId={post._id} />
      </div>
    );
  });
  return <div>{renderPost}</div>;
};

export default PostList;
