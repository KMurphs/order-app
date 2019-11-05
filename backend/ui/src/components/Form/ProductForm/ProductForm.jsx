import React, {useState} from 'react';
import './ProductForm.css';


import {useRenderDataFromPropsAndLocalChanges} from '../RenderDataFromPropsAndLocalChanges'
// import {handleSubmit} from '../Form/OrderAppForm'

import FormGroupProfilePic from '../FormGroupProfilePic';
import ProductTags from './ProductTags';
import ProductDetails from './ProductDetails';
import ProductSuppliers from './ProductSuppliers';
import ProductSizeQtyVariant from './ProductSizeQtyVariant';
import PicturePreviewSwiper from '../../PicturePreviewSwiper/PicturePreviewSwiper';



import EditableFieldTest from '../EditableFields/EditableFieldTest';
import EditableFieldText from '../EditableFields/EditableFieldText';




const ProductForm = (props) => {

  const formType = 'product'
  const formAction = 'products'
  const defaultPicture = '/imgs/NoImage.png'

  // Component's External Interface: Properties
  const {appIsOnline} = props
  const propsFormData = props.formData || {}
  const [displayedPicture, setDisplayedPicture] = useState(defaultPicture)
  const [getRenderDataUsingPropsOrLocalChanges, modifyRenderDataFromLocalChanges, modifyRenderDataFromLocalKeyValue] = useRenderDataFromPropsAndLocalChanges(propsFormData)
  let renderData = getRenderDataUsingPropsOrLocalChanges(propsFormData)

  const propsOnGetSuppliersLike = props.onGetSuppliersLike// || ((value)=>{console.log(`Trying to get suppliers that are like ${value}`); return []})

  return ( 
    <form className={`order-app-form ${formType}-form`}
          id={`${formType}-form`} 
          onSubmit={(e)=>handleSubmit(e, renderData, formType)/*.then(()=>props.onSubmit()).catch(()=>props.onSubmit())*/} 
          encType="multipart/form-data" 
          action={`${process.env.REACT_APP_BASE_URL}/${formAction}`} /*method="POST"*/>

      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>
      



      <div className="container-fluid">


        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <FormGroupProfilePic formType={formType} 
                                   formData={{img_path: displayedPicture}}
                                   formHidden={{'input': false}}
                                   onValueChange={(owningKey, newValue) => modifyRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
            </div>
            {/* <div style={{'maxWidth': '120px'}}>
              <ProductSizeQtyVariant formType={formType}
                                     formData={{size: renderData.size, qty: renderData.qty, variant: renderData.variant}}
                                     onValueChange={(owningKey, newValue) => modifyRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
            </div> */}
          </div>
        </div>

        

        <div className="container">
          <PicturePreviewSwiper pictures={renderData.product_images}
                                onNewSelection={(selectedPicture) => setDisplayedPicture(selectedPicture)}
                                onNewPicture={(pictures, lastPicture) => {setDisplayedPicture(lastPicture); modifyRenderDataFromLocalKeyValue(renderData, 'product_images', pictures)}}/>
        </div>



        <div className="container product-supplier-container">
          <br/>
          <br/>
          <ProductSuppliers formType={formType}
                            product_suppliers={renderData.product_suppliers}
                            prefered_supplier={renderData.prefered_supplier}
                            onNewSupplier={()=>modifyRenderDataFromLocalKeyValue(renderData, 'product_suppliers', [...renderData.product_suppliers,{}])}
                            onSupplierDeleted={(supplierIndex)=>modifyRenderDataFromLocalKeyValue(renderData, 'product_suppliers', renderData.filter((item, index)=>index!==supplierIndex))}
                            onSupplierPrefered={(supplierIndex)=>modifyRenderDataFromLocalKeyValue(renderData, 'prefered_supplier', renderData.product_suppliers[supplierIndex])}
                            onGetSuppliersLike={(value)=>propsOnGetSuppliersLike(value)}
                            onSupplierFieldChange={(supplierIndex, owningKey, newValue) => {
                              renderData.product_suppliers[supplierIndex][owningKey] = newValue
                              modifyRenderDataFromLocalKeyValue(renderData, 'product_suppliers', renderData.product_suppliers)
                            }}
                            />
        </div>

 

        <div className="container">
          <div className='container-fluid'>
            <EditableFieldText  fieldOwner='product'
                                fieldName='product-name'
                                initialValue={renderData.name}
                                fieldRequired={true}
                                placeholder='Enter Product Name'
                                label='Product Name'
                                handleChange={(newValue)=>modifyRenderDataFromLocalKeyValue(renderData, 'name', newValue)}/>
            <EditableFieldText  fieldOwner='product'
                                fieldName='product-alias'
                                initialValue={renderData.alias}
                                fieldRequired={true}
                                placeholder='Enter Product Alias'
                                label='Product Alias'
                                handleChange={(newValue)=>modifyRenderDataFromLocalKeyValue(renderData, 'alias', newValue)}/>
            <EditableFieldText  fieldOwner='product'
                                fieldName='product-category'
                                initialValue={renderData.category}
                                fieldRequired={true}
                                placeholder='Enter Product Category'
                                label='Product Category'
                                handleChange={(newValue)=>modifyRenderDataFromLocalKeyValue(renderData, 'category', newValue)}/>
            <EditableFieldText  fieldOwner='product'
                                fieldName='product-subcategory'
                                initialValue={renderData.subcategory}
                                fieldRequired={false}
                                placeholder='Enter Product Subcategory'
                                label='Product Subcategory'
                                handleChange={(newValue)=>modifyRenderDataFromLocalKeyValue(renderData, 'subcategory', newValue)}/>
          </div>
        </div>



        <div className="container">
          <ProductTags tags={renderData.product_tags} 
                       onNewTags={(newTags) => modifyRenderDataFromLocalKeyValue(renderData, 'tags', newTags)}/>
          <button type="submit" className="btn btn-primary btn-block" disabled={!appIsOnline}>Submit</button>
        </div> 



      </div>
    </form>
  );
}
 
export default ProductForm;





export function handleSubmit(evt, data, type){
  evt.preventDefault();
  console.log(data)


  let formData = new FormData(evt.target);
  for(let img of data.product_images){
    console.log(img)
    formData.append('files', img)
  }


  return new Promise((resolve, reject) => {
    if(data.id && data.id > 0){

      console.info(`Updating ${type} data with id ${data.id}`);
      (new window.XmlHttpRequest()).putFormData(`${evt.target.getAttribute('action')}/${data.id}`, evt.target)
      .then((res)=>resolve(res))
      .catch((err)=>reject(err))

    }else{

      console.info(`Uploading new ${type} data`);
      (new window.XmlHttpRequest()).handleFormData('post', evt.target.getAttribute('action'), formData)
      .then((res)=>resolve(res))
      .catch((err)=>reject(err))

    }
  })
}
