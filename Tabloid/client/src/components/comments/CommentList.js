import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";
import PostDetails from "./PostDetails";
import { PostContext } from "../providers/PostProvider";

const CommentList = () => {
  const [post, setPost] = useState();
  const { getUser } = useContext(UserProfileContext);
  const { id } = useParams();

  

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <ListGroup>
            {post.comments.map((c) => (
              <Comment key={c.id} comment={c} />
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;