import React, { useContext, useEffect} from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Header from "../Header";
import  {Category} from "./Category"
import { useNavigate } from "react-router-dom";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";

export const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

useEffect(() => {
    getAllCategories();
}, []);

const navigate = useNavigate();

return (

<div className="container">

    <Button id="addCategory" onClick={() => {
        navigate("/category/add")
    }}>Add new category</Button>

    <div className="categories">
    {categories.map((singleCategoryInLoop) => (
        <Category key={singleCategoryInLoop.id} category={singleCategoryInLoop} />
    ))}

    </div>
</div>




)



}

