import React from 'react';

import EditableFieldGeneral from './EditableFieldGeneral';




const EditableFieldCurrency = (props) => {


  /**********************************************************
   ********** Component Interface from props ****************
   **********************************************************/
  // i.e props must contain the following fields:
  // initialValue
  // fieldOwner
  // fieldName
  // fieldRequired
  // fieldPattern
  // placeholder
  // title
  // label
  // handleChange

  
  return ( 
    <EditableFieldGeneral fieldType={'number'}
                          fieldOwner={props.fieldOwner}
                          fieldName={props.fieldName}
                          fieldRequired={props.fieldRequired}
                          fieldCurrency={props.fieldCurrency || '$'}
                          fieldPattern={props.fieldPattern || '[0-9]+.[0-9]{1,2}'}
                          fieldTexts={{
                            'placeholder': props.placeholder,
                            'help': props.label,
                            'title': props.title
                          }}
                          fieldHandleChange={props.handleChange}
                          />
  );

}
 
export default EditableFieldCurrency;


