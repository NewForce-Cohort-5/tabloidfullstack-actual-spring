import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  


  const getPostWithComments = (id) => {
    return fetch(`https://localhost:44360/GetPostIdWithComments/${id}`).then((res) => res.json());
};

return (
    <PostContext.Provider value={{ posts, getPostWithComments }}>
      {props.children}
    </PostContext.Provider>
  );
};