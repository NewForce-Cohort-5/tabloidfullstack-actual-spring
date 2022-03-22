import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider"
import Category from "./Category";

export const CategoryList = () => {
  const { category, getAllCategory } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategory();
  }, []);

  const user = JSON.parse(localStorage.getItem("tabloidUser"))
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {category.filter(p => p.userProfileId === user.id).map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

