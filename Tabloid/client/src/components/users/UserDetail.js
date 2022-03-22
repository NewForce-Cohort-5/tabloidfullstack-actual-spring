import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import User from "./User";

export const UserDetails = () => {
  const [userProfile, setUserProfile] = useState();
  const { getUser } = useContext(UserProfileContext);
  const { id } = useParams();

 

  useEffect(() => {
    getUser(id).then(setUserProfile);
  }, []);

 

  if (!userProfile) {
    return null;
  }
  //formatting date for now with an array
  let date = (userProfile.createDateTime);
  let array = date.split('-').reverse().join('.')
  var userDate = (array[12] + array[13] + "-" + array[0] + array[1]+ "-"+ array[15]+ array[16]+ array[17]+ array[18]);

  return ( 
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
         <div>   <img src={userProfile.imageLocation} alt="user" onerror="if (this.src != 'error.jpg') this.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';"></img></div>
            <strong>{userProfile.fullName}</strong>
            <p><b>Email:</b> {userProfile.email}</p>
            <p><b>Account Created:</b> {userDate}</p>
           <p><b>Display Name:</b> {userProfile.displayName}</p>
      <p><b>User Type:</b> {userProfile.userType.name}</p>
        </div>
      </div>
    </div>
  );
};

