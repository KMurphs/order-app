import React from 'react';


const AddressCountry = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__address"}>Address Line</label>
        <input type="text" className="form-control" name="address" id={props.formType + "-form__address"} aria-describedby="addressHelp" placeholder="Enter Address details" onChange={(evt)=>props.onValueChange('address', evt.target.value)} value={props.formData.address || ''}/>
        <small id="addressHelp" className="form-text text-muted">{props.formType} Operation Address (Street, Suburb, City)</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__country"}>Country</label>
        <input type="text" className="form-control" name="country" id={props.formType + "-form__country"} aria-describedby="countryHelp" placeholder="Enter Country" onChange={(evt)=>props.onValueChange('country', evt.target.value)} value={props.formData.country || ''} required/>
        <small id="countryHelp" className="form-text text-muted">{props.formType}'s Country of Operation</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default AddressCountry;