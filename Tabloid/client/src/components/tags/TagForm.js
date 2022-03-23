import React, {useContext, useEffect, useState} from "react"
import { TagContext } from "../../providers/TagProvider"
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";
import {Button } from "reactstrap";


const TagForm = () => {
    const {getAllTags,addTag} = useContext(TagContext)

    const [tag, setTag] = useState({
        name: "",
            });

    const navigate = useNavigate();

    useEffect(()=> {
        getAllTags()
    }, []);

    // const navigate = useNavigate();

    const handleControlledInputChange = (event)=> {
        const newTag = {...tag}
        newTag[event.target.id] = event.target.value
        
        setTag(newTag)
    }

    const handleSaveTag = (event) => {
        event.preventDefault()

        if(tag.name === "" )
        {
            alert("Please fill out the tag name.")
        } else {
            addTag(tag)
            .then(navigate("/tags"));
     }
      
    }
    
    return(
        <form className="tagForm">
            {/* form tags sends http request back to controller so that is why we used preventdefault  - telling form do not send anything to server bc we want to send the http request*/}
            <h2>New Tag</h2>
            <fieldset>
                <div className="formGroup">
                <label htmlFor="name">Tag Name:</label>
                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Tag Name" value={tag.name}/>
                </div>
           </fieldset>
                         
            <div className="form-group row col-sm-12 mx-auto mb-3">
                    <div className="col-sm-12">
                        <Button primary type="submit" className="btn btn-primary" onClick={handleSaveTag}>
                            Save Tag
                        </Button>
                        <Button outline onClick={() => navigate("/tags")}>
    Back to List
  </Button>
                    </div>
                    </div>
        </form>
    )
}
export default TagForm;