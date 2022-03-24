import { Modal } from "react-bootstrap";
import React, { useContext,useState, useEffect } from "react";
import {   useNavigate,   } from "react-router-dom";
import { Card,CardBody, Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";


const Tag = ({ tagProp }) => {
  
  const { deleteTag } = useContext(TagContext)

  


    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

  const navigate = useNavigate();


  const handleTagDelete = () => {
    console.log("deleteTagId",tagProp.id)
    debugger
    deleteTag(tagProp.id)
    
        navigate(handleClose)
            
  }

  

  return (
   
    <Card className="m-4">
         <CardBody>
      <p className="text-left px-2"><strong>Tag Name: </strong></p>
      <p>{tagProp.name}</p>
      
  <Button outline onClick={() => navigate(`/tags/edit/${tagProp.id}`)}>
    Edit
  </Button>
  {' '}   
  <Button
    color="danger"
    outline
    onClick={handleShow}
  >
    Delete
  </Button>

     </CardBody>
  


<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Delete Tag</Modal.Title>
</Modal.Header>
<Modal.Body>Tag Name: {tagProp.name}</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleTagDelete}>
    Confirm Delete
  </Button>
  <Button variant="primary" onClick={handleClose}>
    Back to List
  </Button>
</Modal.Footer>
</Modal>
</Card>


  );
};

export default Tag;