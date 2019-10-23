import React from 'react';



const AddressCountry = (props) => {
  const formRequired = !props.formRequired ? {} : props.formRequired
  const formHidden = !props.formHidden ? {} : props.formHidden
  return ( 
    <React.Fragment>
      <div className="form-group" style={{'display': `${formHidden.address?'none':'block'}`}}>
        <label htmlFor={props.formType + "-form__address"}>Address Line</label>
        <input type="text" 
               className="form-control" 
               name="address" 
               id={props.formType + "-form__address"} 
               aria-describedby="addressHelp" 
               placeholder="Enter Address details" 
               onChange={(evt)=>props.onValueChange('address', evt.target.value.toCapitals())} 
               value={props.formData.address || ''}  
               required={formRequired.address}/>
        <small id="addressHelp" className="form-text text-muted">{props.formType} Operation Address (Street, Suburb, City)</small>
      </div>
      <div className="form-group" style={{'display': `${formHidden.country?'none':'block'}`}}>
        <label htmlFor={props.formType + "-form__country"}>Country</label>
        <input type="text" 
               className="form-control" 
               name="country" 
               id={props.formType + "-form__country"} 
               aria-describedby="countryHelp" 
               placeholder="Enter Country" 
               onChange={(evt)=>props.onValueChange('country', evt.target.value.toCapitals())} 
               value={props.formData.country || ''}  
               required={formRequired.country}/>
        <small id="countryHelp" className="form-text text-muted">{props.formType}'s Country of Operation</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default AddressCountry;