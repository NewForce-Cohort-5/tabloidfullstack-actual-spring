import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { PostContext } from "../../providers/PostProvider"; 
import { useParams } from "react-router-dom";
import { Post } from "./Post";

export const PostDetail = () => {
  const [singlePost, setPost] = useState({});
  const { GetPostsById } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    GetPostsById(id).then(setPost);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          {/* <Post post={post} />
          <ListGroup>
            {singlePost.comments.map((c) => (
              <ListGroupItem>{c.message}</ListGroupItem>
            ))}
          </ListGroup> */}
          <strong>Post title: {singlePost.title}</strong>
          <div><img src={singlePost.imageLocation} alt="post-image"></img></div>
          <p>{singlePost.content}</p>
          <strong> Published on: {new Date(singlePost.publishDateTime).toLocaleDateString('en-us')}</strong>
          <strong> Author: {singlePost.userProfile?.displayName}</strong>
        </div>
      </div>
    </div>
  );
};
