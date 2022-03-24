import React, { useContext, useState } from "react";
import { Card,CardBody, Button } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";

export const Category = ({}) => {
  const {deleteCategory} = useContext(CategoryContext)
  const [category, setCategory] = useState({})

  const navigate = useNavigate();

  const categoryDelete = () => {
    deleteCategory(category.id)
        .then(() => {
            navigate("/category")
        })
}

  return (
    <Card className="m-4">
    <CardBody>
 <p className="text-left px-2"><strong>Category Name: </strong></p>
 <p>{category.name}</p>
  <Button outline>
    Edit
  </Button>
  {' '}   
  <Button
    color="danger"
    outline onClick={categoryDelete}
  >
    Delete
  </Button>

  </CardBody>
  </Card>
  )
};

