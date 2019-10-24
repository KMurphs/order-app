import React from 'react';

import {useRenderDataFromPropsAndLocalChanges} from './RenderDataFromPropsAndLocalChanges'

const ProfilePicture = (props) => {

  const defaultPicture = '/imgs/NoImage.png'
  const formHidden = !props.formHidden ? {} : props.formHidden
  const [getRenderImgPathFromCurrentProps, setRenderImgPathFromLocalChanges] = useRenderDataFromPropsAndLocalChanges(props.formData.img_path || defaultPicture)


  return ( 
      <div className="input-group mb-3 d-flex flex-column">
        
        <img  alt={`Showing selected ${props.formType}`} 
              className="img-thumbnail"
              src={
                    /^data:image/.test(getRenderImgPathFromCurrentProps(props.formData.img_path)) || 
                    /imgs\//.test(getRenderImgPathFromCurrentProps(props.formData.img_path)) 
                    ? getRenderImgPathFromCurrentProps(props.formData.img_path) 
                    : defaultPicture
                  }/>
                  
        <div className="custom-file" style={{'display': `${formHidden.input?'none':'block'}`}}>
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
