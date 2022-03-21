import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <UserProfileProvider>
      <Routes>
        <Route path="/" element= {<Hello />} />
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
       

        <Route path="/login" element= {<Login />}  />
       
    

        <Route path="/register" element= {<Register />}  />
          
      </Routes>
    </UserProfileProvider>
  );
};
