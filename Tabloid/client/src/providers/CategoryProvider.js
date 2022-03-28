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

  const editCategory = category => {
    return fetch(`https://localhost:44360/api/Category/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    }).then(getAllCategories)
  }

const getCategoryById = (id) => {
  return fetch (`https://localhost:44360/api/Category/${id}`)
  .then(res => res.json())
}

  const deleteCategory = (id) => {
    return fetch(`https://localhost:44360/api/category/${id}`, {
        method: "DELETE"
    })
        .then(getAllCategories)
}

  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, editCategory, getCategoryById, deleteCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};