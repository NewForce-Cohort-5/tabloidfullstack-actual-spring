import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider"; 
import { Link, useParams } from "react-router-dom";
import { Post } from "./Post";
import { Button } from "bootstrap";
import { useNavigate} from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";
import { tagPropType } from "reactstrap/lib/utils";


export const PostDetail = () => {
  const [singlePost, setPost] = useState({});
  const { GetPostsById } = useContext(PostContext);
  // const { tags, getAllTags } = useContext(TagContext);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
     GetPostsById(id).then(setPost);
  }, []);
 
  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
                    <strong>{singlePost.title}</strong>
          <div><img src={singlePost.imageLocation} alt="post-image"></img></div>
          <p>{singlePost.content}</p>
          
          <ListGroup>
      {singlePost.tags?.map(pt => <ListGroupItem className="mt-3 m-1" key={pt.id}><b>Tag Name: </b> {pt.name}  </ListGroupItem>)}
      </ListGroup>   
          <strong> Published on: {new Date(singlePost.publishDateTime).toLocaleDateString('en-us')}</strong>
          <strong> Author: {singlePost.userProfile?.displayName}</strong>
          <div>  <button className="btn btn-primary" outline onClick={() => navigate(`/post/comments/${singlePost.id}`)}>
    View Comments
  </button>
  <button className="btn btn-primary" outline onClick={() => navigate(`/posts/ManageTag/${singlePost.id}`)}>
    ManageTag
  </button></div>
        
        </div>
      </div>
    </div>
  );
};
