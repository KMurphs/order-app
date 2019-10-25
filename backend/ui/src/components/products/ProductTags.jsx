import React, {useState} from 'react';

import {useRenderDataFromPropsAndLocalChanges} from '../Form/RenderDataFromPropsAndLocalChanges'


const ProductTags = (props) => {

  const [newTag, setNewTag] = useState('')

  
  const propsTags = {'tags': props.tags || []}
  const [getRenderDataFromCurrentProps, , setRenderDataFromLocalKeyValue] = useRenderDataFromPropsAndLocalChanges(propsTags)
  let renderData = getRenderDataFromCurrentProps(propsTags) 


  const setTags = function(newTagsArray){
    setRenderDataFromLocalKeyValue(renderData, 'tags', newTagsArray)
    props.onNewTags(newTagsArray)
  }




  return ( 
    <React.Fragment>
      <div className='container-fluid'>
        <span style={{marginBottom: '0.8em', fontSize: '.8em'}}>Product Tags</span>
        <div className="product-tag-container">


          <div className="bg-light product-tag">
            <span className="product-tag-add"><i className="fas fa-plus"></i></span>
            <span className="product-tag-text">
              <input type="text" 
                     value={newTag} 
                     onChange={(evt)=>setNewTag(evt.target.value)} 
                     onKeyDown={(evt)=>{if(evt.keyCode === 13 && newTag !== ''){setTags([newTag, ...renderData.tags]); setNewTag(''); evt.preventDefault()}}}/> 
            </span>
          </div>

          <div className={`bg-warning product-tag ${newTag === ''?'new-tag--vanished':'new-tag'}`}>
            <span className="product-tag-text">{newTag} </span>
            <span className="product-tag-remove"><i className="fas fa-minus"></i></span>
          </div>


          {
            renderData.tags.map((item, index) => 
              <div className="bg-warning product-tag" key={index}>
                <span className="product-tag-text">{item} </span>
                <span className="product-tag-remove" onClick={() => setTags([...renderData.tags.filter((_tag, _index) => _index !== index )])}>
                  <i className="fas fa-minus"></i>
                </span>
              </div>
            )
          }
         

        </div>
      </div>

      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default ProductTags;