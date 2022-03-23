import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";

export const TagList = () => {
    
const { tags, getAllTags } = useContext(TagContext);


  useEffect(() => {
   
    getAllTags();
  }, []);


return (
    
<div className="tag">
      {console.log("TagList: Render", tags)}
  
      {
        tags.map(singleTagInLoop => {
        
          return <Tag key={singleTagInLoop.id} tagProp={singleTagInLoop} />
          
        })
      }
    </div>
  )
}

