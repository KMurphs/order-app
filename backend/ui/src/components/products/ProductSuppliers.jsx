import React from 'react';

import ProductSupplierGet from './ProductSupplierGet'

const ProductSuppliers = (props) => {
  return ( 
    
    <div className="dropdown d-flex flex-column align-items-stretch justify-content-start">
      <button className="btn btn-secondary dropdown-toggle dropdown-toggle-productsupplier" type="button" id="supplierSelection" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className='supplierSelection__summary'>Preferred Supplier:</span> 
        <ProductSupplierGet special/>
      </button>
      <div className="dropdown-menu" aria-labelledby="supplierSelection">
        <span className="dropdown-item-text">Choose Prefered Supplier for this product. Provided that the supplier has already been added</span>
        <button className="dropdown-item" ><ProductSupplierGet/></button>
        <button className="dropdown-item active" ><ProductSupplierGet special/></button>
        <button className="dropdown-item" ><ProductSupplierGet/></button>
        <button className="dropdown-item" ><ProductSupplierGet/></button>
      </div>
    </div>

  );
}
 
export default ProductSuppliers;