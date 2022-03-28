import React, { useState, createContext } from "react";

export const CommentContext = createContext();

export const CommentProvider = (props) => {

  const [comments, setComment] = useState([]);
  


  const addComment = (comment) => {
    return fetch("https://localhost:44360/api/Comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
  };

  return (
    <CommentContext.Provider value={{ comments, addComment }}>
      {props.children}
    </CommentContext.Provider>
  );
};