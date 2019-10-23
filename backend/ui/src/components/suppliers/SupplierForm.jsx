import React from 'react';
import './SupplierForm.css';

import FormGroupID from '../utils/FormGroupID';
import FormGroupAddress from '../utils/FormGroupAddress';
import FormGroupContact from '../utils/FormGroupContact';
import FormGroupProfilePic from '../utils/FormGroupProfilePic';


const SupplierForm = (props) => {
  const formType = 'supplier'
  return ( 
    <form className={`order-app-form ${formType}-form`}>
      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>
      <FormGroupProfilePic/>
      <FormGroupID formType={formType}/>
      <FormGroupContact formType={formType}/>
      <FormGroupAddress formType={formType}/>
      <button type="submit" className="btn btn-primary btn-block">Submit</button>
    </form>
  );
}
 
export default SupplierForm;