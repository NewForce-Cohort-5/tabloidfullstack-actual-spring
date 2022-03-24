import { Modal } from "react-bootstrap";
import React, { useContext,useState } from "react";
import { Card,CardBody, Button } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";

export const Category = ({category}) => {
  const {deleteCategory} = useContext(CategoryContext)

  //modal from boostrap
  const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const categoryDelete = () => {
    deleteCategory(category.id)
      
            navigate(handleClose)
        }


  return (
   
      <Card className="m-4">
            <CardBody>
        <p className="text-left px-2"><strong>Category Name: </strong></p>
        <p>{category.name}</p>
            
        <Button outline
        className="categoryEditButton" onClick={() => navigate(`/category/edit/${category.id}`)}>Edit
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
    <Modal.Title>Delete Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>Tag Name: {category.name}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={categoryDelete}>
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

