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


export const CategoryForm = () => {
  const { addCategory, editCategory, getCategoryById } = useContext(CategoryContext);
  
    const [category, setCategory] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const {categoryId} = useParams();
    
    const navigate = useNavigate();

    useEffect(()=> {
        if(categoryId){
          debugger
            getCategoryById(categoryId)
            .then(category => {
              setCategory(category)
              setIsLoading(false)
            })
          } else {
            setIsLoading (false)
          }}, [])

    
    const handleControlledInputChange = (event) => {
      const newCategory = {...category}
      newCategory[event.target.id] = event.target.value
      setCategory(newCategory)
  }

  const handleSaveCategory = (event) => {
      

    if(category.name === "" )
    {
        alert("Please enter a valid category name.")
    } else {
        setIsLoading(true);
        if (categoryId){
         debugger
            editCategory({
                id: category.id,
                name: category.name
            })
            .then(()=> navigate("/Category"))
        } else {
          debugger
        addCategory({
            name: category.name
        })
        .then(navigate("/Category"));
        }
    }
}

return (
  <form className="categoryForm">
      <fieldset>
          <div className="formGroup">
          <label htmlFor="name">Category Name:</label>
          <input type="text" id="name" onChange={handleControlledInputChange} className="form-control" value={category.name}/>
          </div>
     </fieldset>
                   
      <div className="form-group row col-sm-12 mx-auto mb-3">
              <div className="col-sm-12">
                        <Button primary 
                              disabled={isLoading} 
                              type="submit" className="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                 handleSaveCategory()}}>
                              {categoryId ? <>Save Category</> : <>Add Category</>}
                        </Button>
                  <Button outline onClick={() => navigate("/Category")}>
              Back to List
                  </Button>
      </div>
      </div>
  </form>
  )
}