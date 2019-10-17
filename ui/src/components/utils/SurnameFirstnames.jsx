import React from 'react';


const SurnameFirstnames = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__surname"}>Surname</label>
        <input type="text" className="form-control" id={props.formType + "-form__surname"} aria-describedby="surnameHelp" placeholder="Enter Surname"/>
        <small id="surnameHelp" className="form-text text-muted">{props.formType}'s Surname</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__firstnames"}>First Names</label>
        <input type="text" className="form-control" id={props.formType + "-form__firstnames"} aria-describedby="firstnamesHelp" placeholder="Enter First Names"/>
        <small id="firstnamesHelp" className="form-text text-muted">{props.formType}'s First Names</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default SurnameFirstnames;