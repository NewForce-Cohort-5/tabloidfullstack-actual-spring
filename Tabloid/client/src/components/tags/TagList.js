import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";
import {Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const TagList = () => {
    
const { tags, getAllTags } = useContext(TagContext);

const navigate = useNavigate();

  useEffect(() => {
   
    getAllTags();
  }, []);


return (
    
<div className="tag">
      {console.log("TagList: Render", tags)}
      <Button outline onClick={() => navigate("/add/tags")}>
    Create New
  </Button>
  {' '}  
      {
        tags.map(singleTagInLoop => {
        
          return <Tag key={singleTagInLoop.id} tagProp={singleTagInLoop} />
          
        })
      }
    </div>
  )
}

