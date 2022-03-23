import React from "react";
import { Card,CardBody, Button } from "reactstrap";


const Tag = ({ tagProp }) => {
    debugger
    console.log(tagProp)
  return (
    <Card className="m-4">
         <CardBody>
      <p className="text-left px-2"><strong>Tag Name: </strong></p>
      <p>{tagProp.name}</p>
      
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
  );
};

export default Tag;