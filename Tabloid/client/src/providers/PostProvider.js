import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const GetAllPublishedPosts = () => {
    return fetch("https://localhost:44360/api/Post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const GetPostsById = (id) => {
    return fetch(`https://localhost:44360/api/Post/${id}`)
      .then((res) => res.json())
  };

  

 
  return (
    <PostContext.Provider value={{ posts, GetAllPublishedPosts, GetPostsById}}>
      {props.children}
    </PostContext.Provider>
  );
};