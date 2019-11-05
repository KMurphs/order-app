import React from 'react';


import EditableFieldText from './EditableFieldText';
import EditableFieldPhone from './EditableFieldPhone';
import EditableFieldCurrency from './EditableFieldCurrency';
import EditableFieldTextWithAutoComplete from './EditableFieldTextWithAutoComplete';



const EditableFieldTest = (props) => {

  return ( 
      <div style={{width: '30%'}}>
        <EditableFieldText/>
        <EditableFieldPhone/>
        <EditableFieldCurrency/>
        <EditableFieldTextWithAutoComplete/>
      </div>
  );
}
 
export default EditableFieldTest;



