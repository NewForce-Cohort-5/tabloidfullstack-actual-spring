import React, { useState, createContext } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return fetch("https://localhost:44360/api/Tag")
      .then((res) => res.json())
      .then(setTags);
    
  };

  const addTag = (post) => {
    return fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
   
    }).then(getAllTags);
  
  };
  


  
  return (
    <TagContext.Provider value={{ tags, getAllTags, addTag }}>
      {props.children}
    </TagContext.Provider>
  );
};