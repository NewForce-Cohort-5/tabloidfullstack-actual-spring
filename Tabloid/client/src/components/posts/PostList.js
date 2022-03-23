import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, GetAllPublishedPosts } = useContext(PostContext);


  useEffect(() => {
    GetAllPublishedPosts();
  }, []);

 const user = JSON.parse(localStorage.getItem("SiteUser"))

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.filter(p => p.userProfileId === user.id ).map((singlePostInLoop) => (
            <Post key={singlePostInLoop.id} postProp={singlePostInLoop} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default PostList;