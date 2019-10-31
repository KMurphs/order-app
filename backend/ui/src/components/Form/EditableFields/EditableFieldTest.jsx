import React, {useState} from 'react';


import EditableFieldText from './EditableFieldText';
import EditableFieldPhone from './EditableFieldPhone';
import EditableFieldCurrency from './EditableFieldCurrency';
import EditableFieldGeneralWithAutoComplete from './EditableFieldGeneral_WithAutoComplete';



const EditableFieldTest = (props) => {

  return ( 
      <div style={{width: '30%'}}>
        <EditableFieldText/>
        <EditableFieldPhone/>
        <EditableFieldCurrency/>
        <EditableFieldGeneralWithAutoComplete/>
      </div>
  );
}
 
export default EditableFieldTest;



