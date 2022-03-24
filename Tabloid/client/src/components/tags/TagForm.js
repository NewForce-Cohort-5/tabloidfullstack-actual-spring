import React, {useContext, useEffect, useState} from "react"
import { TagContext } from "../../providers/TagProvider"
import { useNavigate, useParams } from "react-router-dom";
// import Tag from "./Tag";
import {Button } from "reactstrap";


const TagForm = () => {
    const {addTag, getTagById, updateTag} = useContext(TagContext)

    const [tag, setTag, ] = useState({
    });

    const [isLoading, setIsLoading] = useState(true);

   const {tagId} = useParams();

   console.log("tagId", tagId)
    useEffect(()=> {
        if(tagId){
            getTagById(tagId)
            .then(tag => {
              setTag(tag)
              setIsLoading(false)
            })
          } else {
            setIsLoading (false)
          }}, [])


    const navigate = useNavigate();

    const handleControlledInputChange = (event)=> {
        const newTag = {...tag}
        newTag[event.target.id] = event.target.value
        
        setTag(newTag)
    }

    const handleSaveTag = (event) => {
      

        if(tag.name === "" )
        {
            alert("Please fill out the tag name.")
        } else {

            setIsLoading(true);
            if (tagId){
                //PUT - update
             
                updateTag({
                    id: tag.id,
                    name: tag.name,
                })
                .then(()=> navigate("/tags"))
            } else {
            addTag({
                name: tag.name
            })
            .then(navigate("/tags"));
     }
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
                        <Button primary 
                              disabled={isLoading} 
                              type="submit" className="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                 handleSaveTag()}}>
                              {tagId ? <>Save Tag</> : <>Add Tag</>}
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