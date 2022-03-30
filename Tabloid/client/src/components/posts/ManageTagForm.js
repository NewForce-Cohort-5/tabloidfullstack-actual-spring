import React, {useContext, useEffect, useState} from "react"
import { PostContext } from "../../providers/PostProvider"
import { useNavigate, useParams } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";
import Post from "./Post";


export const ManageTagForm = () => {

    const {tags ,getAllTags, getTagById } = useContext(TagContext)
    const { GetPostsById, addTagToPost } = useContext(PostContext)
    const {postId} = useParams();

    const [postTag, setPostTag] = useState({
        postId: 0,
        tagId: 0,
        });
    
    const navigate = useNavigate();

    useEffect(()=> {
        getAllTags().then(()=> GetPostsById(postId))
        //need to get post by id and tagbyid?
    }, []);


    const handleControlledInputChange = (event)=> {
        const newPostTag = {...postTag}
        newPostTag[event.target.id] = event.target.value
        
        setPostTag(newPostTag)
    }

    const handleSavePostTag = (event) => {
        event.preventDefault()

        addTagToPost(postTag)
            .then(navigate("/"));
     }
      
    
    
    return(
        <form className="postForm">
            <h2>New Post</h2>
            <fieldset>
                <label for="cars">Choose a Tag:</label>
        <select value={tags.Id} name="tagId" id="tagId" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a Tag</option>
              {tags.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
                ))}
                </select>
           </fieldset>
                        
            <div className="form-group row col-sm-12 mx-auto mb-3">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSavePostTag}>
                            Save Post
                        </button>
                    </div>
                    </div>
        </form>
    )     
}