import React from 'react';

import EditableFieldGeneral from './EditableFieldGeneral';




const EditableFieldPhone = (props) => {
  
  return ( 
    <EditableFieldGeneral fieldType={'number'}
                          fieldOwner={props.fieldOwner}
                          fieldName={props.fieldName}
                          fieldRequired={props.fieldRequired}
                          fieldPattern={props.fieldPattern || '[0-9]{4,5}-[0,9]{9}'}
                          fieldTexts={{'placeholder': props.placeholder || 'e.g.  0027-762564856' ,'help':props.label || 'Phone Number'}}
                          fieldHandleChange={props.handleChange}
                          />
  );

}
 
export default EditableFieldPhone;


