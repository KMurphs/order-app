import React from 'react';

import EditableFieldGeneral from './EditableFieldGeneral';




const EditableFieldText = (props) => {

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
  // label
  // handleChange

  return ( 
    <EditableFieldGeneral fieldType={'text'}
                          initialContent={props.initialValue}
                          fieldOwner={props.fieldOwner}
                          fieldName={props.fieldName}
                          fieldRequired={props.fieldRequired}
                          fieldPattern={props.fieldPattern}
                          fieldTexts={{
                            'placeholder': props.placeholder,
                            'help': props.label
                          }}
                          fieldHandleChange={props.handleChange}
                          />
  );

}
 
export default EditableFieldText;


