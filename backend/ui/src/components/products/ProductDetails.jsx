import React from 'react';


const ProductDetails = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__name"}>Product Name</label>
        <input type="text" 
               className="form-control" 
               id={props.formType + "-form__name"} 
               aria-describedby="nameHelp" 
               required
               onChange={(evt)=>props.onValueChange('name', evt.target.value)} 
               value={props.formData.name || ''} 
               placeholder="Enter Full Name"/>
        <small id="nameHelp" className="form-text text-muted">{props.formType}'s Full Name</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__alias"}>Product Alias</label>
        <input type="text" 
               className="form-control" 
               id={props.formType + "-form__alias"} 
               aria-describedby="aliasHelp" 
               required
               onChange={(evt)=>props.onValueChange('alias', evt.target.value)} 
               value={props.formData.alias || ''} 
               placeholder="Enter Alias"/>
        <small id="aliasHelp" className="form-text text-muted">{props.formType}'s Alias (Short Name Easily Remembered)</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__category"}>Main Category</label>
        <input type="text" 
               className="form-control" 
               id={props.formType + "-form__category"} 
               aria-describedby="categoryHelp" 
               required
               onChange={(evt)=>props.onValueChange('category', evt.target.value)} 
               value={props.formData.category || ''} 
               placeholder="Enter Product's Main Category"/>
        <small id="categoryHelp" className="form-text text-muted">{props.formType}'s Main Category (i.e. 'Clothes')</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__subcategory"}>Sub Category</label>
        <input type="text" 
               className="form-control" 
               id={props.formType + "-form__subcategory"} 
               aria-describedby="subcategoryHelp" 
               onChange={(evt)=>props.onValueChange('subcategory', evt.target.value)} 
               value={props.formData.subcategory || ''} 
               placeholder="Enter Product's Sub Category"/>
        <small id="subcategoryHelp" className="form-text text-muted">{props.formType}'s Sub Category (i.e. 'Dress')</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default ProductDetails;