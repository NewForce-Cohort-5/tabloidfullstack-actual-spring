import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import {CategoryList} from "./categories/CategoryList"
import { CategoryProvider } from "../providers/CategoryProvider";
import {TagList} from "./tags/TagList";
import { TagProvider } from "../providers/TagProvider";
import UserList from "./users/UserList";
import { UserDetails } from "./users/UserDetail";
import TagForm from "./tags/TagForm";

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
    <TagProvider>  
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/Category" exact element={ <CategoryList />} />       
          <Route path="/users" element={<UserList />} />
          <Route path="/add/tags" element={<TagForm />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/tags" element={<TagList />} />
          <Route path="/add/tags" element={<TagForm />} />
        </Routes>
      </CategoryProvider>
    </TagProvider>
      
   );
  }
}
