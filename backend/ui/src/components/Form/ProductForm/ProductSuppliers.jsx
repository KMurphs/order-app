import React from 'react';

import ProductSupplierGet from './ProductSupplierGet'
import {useRenderDataFromPropsAndLocalChanges} from '../RenderDataFromPropsAndLocalChanges'

import './ProductSuppliers.css'

const ProductSuppliers = (props) => {


  // Component's External Interface: Properties
  const suppliers = props.product_suppliers || [] 
  const preferedSupplier = props.prefered_supplier || {}
  // Component's External Interface: Methods
  const propsOnNewSupplier = props.onNewSupplier || (()=>{console.log(`Request for new supplier New Supplier`)})
  const propsOnSupplierDeleted = props.onSupplierDeleted || ((index)=>{console.log(`Supplier at index ${index} was deleted`)})
  const propsOnSupplierPrefered = props.onSupplierPrefered || ((index)=>{console.log(`Supplier at index ${index} was selected as preferred supplier`)})
  const propsOnSupplierFieldChange = props.onSupplierFieldChange || ((key, value)=>{console.log(`Supplier Field of key ${key} was changed to value ${value}`)})




  const preferedSupplierName = preferedSupplier.supplier_storename 
                              ? `${preferedSupplier.supplier_storename}` 
                              : `${preferedSupplier.supplier_surname || 'None'} ${preferedSupplier.supplier_firstnames || ''}`
  return ( 
    
    <div className="suppliers">
      <input type="checkbox" className="suppliers__checkbox" id="suppliers__checkbox"/>
      <label htmlFor="suppliers__checkbox" className="suppliers__label alert alert-dark">
         <div className="suppliers__header">
            <span className="suppliers__header-item suppliers__control"><i className="fas fa-caret-right"></i></span>
            <div className="suppliers__header-data-container">
              <div><span className="suppliers__header-data-container__text">Prefered Supplier: </span><span>{preferedSupplierName}</span><br/></div>
              <div>
                <span><span className="suppliers__header-data-container__text">PA: </span>{preferedSupplier.item_supplier_cost_usd || 0}</span>
                <span><span className="suppliers__header-data-container__text">PV: </span>{preferedSupplier.item_client_cost_usd || 0}</span>
                <span><span className="suppliers__header-data-container__text">Shipping Days: </span>{preferedSupplier.item_shipping_days || 'None'}</span>
              </div>
            </div>
          </div>
      </label>

      
      
        <div className="suppliers__body-container">
          <div className="suppliers__body">    
            <ul className="suppliers__units">
              <li className={'suppliers__unit--add'} onClick={propsOnNewSupplier}>
                <i className="fas fa-plus"></i>
                <span>Add Supplier</span>
              </li>
              {
                suppliers.map(
                  (supplier, index) => <ProductSupplierGet key={index} 
                                                          _key={index}
                                                          supplierData={supplier}
                                                          isActive={supplier.id === preferedSupplier.id}
                                                          onFieldChange={(owningKey, newValue)=>propsOnSupplierFieldChange(index, owningKey, newValue)}
                                                          onSelect={propsOnSupplierPrefered}
                                                          onDelete={propsOnSupplierDeleted}
                                                          />
                )
              }
            </ul>
          </div>           
        </div>


    </div>

  );
}
 
export default ProductSuppliers;