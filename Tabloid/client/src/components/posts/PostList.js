import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

export const PostList = () => {
  const { posts, GetAllPublishedPosts } = useContext(PostContext);


  useEffect(() => {
    GetAllPublishedPosts();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((singlePostInLoop) => (
            <Post key={singlePostInLoop.id} postProp={singlePostInLoop} />
          ))}

        </div>
      </div>
    </div>
  );
};

