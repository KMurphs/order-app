import React from 'react';


const EmailPhoneWebsite = (props) => {
  const formRequired = !props.formRequired ? {} : props.formRequired
  const formDisabled = !props.formDisabled ? {} : props.formDisabled
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__email"}>Email address</label>
        <input type="email" 
               className="form-control" 
               name="email" 
               id={props.formType + "-form__email"} 
               aria-describedby="emailHelp" 
               placeholder="Enter email" 
               onChange={(evt)=>props.onValueChange('email', evt.target.value)} 
               value={props.formData.email || ''} 
               required={formRequired.email} 
               disabled={formDisabled.email}/>
        <small id="emailHelp" className="form-text text-muted">{props.formType}'s Email Address</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__phone"}>Phone Number</label>
        <input type="tel" 
               className="form-control" 
               name="phone" 
               id={props.formType + "-form__phone"} 
               aria-describedby="phoneHelp" 
               placeholder="Enter Phone Number" 
               pattern="[0-9]{4,5}-[0-9]{9}"  
               onChange={(evt)=>props.onValueChange('phone', evt.target.value)} 
               value={props.formData.phone || '0'}
               required={formRequired.phone} 
               disabled={formDisabled.phone}/>
        <small id="phoneHelp" className="form-text text-muted">{props.formType}'s Phone Number (e.g 0027-762564723)</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__website"}>Website Address</label>
        <input type="text" 
               className="form-control" 
               name="website" 
               id={props.formType + "-form__website"} 
               aria-describedby="websiteHelp" 
               placeholder="Paste Website Link"  
               onChange={(evt)=>props.onValueChange('website', evt.target.value)} 
               value={props.formData.website || ''}
               required={formRequired.website} 
               disabled={formDisabled.website}/>
        <small id="websiteHelp" className="form-text text-muted">{props.formType}'s' Website Link</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default EmailPhoneWebsite;