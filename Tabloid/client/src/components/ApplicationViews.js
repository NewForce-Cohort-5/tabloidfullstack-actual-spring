import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserProfileContext,
  UserProfileProvider,
} from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import {TagList} from "./tags/TagList";
import { TagProvider } from "../providers/TagProvider";
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
      <TagProvider>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/tags" element={<TagList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
      </TagProvider>
   );
  }
}
