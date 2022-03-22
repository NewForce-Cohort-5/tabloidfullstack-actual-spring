import React, { useContext, useEffect, useState} from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import  Category from "./CategoryCard"

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

return (

<div className="container">

    <div className="categories">
    {categories.map((singleCategoryInLoop) => (
        <Category key={singleCategoryInLoop.id} category={singleCategoryInLoop} />
    ))}

    </div>
</div>




)



}

