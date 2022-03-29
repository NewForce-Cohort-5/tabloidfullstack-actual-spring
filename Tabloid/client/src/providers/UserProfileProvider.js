import React, { useState, useEffect, createContext } from "react";


export const UserProfileContext = createContext();

export const UserProfileProvider =(props) =>{

  const apiUrl = "https://localhost:44360";
  const [userProfiles, setUserProfiles] = useState([]);
  const [httpStatusCode, setHttpStatusCode] = useState([]);
  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);


  const getAllUserProfiles = () => {
    return fetch(`${apiUrl}/api/UserProfile`)
      .then((res) => res.json())
      .then(setUserProfiles);
  };

  const getUser = (id) => {
    return fetch(`${apiUrl}/api/UserProfile/${id}`).then((res) => res.json());
};


  const login = (userObject) => {
    return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else{
          return undefined
        }
      });
  };


  const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
   
      return  fetch(`${apiUrl}/api/userprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
 

  };





  return (
    <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getAllUserProfiles, userProfiles, userProfile, setUserProfiles, getUser  }}>
       {props.children}
    </UserProfileContext.Provider>
  );
}