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
import { useNavigate, useParams } from "react-router-dom";
import {Category} from "./Category.js";

export const CategoryForm = () => {
  const { addCategory, getAllCategories, editCategory, getCategoryById } = useContext(CategoryContext);
    const [category, setCategory] = useState({
      name: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const {categoryId} = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
      getAllCategories().then(() => {
          if (categoryId) {
              getCategoryById(categoryId)
              .then(category => {
                  setCategory(category)
                  setIsLoading(false)
              })
          } else {
              setIsLoading(false)
          }
      })

    
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