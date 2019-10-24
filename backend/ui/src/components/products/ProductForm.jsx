import React, {useState} from 'react';
import './ProductForm.css';


import {useRenderDataFromPropsAndLocalChanges} from '../Form/RenderDataFromPropsAndLocalChanges'
import {handleSubmit} from '../Form/OrderAppForm'

import FormGroupProfilePic from '../Form/FormGroupProfilePic';
import ProductTags from './ProductTags';
import ProductDetails from './ProductDetails';
import ProductSuppliers from './ProductSuppliers';
import ProductSizeQtyVariant from './ProductSizeQtyVariant';
import PicturePreviewSwiper from '../PicturePreviewSwiper/PicturePreviewSwiper';



const ProductForm = (props) => {
  const formType = 'product'
  const formAction = 'products'
  const {appIsOnline} = props
  const defaultPicture = '/imgs/NoImage.png'

  const [displayedPicture, setDisplayedPicture] = useState(defaultPicture)
  const [getRenderDataFromCurrentProps, , setRenderDataFromLocalKeyValue] = useRenderDataFromPropsAndLocalChanges(props.formData)
  let renderData = getRenderDataFromCurrentProps(props.formData || {})
  console.log(renderData)
  // console.log(displayedPicture)


  return ( 
    <form className={`order-app-form ${formType}-form`}
          id={`${formType}-form`} 
          onSubmit={(e)=>handleSubmit(e, renderData, formType).then(()=>props.onSubmit()).catch(()=>props.onSubmit())} 
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
                                   formHidden={{'input': true}}
                                   onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
            </div>
            {/* <div style={{'maxWidth': '120px'}}>
              <ProductSizeQtyVariant formType={formType}
                                     formData={{size: renderData.size, qty: renderData.qty, variant: renderData.variant}}
                                     onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
            </div> */}
          </div>
        </div>

        
        <div className="container">
          <PicturePreviewSwiper pictures={renderData.product_images}
                                onNewSelection={(selectedPicture) => setDisplayedPicture(selectedPicture)}
                                onNewPicture={(pictures, lastPicture) => {setDisplayedPicture(lastPicture); console.log('---------------------');setRenderDataFromLocalKeyValue(renderData, 'product_images', pictures)}}/>
        </div>

        <div className="container">
          <br/>
          <br/>
          <ProductSuppliers formType={formType}
                            formData={{suppliers: renderData.suppliers}}
                            onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
        </div>


        <div className="container">
          <ProductDetails formType={formType}
                          formData={{name: renderData.name, alias: renderData.alias, category: renderData.category, subcategory: renderData.subcategory}}
                          onValueChange={(owningKey, newValue) => setRenderDataFromLocalKeyValue(renderData, owningKey, newValue)}/>
        </div>


        <div className="container">
          <ProductTags tags={renderData.product_tags} 
                       onNewTags={(newTags) => setRenderDataFromLocalKeyValue(renderData, 'tags', newTags)}/>
          <button type="submit" className="btn btn-primary btn-block" disabled={!appIsOnline}>Submit</button>
        </div>


      </div>
    </form>
  );
}
 
export default ProductForm;



