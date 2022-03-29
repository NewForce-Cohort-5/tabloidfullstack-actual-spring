import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Post = ({ postProp }) => {
    

  return (
    <Card className="m-4">
      <CardBody>
      <p> Post title: <Link to={`/posts/${postProp.id}`}><strong>{postProp.title}</strong> </Link>
      </p>
      <p className="text-left px-0">Posted by: {postProp.userProfile.fullName}</p>
      <p className="text-left px-0">Date posted: {new Date(postProp.publishDateTime).toLocaleDateString('en-us')}</p>
      </CardBody>
    </Card>
  );
};









