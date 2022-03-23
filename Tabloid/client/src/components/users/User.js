import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Card className="m-4">      
      <CardBody>
      <p>{user.fullName}</p>
      <p><b>Display Name:</b> {user.displayName}</p>
      <p><b>User Type:</b> {user.userType.name}</p>
      </CardBody>
    </Card>
  );
};

export default User;