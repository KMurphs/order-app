import React, {useState} from 'react';

import {useRenderDataFromPropsAndLocalChanges} from '../../utilsFunctions/RenderDataFromPropsAndLocalChanges'

const ProfilePicture = (props) => {

  const [getRenderImgPathFromCurrentProps, setRenderImgPathFromLocalChanges] = useRenderDataFromPropsAndLocalChanges(props.formData.img_path)

  return ( 
      <div className="input-group mb-3 d-flex flex-column">
        <img src={getRenderImgPathFromCurrentProps(props.formData.img_path) || "/img/NoImage.png"} alt="No Picture Provided" className="img-thumbnail"></img>
        <div className="custom-file">
          <input type="file" 
                 className="custom-file-input" 
                 id="supplier-form__upload" 
                 name="img_path" 
                 aria-describedby="supplier-form__upload" 
                 onChange={(inputFile)=> {
                     if(inputFile.target.files && inputFile.target.files[0]){
                      var reader = new FileReader();
                      reader.onload = (e) => {
                        setRenderImgPathFromLocalChanges(/^data:image/.test(e.target.result)?e.target.result:null)
                        props.onValueChange('img_path', getRenderImgPathFromCurrentProps(props.formData.img_path))
                      }
                      reader.readAsDataURL(inputFile.target.files[0]);  
                     } 
                 }}/>
          <label className="custom-file-label" htmlFor="supplier-form__upload">Upload Picture</label>
        </div>
        <br/>
      </div>
  );
}
 
export default ProfilePicture;
