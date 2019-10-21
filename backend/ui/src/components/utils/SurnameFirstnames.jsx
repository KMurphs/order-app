import React from 'react';


const SurnameFirstnames = (props) => {
  const formRequired = !props.formRequired ? {} : props.formRequired
  const formDisabled = !props.formDisabled ? {} : props.formDisabled
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__surname"}>Surname</label>
        <input type="text" 
               className="form-control" 
               name="surname" 
               id={props.formType + "-form__surname"} 
               aria-describedby="surnameHelp" 
               placeholder="Enter Surname" 
               onChange={(evt)=>props.onValueChange('surname', evt.target.value)} 
               value={props.formData.surname || ''} 
               required={formRequired.surname} 
               disabled={formDisabled.surname}/>
        <small id="surnameHelp" className="form-text text-muted">{props.formType}'s Surname</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__firstnames"}>First Names</label>
        <input type="text" 
               className="form-control" 
               name="firstnames" 
               id={props.formType + "-form__firstnames"} 
               aria-describedby="firstnamesHelp" 
               placeholder="Enter First Names" 
               onChange={(evt)=>props.onValueChange('firstnames', evt.target.value)} 
               value={props.formData.firstnames || ''} 
               required={formRequired.firstnames} 
               disabled={formDisabled.firstnames}/>
        <small id="firstnamesHelp" className="form-text text-muted">{props.formType}'s First Names</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default SurnameFirstnames;