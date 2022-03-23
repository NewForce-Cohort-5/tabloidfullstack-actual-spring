import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {

  const [categories, setCategories] = useState([]);
  

  const getAllCategories = () => {
    return fetch("https://localhost:44360/api/Category")
      .then((res) => res.json())
      .then(setCategories);
  };

  const addCategory = (category) => {
    return fetch("https://localhost:44360/api/Category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getAllCategories);
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
    .then(getAllCategories);
  };

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, editCategory, deleteCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};