import React from 'react';
import './OrderAppForm.css';

import {useRenderDataFromPropsAndLocalChanges} from './RenderDataFromPropsAndLocalChanges'

import FormGroupID from './FormGroupID';
import FormGroupAddress from './FormGroupAddress';
import FormGroupContact from './FormGroupContact';
import FormGroupProfilePic from './FormGroupProfilePic';

String.prototype.toCapitals = function(){
  return this.split(' ').map(word => word.charAt(0).toUpperCase()+word.substring(1).toLowerCase()).join(' ')
}

const OrderAppForm = (props) => {
  const {formType, formAction, appIsOnline} = props
  const formHidden = !props.formHidden ? {} : props.formHidden
  const formRequired = !props.formRequired ? {} : props.formRequired

  console.log(formType)
  console.log(formAction)
  console.log(appIsOnline)
  console.log(props)

  const [getRenderDataFromCurrentProps, , setRenderDataFromLocalKeyValue] = useRenderDataFromPropsAndLocalChanges(props.formData)
  let renderData = getRenderDataFromCurrentProps(props.formData)




  return ( 
    <form className={`order-app-form ${formType}-form`} 
          id={`${formType}-form`} 
          onSubmit={(e)=>handleSubmit(e, renderData, formType).then(()=>props.onSubmit()).catch(()=>props.onSubmit())} 
          encType="multipart/form-data" 
          action={`${process.env.REACT_APP_BASE_URL}/${formAction}`} /*method="POST"*/>


      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>


      <input type="text" name="id" value={`${renderData.id}`} onChange={(evt)=>setRenderDataFromLocalKeyValue(renderData, 'id', evt.target.value)} style={{'display':'none'}}/>
      <FormGroupProfilePic formType={formType} 
                           formData={{img_path: renderData.img_path}}
                           onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <FormGroupID         formType={formType} 
                           formData={{surname: renderData.surname, firstnames: renderData.firstnames, storename: renderData.storename}}
                           formRequired={formRequired}
                           formHidden={formHidden}
                           onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <FormGroupContact    formType={formType} 
                           formData={{email: renderData.email, phone: renderData.phone, website: renderData.website}}
                           formRequired={formRequired}
                           formHidden={formHidden}
                           onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <FormGroupAddress    formType={formType} 
                           formData={{address: renderData.address, country: renderData.country}}
                           formRequired={formRequired}
                           formHidden={formHidden}
                           onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
      <button type="submit" className="btn btn-primary btn-block" disabled={!appIsOnline}>Submit</button>
    </form>
  );






  function handleSubmit(evt, data, type){
    evt.preventDefault();
    
    return new Promise((resolve, reject) => {
      if(data.id){
  
        console.info(`Updating ${type} data with id ${data.id}`);
        (new window.XmlHttpRequest()).putFormData(`${evt.target.getAttribute('action')}/${data.id}`, evt.target)
        .then((res)=>resolve(res))
        .catch((err)=>reject(err))

      }else{
  
        console.info(`Uploading new ${type} data`);
        (new window.XmlHttpRequest()).postFormData(evt.target.getAttribute('action'), evt.target)
        .then((res)=>resolve(res))
        .catch((err)=>reject(err))

      }
    })
  }
}
 
export default OrderAppForm;



