import React from 'react';
import './ClientForm.css';

import {useRenderDataFromPropsAndLocalChanges} from '../../utilsFunctions/RenderDataFromPropsAndLocalChanges'

import ProfilePicture from '../utils/ProfilePicture';
import AddressCountry from '../utils/AddressCountry';
import EmailPhoneWebsite from '../utils/EmailPhoneWebsite';
import SurnameFirstnames from '../utils/SurnameFirstnames';


const ClientForm = (props) => {
  const formType = 'client'

  const [getRenderDataFromCurrentProps, setRenderDataFromLocalChanges, setRenderDataFromLocalKeyValue] = useRenderDataFromPropsAndLocalChanges(props.clientData)
  let renderData = getRenderDataFromCurrentProps(props.clientData)

  return ( 
    <form className={`order-app-form ${formType}-form`} id='client-form' onSubmit={(e)=>handleSubmit(e, renderData)} encType="multipart/form-data" action={`${process.env.REACT_APP_BASE_URL}/clients`} /*method="POST"*/>
      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>
      {/* <input type="text" name="user[name]"/> */}
      <ProfilePicture    formData={{img_path: renderData.img_path}}
                         onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <SurnameFirstnames formType={formType} 
                         formData={{surname: renderData.surname, firstnames: renderData.firstnames}}
                         formRequired={{surname: true, firstnames: false}}
                         formDisabled={{surname: false, firstnames: false}}
                         onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <EmailPhoneWebsite formType={formType} 
                         formData={{email: renderData.email, phone: renderData.phone, website: renderData.website}}
                         formRequired={{email: false, phone: true, website: false}}
                         formDisabled={{email: false, phone: false, website: true}}
                         onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <AddressCountry    formType={formType} 
                         formData={{address: renderData.shipping_address, country: renderData.country}}
                         formRequired={{address: true, country: true}}
                         formDisabled={{address: false, country: false}}
                         onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey==='address'?'shipping_address':owningKey, newValue)}/>
      <button type="submit" className="btn btn-primary btn-block">Submit</button>
    </form>
  );
}
 
export default ClientForm;



const handleSubmit = (evt, data)=>{
  evt.preventDefault();
  // console.log(evt)
  // console.log(evt.target)
  // console.log(evt.target.id)
  // // evt.stopPropagation();

  // var formData = new FormData(evt.target);

  // (new window.XmlHttpRequest()).postData(evt.target.getAttribute('action'), formData)
  // .then((res) => {
  //   // console.log(reduxStore.getState().clients)
  // })

  (new window.XmlHttpRequest()).postFormData(evt.target.getAttribute('action'), evt.target)
  .then((res) => {
    console.log(res)
  })











  if(data.id){
    console.info(`Updating client data with id ${data.id}`);
  }else{
    console.info(`Uploading new client data`);
  }
}