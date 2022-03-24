import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ postProp }) => {
    

  // let date = (userProfile.publishDateTime);
  // let array = date.split('-').reverse().join('.')
  // var postDate = (array[12] + array[13] + "/" + array[0] + array[1]+ "/"+ array[15]+ array[16]+ array[17]+ array[18]);

  return (
    <Card className="m-4">
      <CardBody>
      <p> Post title: <Link to={`/posts/${postProp.id}`}><strong>{postProp.title}</strong> </Link>
      </p>
      <p className="text-left px-0">Posted by: {postProp.userProfile.fullName}</p>
      <p className="text-left px-0">Date posted: {postProp.publishDateTime}</p>
      </CardBody>
    </Card>
  );
};
export default Post;










