import React, { useContext, useState, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";
import {Category} from "./Category.js";

export const CategoryForm = () => {
  const { addCategory, getAllCategories } = useContext(CategoryContext);
    const [category, setCategory] = useState({
      name: "",
    });
    
    
    const navigate = useNavigate();

    useEffect(() => {
      getAllCategories()
  }, [])
    
    const handleControlledInputChange = (event) => {
      const newCategory = {...category}
      newCategory[event.target.id] = event.target.value
      setCategory(newCategory)
  }

  const handleSaveCategory = (event) => {
    event.preventDefault()
    addCategory(category)
    .then(navigate("/category"))
}

return(
  <form className="categoryForm">
      <fieldset>
          <div className="formGroup">
          <label htmlFor="name">Category Name:</label>
          <input type="text" id="name" onChange={handleControlledInputChange} className="form-control" value={category.name}/>
          </div>
     </fieldset>
                   
      <div className="form-group row col-sm-12 mx-auto mb-3">
              <div className="col-sm-12">
                  <button primary type="submit" className="btn btn-primary" onClick={handleSaveCategory}>
                      Save Category
                  </button>
                  <button outline onClick={() => navigate("/Category")}>
              Back to List
                  </button>
      </div>
      </div>
  </form>
)
}