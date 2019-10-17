import React from 'react';


const AddressCountry = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__address"}>Address Line</label>
        <input type="text" className="form-control" id={props.formType + "-form__address"} aria-describedby="addressHelp" placeholder="Enter Address details"/>
        <small id="addressHelp" className="form-text text-muted">{props.formType} Operation Address (Street, Suburb, City)</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__country"}>Country</label>
        <input type="text" className="form-control" id={props.formType + "-form__country"} aria-describedby="countryHelp" placeholder="Enter Country"/>
        <small id="countryHelp" className="form-text text-muted">{props.formType}'s Country of Operation</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default AddressCountry;