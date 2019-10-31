import React from 'react';

import EditableFieldGeneral from './EditableFieldGeneral';




const EditableFieldCurrency = (props) => {
  
  return ( 
    <EditableFieldGeneral fieldType={'number'}
                          fieldOwner={props.fieldOwner}
                          fieldName={props.fieldName}
                          fieldRequired={props.fieldRequired}
                          fieldCurrency={props.fieldCurrency || '$'}
                          fieldPattern={props.fieldPattern || '[0-9]+'}
                          fieldTexts={{'placeholder': props.placeholder || 'Amount' ,'help': props.label || `Amount for Field`}}
                          fieldHandleChange={props.handleChange}
                          />
  );

}
 
export default EditableFieldCurrency;


