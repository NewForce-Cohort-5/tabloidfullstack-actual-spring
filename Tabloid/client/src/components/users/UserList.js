import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import User from "./User";

const PostList = () => {
  const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

  useEffect(() => {
    getAllUserProfiles()
  }, []);



  return (
  
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {userProfiles.map((u) => (
            <User key={u.id} user={u} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default PostList;