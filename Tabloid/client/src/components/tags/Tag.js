import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Card,CardBody, Button } from "reactstrap";
import { TagProvider } from "../../providers/TagProvider";


const Tag = ({ tagProp }) => {
  
  const { deleteTag, getAllTags } = useContext(TagProvider)


  const handleUserTagDelete = () => {
    console.log("deleteIdeaIds",tagProp.id)
    deleteTag(tagProp.id)
      .then(() => {
        Navigate(getAllTags)
      })
  }




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