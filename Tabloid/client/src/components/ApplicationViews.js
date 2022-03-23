import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import {CategoryForm} from "./categories/CategoryForm"
import {CategoryList} from "./categories/CategoryList"
import { CategoryProvider } from "../providers/CategoryProvider";
import UserList from "./users/UserList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  if (!isLoggedIn) {
    return (  
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />      
      </Routes> 
    );
  }
  else{
   return(
    <CategoryProvider>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/Category" exact element={ <CategoryList />} />
        {/* <Route path="/Category/add" element={ <CategoryForm />} /> */}
        <Route path="/users" element={<UserList />} />
      </Routes>
    </CategoryProvider>
    
   );
  }
}
