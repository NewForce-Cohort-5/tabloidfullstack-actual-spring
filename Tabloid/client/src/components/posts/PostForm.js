import React, {useContext, useEffect, useState} from "react"
import { PostContext } from "../providers/PostProvider"
import { useNavigate } from "react-router-dom";
import Post from "./Post";


const PostForm = () => {
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

    const handleSavePost = (event) => {
        event.preventDefault()

        if(post.title === "" || post.imageUrl ==="" )
        {
            alert("Please fill out the title and/or image url fields.")
        } else {
            addPost(post)
            .then(navigate("/"));
     }
      
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
           <fieldset>
                <div className="formGroup">
                <label htmlFor="title">Gif Url:</label>
                <input type="text" id="imageUrl" onChange={handleControlledInputChange} required className="form-control" placeholder="post imageUrl" value={Post.imageUrl}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="title">Caption:</label>
                <input type="text" id="caption" onChange={handleControlledInputChange} required  className="form-control" placeholder="post caption" value={Post.caption}/>
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
export default PostForm;