import React, { useContext, useEffect} from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Header from "../Header";
import  {Category} from "./Category"

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

return (

<div className="container">

    <div className="category-titles"><strong>Categories</strong></div>
    <br></br>
    <div className="categories">
    {categories.map((singleCategoryInLoop) => (
        <Category key={singleCategoryInLoop.id} category={singleCategoryInLoop} />
    ))}

    </div>
</div>




)



}

