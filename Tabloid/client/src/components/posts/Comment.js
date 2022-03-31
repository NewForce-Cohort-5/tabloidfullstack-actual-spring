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
    const {deleteComment} = useContext(CommentContext)
    const {getPostWithComments} = useContext(PostContext)
    const { id } = useParams();

    useEffect(() => {
        getPostWithComments(id);
      }, []);


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

  return (
    <ListGroupItem className="mt-3 m-1" key={commentProp.id}><b>Comment by:</b> {commentProp.userProfile.displayName} <div><b>Subject:</b> {commentProp.subject}</div> <b>Content:</b> {commentProp.content} <div><b>Created:</b> {new Date(commentProp.createDateTime).toLocaleDateString(
        'en-US')}</div> {currentUserId === commentProp.userProfileId ? <button primary type="submit" className="btn btn-danger" onClick={handleDelete}>
        delete
        </button>: ""}  </ListGroupItem>
  );
};



