import React from 'react';


const EmailPhoneWebsite = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__email"}>Email address</label>
        <input type="email" className="form-control" id={props.formType + "-form__email"} aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" className="form-text text-muted">{props.formType}'s Email Address</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__phone"}>Phone Number</label>
        <input type="number" className="form-control" id={props.formType + "-form__phone"} aria-describedby="phoneHelp" placeholder="Enter Phone Number"/>
        <small id="phoneHelp" className="form-text text-muted">{props.formType}'s Phone Number (e.g 0027762564723)</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__website"}>Website Address</label>
        <input type="text" className="form-control" id={props.formType + "-form__website"} aria-describedby="websiteHelp" placeholder="Paste Website Link"/>
        <small id="websiteHelp" className="form-text text-muted">{props.formType}'s' Website Link</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default EmailPhoneWebsite;