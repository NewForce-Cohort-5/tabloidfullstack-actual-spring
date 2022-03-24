import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";


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
          <ListGroup>
            
              <Post key={post.id} comment={post} />
            
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default CommentList;