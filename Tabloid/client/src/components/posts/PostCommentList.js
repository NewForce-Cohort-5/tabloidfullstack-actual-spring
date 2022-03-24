import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { ListGroup, ListGroupItem } from "reactstrap";


const CommentList = () => {
  const [post, setPost] = useState();
  const { getPostWithComments } = useContext(PostContext);
  const { id } = useParams();

  

  useEffect(() => {
    getPostWithComments(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }
 
  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <big className="row justify-content-center">{post.title}</big>     
        <ListGroup>
        {post.comments.map(pc => <ListGroupItem key={pc.id}><b>Comment by:</b> {pc.userProfile.displayName} <div><b>Subject:</b> {pc.subject}</div> <b>Content:</b> {pc.content} <div><b>Created:</b> {new Date(pc.createDateTime).toLocaleDateString(
  'en-US')}</div>  </ListGroupItem>)}
        </ListGroup>        
        </div>
      </div>
    </div>
  );
};

export default CommentList;