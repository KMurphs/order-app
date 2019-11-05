import React from 'react';

import PrEditableFieldTextWithAutoComplete from './_EditableFieldTextWithAutoComplete';




const EditableFieldTextWithAutoComplete = (props) => {

  /**********************************************************
   ********** Component Interface from props ****************
   **********************************************************/
  // i.e props must contain the following fields:
  // fieldOwner
  // fieldName
  // fieldRequired
  // fieldPattern
  // placeholder
  // title
  // label
  // handleChange
  // getAutoCompleteData

  return ( 
    <PrEditableFieldTextWithAutoComplete fieldOwner={props.fieldOwner}
                                        fieldName={props.fieldName}
                                        fieldRequired={props.fieldRequired}
                                        fieldPattern={props.fieldPattern}
                                        fieldTexts={{
                                          'placeholder': props.placeholder,
                                          'help': props.label,
                                          'title': props.title
                                        }}
                                        fieldHandleChange={props.handleChange}
                                        getAutoCompleteData={props.getAutoCompleteData}
                                        />
  );

}
 
export default EditableFieldTextWithAutoComplete;