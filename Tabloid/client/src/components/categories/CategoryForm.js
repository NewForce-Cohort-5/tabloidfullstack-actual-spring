import React, { useContext, useState } from "react";
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
    const [category, setCategory] = useState("");
    const { addCategory, getAllCategories } = useContext(CategoryContext);
    
    const navigate = useNavigate();

    useEffect(() => {
      getAllCategories()
  }, [])
    
    const handleControlledInputChange = (event) => {
      const newCategory = {...category}
      newCategory[event.target.id] = event.target.value
      setCategory(newCategory)
  }

  const SaveCategory = (event) => {
    event.preventDefault()
    addCategory(category)
    .then(navigate("/Category"))
}

      return (
        <div className="container pt-4">
          <div className="row justify-content-center">
            <Card className="col-sm-12 col-lg-6">
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Category Name</Label>
                    <Input className="form-control" type="text" id="name" onChange={handleControlledInputChange} />
                  </FormGroup>
                </Form>
                <Button className="btn btn-primary" type="submit" onClick={SaveCategory}>Save New Category</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      );
}