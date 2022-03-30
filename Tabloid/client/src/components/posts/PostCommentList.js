import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { useNavigate } from "react-router";
import { Comment } from "./Comment";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";


const CommentList = () => {
  const [idToEdit, setIdToEdit] = useState(0)
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

  
  
  const handleControlledInputChange = (event) => {
    const newComment = {...comment}
    newComment[event.target.id] = event.target.value
    setComment(newComment)
}

const handleSaveComment = (event) => {
  event.preventDefault()
  addComment(comment)
  .then(() => getPostWithComments(id))
  .then(changedpost =>{ 
     setPost(changedpost)
     handleClose()
  })
  comment.subject = ""
  comment.content = ""
  
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
  {
        post.comments.map(pc => {

           
               return (<Comment key={pc.id} commentProp={pc} setPost={setPost} stateChangingFunction={setIdToEdit} addCommentToState={setComment} />)
       }
      )  
    }     
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