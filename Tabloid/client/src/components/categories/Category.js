import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <Card className="m-4">
      <Link to={`/users/${category.userProfile.id}`}>
        <p className="text-left px-2">Posted by: {category.userProfile.name}</p>
      </Link>
      <CardBody>
      <Link to={`/category/${category.id}`}>
        <strong>{category.name}</strong>
      </Link>
      </CardBody>
    </Card>
  );
};

export default Category;