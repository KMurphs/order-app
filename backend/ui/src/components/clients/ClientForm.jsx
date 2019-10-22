import React from 'react';
import './ClientForm.css';

import {useRenderDataFromPropsAndLocalChanges} from '../../utilsFunctions/RenderDataFromPropsAndLocalChanges'

import ProfilePicture from '../utils/ProfilePicture';
import AddressCountry from '../utils/AddressCountry';
import EmailPhoneWebsite from '../utils/EmailPhoneWebsite';
import SurnameFirstnames from '../utils/SurnameFirstnames';


const ClientForm = (props) => {
  const formType = 'client'


  const [getRenderDataFromCurrentProps, , setRenderDataFromLocalKeyValue] = useRenderDataFromPropsAndLocalChanges(props.clientData)
  let renderData = getRenderDataFromCurrentProps(props.clientData)



  console.log(renderData)
  return ( 
    <form className={`order-app-form ${formType}-form`} id='client-form' onSubmit={(e)=>handleSubmit(e, renderData).then(()=>props.onSubmit())} encType="multipart/form-data" action={`${process.env.REACT_APP_BASE_URL}/clients`} /*method="POST"*/>
      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>
      {/* <input type="text" name="id" defaultValue={renderData.id} disabled style={{'display':'none'}}/> */}
      <input type="text" name="id" value={`${renderData.id}`} onChange={(evt)=>setRenderDataFromLocalKeyValue(renderData, 'id', evt.target.value)} style={{'display':'none'}}/>
      <ProfilePicture    formType={formType} 
                         formData={{img_path: renderData.img_path}}
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



function handleSubmit(evt, data){
  evt.preventDefault();
  
  return new Promise((resolve, reject) => {
    if(data.id){

      console.info(`Updating client data with id ${data.id}`);
      (new window.XmlHttpRequest()).putFormData(`${evt.target.getAttribute('action')}/${data.id}`, evt.target)
      .then((res)=>resolve(res))
      .catch((err)=>reject(err))

    }else{

      console.info(`Uploading new client data`);
      (new window.XmlHttpRequest()).postFormData(evt.target.getAttribute('action'), evt.target)
      .then((res)=>resolve(res))
      .catch((err)=>reject(err))

    }
  })
}