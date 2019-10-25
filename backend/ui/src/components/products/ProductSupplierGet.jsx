import React from 'react';
import EditableFieldText from '../EditableFields/EditableFieldText';

const ProductSupplierGet = (props) => {
  const isActive = props.active || false
  return ( 
    <li className={`suppliers__unit ${isActive?'suppliers__unit--active':''}`}>
      <div className="suppliers__preferred" style={{display:`${isActive?'block':'none'}`}}>Preferred Supplier</div>
      <div className="suppliers__name"><EditableFieldText/></div>
      <div className="suppliers__link"><EditableFieldText/></div>
      <hr/>
      <div className="suppliers__prices"><EditableFieldText/><EditableFieldText/><EditableFieldText/></div>
      <hr/>
      <div className="suppliers__bareshipping"><EditableFieldText/><EditableFieldText/><EditableFieldText/></div>
      <hr/>
    </li>
  );
}
 
export default ProductSupplierGet;