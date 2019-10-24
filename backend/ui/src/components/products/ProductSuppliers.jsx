import React from 'react';

import ProductSupplierGet from './ProductSupplierGet'

const ProductSuppliers = (props) => {
  let suppliersData = props.suppliers || {}
  return ( 
    
    <div className="dropdown d-flex flex-column align-items-stretch justify-content-start">


      <button className="btn btn-secondary dropdown-toggle dropdown-toggle-productsupplier" type="button" id="supplierSelection" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className='supplierSelection__summary'>Preferred Supplier:</span> 
        <ProductSupplierGet special supplierData={Object.values(suppliersData).filter(item => item.isPrefered === true)[0]} isHidden={Object.values(suppliersData).length === 0}/>
      </button>


      <div className="dropdown-menu" aria-labelledby="supplierSelection">
        <span className="dropdown-item-text">Choose Prefered Supplier for this product. Provided that the supplier has already been added</span>
        {
          Object.values(suppliersData).map((item, index) => 
            <button className={`dropdown-item ${item.isPrefered?'active':''}`} key={index}><ProductSupplierGet supplierData={item} special={item.isPrefered}/></button>
          )
        }
      </div>

      
    </div>

  );
}
 
export default ProductSuppliers;