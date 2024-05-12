import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div>
      <PostCreate />
      <h1>Create Comment</h1>
      <PostList />
    </div>
  );
};

export default App;
