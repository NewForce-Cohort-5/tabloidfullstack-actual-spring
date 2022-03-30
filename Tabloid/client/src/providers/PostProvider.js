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
  const getPostWithComments = (id) => {
    return fetch(`https://localhost:44360/GetPostIdWithComments/${id}`).then((res) => res.json());
};

const addTagToPost = (tag) => {
  return fetch("https://localhost:44360/api/Post/AddTagToPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag)
 
  }).then(GetAllPublishedPosts);

};  

 
  return (
    <PostContext.Provider value={{ posts, GetAllPublishedPosts, getPostWithComments, GetPostsById}}>
      {props.children}
    </PostContext.Provider>
  );
};