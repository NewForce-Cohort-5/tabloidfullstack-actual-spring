import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";


const CommentList = () => {
  const [post, setPost] = useState();
  const { getPostWithComments } = useContext(PostContext);
  const { addComment } = useContext(CommentContext);
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const currentUserId = currentUser.id
  const { id } = useParams();
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  useEffect(() => {
    getPostWithComments(id).then(setPost);
  }, []);

  const [comment, setComment] = useState({
    subject: "",
    content: "",
    userProfileId: currentUserId,
    postId: parseInt(id)
  });
  
const navigate = useNavigate();
  
  const handleControlledInputChange = (event) => {
    const newComment = {...comment}
    newComment[event.target.id] = event.target.value
    setComment(newComment)
}

const handleSaveComment = (event) => {
  event.preventDefault()
  addComment(comment)
  
  document.location.reload()
}

  if (!post) {
    return null;
  }
 
  return (
    <>    <div className="container">
    <div className="row justify-content-center">
      <div>
        <big ><b className="row justify-content-center">{post.title}</b></big>
        <Button
  color=""
 className="btn btn-primary justify-content-center"    outline
    onClick={handleShow}
  >
    Add Comment
  </Button>     
      <ListGroup>
      {post.comments.map(pc => <ListGroupItem className="mt-3 m-1" key={pc.id}><b>Comment by:</b> {pc.userProfile.displayName} <div><b>Subject:</b> {pc.subject}</div> <b>Content:</b> {pc.content} <div><b>Created:</b> {new Date(pc.createDateTime).toLocaleDateString(
'en-US')}</div>  </ListGroupItem>)}
      </ListGroup>        
      </div>
    </div>
  </div>


  <Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>New Comment</Modal.Title>
</Modal.Header>
<Modal.Body><form className="commentForm container">
<div className="row justify-content-center">
<fieldset>
  <div className="formGroup">
  <label htmlFor="name">Comment Subject:</label>
  <input type="text" id="subject" onChange={handleControlledInputChange} className="form-control" value={comment.subject}/>
  </div>
</fieldset>
<fieldset>
  <div className="formGroup">
  <label htmlFor="name">Comment Content:</label>
  <input type="text" id="content" onChange={handleControlledInputChange} className="form-control" value={comment.content}/>
  </div>
</fieldset>
</div>
</form></Modal.Body>
<Modal.Footer>
<button primary type="submit" className="btn btn-primary"  onClick={handleSaveComment}>
              Save Comment
          </button>
</Modal.Footer>
</Modal>



</>

  );
};

export default CommentList;