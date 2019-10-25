import React from 'react';

import ProductSupplierGet from './ProductSupplierGet'

import './ProductSuppliers.css'

const ProductSuppliers = (props) => {
  let suppliersData = props.suppliers || {}
  return ( 
    
    <div class="suppliers">
      <input type="checkbox" class="suppliers__checkbox" id="suppliers__checkbox"/>
      <label for="suppliers__checkbox" class="suppliers__label alert alert-dark">
         <div class="suppliers__header">
            <span class="suppliers__header-item suppliers__control"><i className="fas fa-caret-right"></i></span>
            <div className="suppliers__header-data-container">
              <div><span className="suppliers__header-data-container__text">Prefered Supplier: </span><span>dsfsdfsdfsdf</span><br/></div>
              <div>
                <span><span className="suppliers__header-data-container__text">PA: </span>4534</span>
                <span><span className="suppliers__header-data-container__text">PV: </span>4534</span>
                <span><span className="suppliers__header-data-container__text">Shipping Days: </span>4534</span>
              </div>
            </div>

           
           
          </div>
      </label>

      
      
        <div class="suppliers__body-container">
          <div class="suppliers__body">    
            <ul className="suppliers__units">
              <li className={'suppliers__unit--add'}>
                <i className="fas fa-plus"></i>
                <span>Add Supplier</span>
              </li>
              <ProductSupplierGet/>
              <ProductSupplierGet active/>
              <ProductSupplierGet/>
            </ul>
          </div>           
        </div>

      
      


    </div>

  );
}
 
export default ProductSuppliers;