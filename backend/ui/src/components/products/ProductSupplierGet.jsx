import React from 'react';


const ProductSupplierGet = (props) => {
  return ( 
    <span>
      <span className='supplierSelection__supplier'>{props.supplier || 'Some Supplier'}:</span> 
      <span className='supplierSelection__pa-text'>PA</span> 
      <span className={`supplierSelection__price ${props.special ? 'text-light': 'text-danger'}`}>${props.pa || '9999'}</span> 
      <span className='supplierSelection__shipping-days'>(Shipping Days: {props.shdays || '20'})</span>
    </span>
  );
}
 
export default ProductSupplierGet;