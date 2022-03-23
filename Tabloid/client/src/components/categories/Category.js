import React from "react";
import { Card,CardBody, Button } from "reactstrap";


export const Category = ({category}) => {
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
    outline
  >
    Delete
  </Button>

  </CardBody>
  </Card>
  )
};

