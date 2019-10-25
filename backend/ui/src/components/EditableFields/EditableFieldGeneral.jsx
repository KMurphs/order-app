import React, {useState} from 'react';
import './EditableField.css';




const EditableFieldGeneral = (props) => {

  // Local Content generated within this component
  // It will persist as long as no new data is force down by the control component
  const [content, setContent] = useState('') 
  const [isBeingEdited, setIsBeingEdited] = useState(false) 



  // Read value forced down from control component, and if changed, reinitialize local content to this new value
  const propsInitialContent = props.initialContent || ''
  const [contentFromControlComponent, setContentFromControlComponent] = useState(propsInitialContent)
  if(contentFromControlComponent !== propsInitialContent){
    setContentFromControlComponent(propsInitialContent)
    setContent(propsInitialContent)
  }



  // props interface members with default values
  const fieldOwner = props.fieldOwner || ' '
  const fieldName = props.fieldName || 'Field Name'

  const fieldType = props.fieldType || 'text'
  const fieldPattern = props.fieldPattern || ".*"
  const fieldCurrency = props.fieldCurrency
  const fieldRequired = props.fieldRequired || false

  const fieldTexts = {'placeholder':props.fieldTexts.placeholder || `Enter Field Content Here`,'help': props.fieldTexts.help || `Field Name`}
  const fieldHandleChange = props.handleChange || ((value)=>console.log(`${fieldName} value changed to ${value}`))



  // Component JSX/HTML code
  return ( 

    <div className="form-group">
      <small id={`${fieldName}Help`} className="form-text text-muted">{fieldTexts.help}</small>
      <div className={`input-group-sm d-flex input-group-no-borders ${isBeingEdited?'input-group-no-borders--editable':''}`}>



        <div className="input-group-prepend" style={{display:`${fieldCurrency?'inherit':'none'}`}}>
          <span className="input-group-text">{fieldCurrency}</span>
        </div>


        <input  type={`${fieldType}`} 
                className="form-control" 
                name={`${fieldName}`} 
                disabled={!isBeingEdited}
                id={`${fieldOwner}-form__${fieldName}`}
                aria-describedby={`${fieldName}Help`} 
                placeholder={fieldTexts.placeholder}  
                pattern={fieldPattern}  
                onChange={(evt)=>{setContent(evt.target.value);fieldHandleChange(evt.target.value)}} 
                value={content}
                required={fieldRequired}/>



        <div className="input-group-append"
             onClick={(evt)=>{setIsBeingEdited(isBeingEdited => !isBeingEdited);evt.preventDefault();evt.stopPropagation()}}>
          <span className="input-group-text" id={`${fieldName}Help`} ><i className={`fas fa-${isBeingEdited?'check':'edit'}`}></i></span>
        </div>



      </div>
    </div>
  );

}
 
export default EditableFieldGeneral;


