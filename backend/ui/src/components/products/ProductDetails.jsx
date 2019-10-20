import React from 'react';


const ProductDetails = (props) => {
  return ( 
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__name"}>Product Name</label>
        <input type="text" className="form-control" id={props.formType + "-form__name"} aria-describedby="nameHelp" placeholder="Enter Full Name"/>
        <small id="nameHelp" className="form-text text-muted">{props.formType}'s Full Name</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__alias"}>Product Alias</label>
        <input type="text" className="form-control" id={props.formType + "-form__alias"} aria-describedby="aliasHelp" placeholder="Enter Alias"/>
        <small id="aliasHelp" className="form-text text-muted">{props.formType}'s Alias (Short Name Easily Remembered)</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__category"}>Main Category</label>
        <input type="text" className="form-control" id={props.formType + "-form__category"} aria-describedby="categoryHelp" placeholder="Enter Product's Main Category"/>
        <small id="categoryHelp" className="form-text text-muted">{props.formType}'s Main Category (i.e. 'Clothes')</small>
      </div>
      <div className="form-group">
        <label htmlFor={props.formType + "-form__subcategory"}>Sub Category</label>
        <input type="text" className="form-control" id={props.formType + "-form__subcategory"} aria-describedby="subcategoryHelp" placeholder="Enter Product's Sub Category"/>
        <small id="subcategoryHelp" className="form-text text-muted">{props.formType}'s Sub Category (i.e. 'Dress')</small>
      </div>
      <hr/>
      <br/>
    </React.Fragment>
  );
}
 
export default ProductDetails;