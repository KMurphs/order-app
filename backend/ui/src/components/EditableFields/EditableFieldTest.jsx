import React, {useState} from 'react';


import EditableFieldText from './EditableFieldText';
import EditableFieldPhone from './EditableFieldPhone';
import EditableFieldCurrency from './EditableFieldCurrency';



const EditableFieldTest = (props) => {

  return ( 
      <div style={{width: '30%'}}>
        <EditableFieldText/>
        <EditableFieldPhone/>
        <EditableFieldCurrency/>
      </div>
  );
}
 
export default EditableFieldTest;



