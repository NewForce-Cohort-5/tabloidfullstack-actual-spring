import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {

  const [category, setCategory] = useState([]);
  

  const getAllCategory = () => {
    return fetch("https://localhost:44360/api/Category")
      .then((res) => res.json())
      .then(setCategory);
  };

  const addCategory = (category) => {
    return fetch("https://localhost:44360/api/Category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getAllCategory);
  };

  const editCategory = (category) => {
    return fetch(`/api/category/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    });
  };

  const deleteCategory = (categoryId) => {
    return fetch(`/api/post/${categoryId}`, { method: "DELETE" })
    .then(getAllCategory);
  };

  return (
    <CategoryContext.Provider value={{ category, getAllCategory, addCategory, editCategory, deleteCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};