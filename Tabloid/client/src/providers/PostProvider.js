import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const GetAllPublishedPosts = () => {
    return fetch("https://localhost:44360/api/Post")
      .then((res) => res.json())
      .then(setPosts);
    
  };

  const getPostWithComments = (id) => {
    return fetch(`https://localhost:44360/GetPostIdWithComments/${id}`).then((res) => res.json());
};



  
  
  return (
    <PostContext.Provider value={{ posts, GetAllPublishedPosts, getPostWithComments}}>
      {props.children}
    </PostContext.Provider>
  );
};