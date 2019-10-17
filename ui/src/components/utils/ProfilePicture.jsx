import React from 'react';


const ProfilePicture = (props) => {
  return ( 
      <div className="input-group mb-3 d-flex flex-column">
        <img src="/img/NoImage.png" alt="No Picture Provided" className="img-thumbnail"></img>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="supplier-form__upload" aria-describedby="inputGroupFileAddon01"/>
          <label className="custom-file-label" htmlFor="supplier-form__upload">Upload Picture</label>
        </div>
        <br/>
      </div>
  );
}
 
export default ProfilePicture;