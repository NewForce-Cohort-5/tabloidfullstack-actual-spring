import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";


export const Comment = ({ commentProp, setPost }) => {
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const currentUserId = currentUser.id
    const {deleteComment, updateComment, addComment} = useContext(CommentContext)
    const {getPostWithComments} = useContext(PostContext)
    const { id } = useParams();
    const [idToEdit, setIdToEdit] = useState(0)
   

   

      const [comment, setComment] = useState({
        subject: "",
        content: "",
        userProfileId: currentUserId,
        postId: parseInt(id)
      });

      const onClickHandler = () => {
        setIdToEdit(commentProp.id)
        debugger
        setComment(commentProp)
      }

      const handleControlledInputChange = (event) => {
        const newComment = {...comment}
        newComment[event.target.id] = event.target.value
        setComment(newComment)
    }
    
    const handleSaveComment = (event) => {
        updateComment({
            id: comment.id,
            userId: currentUserId,
            subject: comment.subject,
            content: comment.content
        })
            setIdToEdit(0)
            setComment({})
            getPostWithComments(id)
            .then(changedpost =>{ 
               setPost(changedpost)
            })
     debugger
  
            comment.subject = ""
            comment.content = ""  
      }
     
      
    
    


    const handleDelete = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then(deleteComment(commentProp.id)).then(() => { getPostWithComments(id).then(setPost)
            }).then (() => Swal.close()).then(getPostWithComments(id))
            
      
                }
        })
      
      }

      if (commentProp.id === idToEdit) {
        return (      <fieldset>
            <input type="text" id="subject" required autoFocus className="form-control" 
            placeholder="Edit message" onChange={handleControlledInputChange} defaultValue={comment.subject}/>
              <input type="text" id="content"  required className="form-control" 
            placeholder="Edit message" onChange={handleControlledInputChange} defaultValue={comment.content}/>
           
           <button className="btn btn-primary btn-dark"
onClick={handleSaveComment}> {<>Save edited comment</>}
</button>
           
            </fieldset>  )
        
    } else {    

        return (  <ListGroupItem className="mt-3 m-1" key={commentProp.id}><b>Comment by:</b> {commentProp.userProfile.displayName} <div><b>Subject:</b> {commentProp.subject}</div> <b>Content:</b> {commentProp.content} <div><b>Created:</b> {new Date(commentProp.createDateTime).toLocaleDateString(
            'en-US')}</div> {currentUserId === commentProp.userProfileId ? <><button primary type="submit" className="btn btn-danger" onClick={handleDelete}>
            delete
            </button> <button primary type="submit" className="btn btn-secondary" onClick={onClickHandler}>
            edit
            </button></>: ""}  </ListGroupItem>)
  
  
}
};



