import React, {useContext, useEffect, useState} from "react"
import { PostContext } from "../providers/PostProvider"
import { useNavigate } from "react-router-dom";
import Post from "./Post";


export const PostForm = () => {
    const {GetAllPublishedPosts} = useContext(PostContext)

    const [post, setPost] = useState({
        title: "",
        imageUrl: "",
        caption:"",
        userProfileId: 1
    });
    
    const navigate = useNavigate();

    useEffect(()=> {
        GetAllPublishedPosts()
    }, []);


    const handleControlledInputChange = (event)=> {
        const newPost = {...post}
        newPost[event.target.id] = event.target.value
        
        setPost(newPost)
    }

  

    
    return(
        <form className="postForm">
            <h2>New Post</h2>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="title">Post Title</label>
                <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="post title" value={Post.title}/>
                </div>
           </fieldset>
                        
            <div className="form-group row col-sm-12 mx-auto mb-3">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSavePost}>
                            Save Post
                        </button>
                    </div>
                    </div>
        </form>
    )
}
