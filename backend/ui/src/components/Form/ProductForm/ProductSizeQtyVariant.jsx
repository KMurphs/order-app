import React from 'react';


const ProductSizeQtyVariant = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group" style={{'margin': '0'}}>
        <label htmlFor={props.formType + "-form__qty"}>Quantity</label>
        <input type="number" 
               className="form-control" 
               id={props.formType + "-form__qty"} 
               aria-describedby="qtyHelp" 
               placeholder="Qty" 
               onChange={(evt)=>props.onValueChange('qty', evt.target.value)} 
               value={props.formData.qty || 0} 
               min="0"/>
        <small id="qtyHelp" className="form-text text-muted">{props.formType} Quantity</small>
      </div>
      <div className="form-group" style={{'margin': '0'}}>
        <label htmlFor={props.formType + "-form__size"}>Size</label>
        <input type="text" 
               className="form-control" 
               id={props.formType + "-form__size"} 
               aria-describedby="sizeHelp" 
               onChange={(evt)=>props.onValueChange('size', evt.target.value)} 
               value={props.formData.size || ''} 
               placeholder="Enter Size"/>
        <small id="sizeHelp" className="form-text text-muted">{props.formType}'s Size</small>
      </div>
      <div className="form-group" style={{'margin': '0'}}>
        <label htmlFor={props.formType + "-form__variant"}>Variant</label>
        <input type="text" 
               className="form-control" 
               id={props.formType + "-form__variant"} 
               aria-describedby="variantHelp" 
               onChange={(evt)=>props.onValueChange('variant', evt.target.value)} 
               value={props.formData.variant || ''} 
               placeholder="Enter Variant"/>
        <small id="variantHelp" className="form-text text-muted">{props.formType}'s Variant (e.g. Color)</small>
      </div>
      <hr/>
    </React.Fragment>
  );
}
 
export default ProductSizeQtyVariant;