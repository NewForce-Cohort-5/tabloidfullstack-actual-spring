import React, { useState, createContext } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return fetch("https://localhost:44360/api/Tag")
      .then((res) => res.json())
      .then(setTags);
    
  };

  const addTag = (tag) => {
    return fetch("https://localhost:44360/api/Tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag)
   
    }).then(getAllTags);
  
  };  


  const deleteTag = tagId => {
    return fetch(`https://localhost:44360/api/Tag/${tagId}`, {
        method: "DELETE"
    })
        .then(getAllTags)
}
  
  return (
    <TagContext.Provider value={{ tags, getAllTags, addTag, deleteTag}}>
      {props.children}
    </TagContext.Provider>
  );
};