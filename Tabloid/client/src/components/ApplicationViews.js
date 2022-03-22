import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { CategoryProvider } from "../providers/CategoryProvider";
import {CategoryForm} from "./categories/CategoryForm"
import {CategoryList} from "./categories/CategoryList"

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  if (!isLoggedIn) {
    return (
    <UserProfileProvider>    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />      
      </Routes>
    </UserProfileProvider>
    );
  }
  else{
   return(
    <CategoryProvider>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/Category" exact element={ <CategoryList />} />
        <Route path="/Category/add" element={ <CategoryForm />} />
      </Routes>
    </CategoryProvider>
   );
  }
}
