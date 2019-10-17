import React from 'react';
import './ClientForm.css';


import ProfilePicture from '../utils/ProfilePicture';
import AddressCountry from '../utils/AddressCountry';
import EmailPhoneWebsite from '../utils/EmailPhoneWebsite';
import SurnameFirstnames from '../utils/SurnameFirstnames';


const ClientForm = (props) => {
  const formType = 'client'
  return ( 
    <form className={`order-app-form ${formType}-form`}>
      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>
      <ProfilePicture/>
      <SurnameFirstnames formType={formType}/>
      <EmailPhoneWebsite formType={formType}/>
      <AddressCountry formType={formType}/>
      <button type="submit" className="btn btn-primary btn-block">Submit</button>
    </form>
  );
}
 
export default ClientForm;