import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ postProp }) => {
    
  return (
    <Card className="m-4">
      <CardImg top src={postProp.userProfile.imageLocation}  /> 
      <CardBody>
      <p> Post title: <Link to={`/posts/${postProp.id}`}><strong>{postProp.title}</strong> </Link>
      </p>
      <p className="text-left px-0">Posted by: {postProp.userProfile.fullName}</p>
      </CardBody>
    </Card>
  );
};
export default Post;

