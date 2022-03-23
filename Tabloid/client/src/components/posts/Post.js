import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ postProp }) => {
    
  return (
    //Card is a component imported from the React strap
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {postProp.userProfile.name}</p>
      <CardImg top src={postProp.imageUrl} alt={postProp.title} />
      <CardBody>
        <p>
          <strong>{postProp.title}</strong>
        </p>
        <p>{postProp.caption}</p>
        <Link to={`/posts/${postProp.id}`}>
    <strong>{postProp.title}</strong>
    </Link>
      </CardBody>
    </Card>
  );
};

export default Post;