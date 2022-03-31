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

  const deleteComment = (commentId) => {
    return fetch(`https://localhost:44360/api/Comment/${commentId}`, {
        method: "DELETE"
    })
};

  return (
    <CommentContext.Provider value={{ comments, addComment, deleteComment }}>
      {props.children}
    </CommentContext.Provider>
  );
};