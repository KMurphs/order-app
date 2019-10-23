import React from 'react';


const FormGroupID = (props) => {
  const formRequired = !props.formRequired ? {} : props.formRequired
  const formHidden = !props.formHidden ? {} : props.formHidden
  return ( 
    <React.Fragment>
      <div className="form-group" style={{'display': `${formHidden.surname?'none':'block'}`}}>
        <label htmlFor={props.formType + "-form__surname"}>Surname</label>
        <input type="text" 
               className="form-control" 
               name="surname" 
               id={props.formType + "-form__surname"} 
               aria-describedby="surnameHelp" 
               placeholder="Enter Surname" 
               onChange={(evt)=>props.onValueChange('surname', evt.target.value)} 
               value={props.formData.surname || ''} 
               required={formRequired.surname}/>
        <small id="surnameHelp" className="form-text text-muted">{props.formType}'s Surname</small>
      </div>
      <div className="form-group" style={{'display': `${formHidden.firstnames?'none':'block'}`}}>
        <label htmlFor={props.formType + "-form__firstnames"}>First Names</label>
        <input type="text" 
               className="form-control" 
               name="firstnames" 
               id={props.formType + "-form__firstnames"} 
               aria-describedby="firstnamesHelp" 
               placeholder="Enter First Names" 
               onChange={(evt)=>props.onValueChange('firstnames', evt.target.value)} 
               value={props.formData.firstnames || ''} 
               required={formRequired.firstnames}/>
        <small id="firstnamesHelp" className="form-text text-muted">{props.formType}'s First Names</small>
      </div>
      <div className="form-group" style={{'display': `${formHidden.storename?'none':'block'}`}}>
        <label htmlFor={props.formType + "-form__storename"}>Store Name</label>
        <input type="text" 
               className="form-control" 
               name="storename" 
               id={props.formType + "-form__storename"} 
               aria-describedby="storenameHelp" 
               placeholder="Enter Store Name" 
               onChange={(evt)=>props.onValueChange('storename', evt.target.value)} 
               value={props.formData.storename || ''} 
               required={formRequired.storename}/>
        <small id="storenameHelp" className="form-text text-muted">{props.formType}'s Store Name</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default FormGroupID;