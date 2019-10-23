import React from 'react';
import './ProductForm.css';

import FormGroupProfilePic from '../Form/FormGroupProfilePic';
import ProductTags from './ProductTags';
import ProductDetails from './ProductDetails';
import ProductSuppliers from './ProductSuppliers';
import ProductSizeQtyVariant from './ProductSizeQtyVariant';
import PicturePreviewSwiper from '../PicturePreviewSwiper/PicturePreviewSwiper';


const ProductForm = (props) => {
  const formType = 'product'
  return ( 
    <form className={`order-app-form ${formType}-form`}>
      <h3 className="display-4">{formType.charAt(0).toUpperCase() + formType.slice(1)} Details</h3>
      <br/>
      <div className="container-fluid">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <FormGroupProfilePic/>
            </div>
            <div style={{'maxWidth': '120px'}}>
              <ProductSizeQtyVariant formType={formType}/>
            </div>
          </div>
        </div>
        <div className="container">
          <PicturePreviewSwiper pictures={[{
            src: '/img/product-1.png',
            alt: 'test Alt'
          },{
            src: '/img/product-2.png',
            alt: 'test Alt'
          },{
            src: '/img/product-3.png',
            alt: 'test Alt'
          },{
            src: '/img/product-4.png',
            alt: 'test Alt'
          },{
            src: '/img/product-5.png',
            alt: 'test Alt'
          },{
            src: '/img/product-6.png',
            alt: 'test Alt'
          },{
            src: '/img/product-7.png',
            alt: 'test Alt'
          },{
            src: '/img/product-8.png',
            alt: 'test Alt'
          }]}/>
        </div>
        <div className="container">
          <br/>
          <br/>
          <ProductSuppliers/>
        </div>
        <div className="container">
          <ProductDetails formType={formType}/>
        </div>
        <div className="container">
          <ProductTags/>
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </div>
      </div>
    </form>
  );
}
 
export default ProductForm;