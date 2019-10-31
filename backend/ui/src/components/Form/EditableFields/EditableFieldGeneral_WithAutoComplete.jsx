import React, {useState} from 'react';
import './EditableField.css';
import './EditableFieldWithAutoComplete.css';

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];



const EditableFieldGeneralWithAutoComplete = (props) => {

  // Local Content generated within this component
  // It will persist as long as no new data is force down by the control component
  const [content, setContent] = useState('') 
  const [isBeingEdited, setIsBeingEdited] = useState(false) 
  const [isBeingWrittenTo, setIsBeingWrittenTo] = useState(false) 
  const [autoCompleteItemsCounter, setAutoCompleteItemsCounter] = useState(-1) 
  const [displayedData, setDisplayedData] = useState([]) 



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
  const fieldRequired = props.fieldRequired || false

  const propsFieldTexts = props.fieldTexts || {}
  const fieldTexts = {
    'placeholder': propsFieldTexts.placeholder || `Enter Field Content Here`,
    'help': propsFieldTexts.help || `Field Name`, 
    'title': propsFieldTexts.title || propsFieldTexts.placeholder
  }
  const fieldHandleChange = props.fieldHandleChange || ((value)=>console.log(`${fieldName} value changed to ${value}`))








  // auto complete keydown handler
  var handleAutocompleteKeyDown = (evt) => {


    if(evt.keyCode === 38){
      //arrow DOWN Key pressed
      evt.preventDefault();
      let _autoCompleteItemsCounter = autoCompleteItemsCounter - 1
      setAutoCompleteItemsCounter(_autoCompleteItemsCounter < 0 ? displayedData.length - 1 : _autoCompleteItemsCounter) 


    }else if(evt.keyCode === 40){
      //arrow UP Key pressed
      evt.preventDefault();
      let _autoCompleteItemsCounter = autoCompleteItemsCounter + 1
      setAutoCompleteItemsCounter(_autoCompleteItemsCounter >= displayedData.length ? 0 : _autoCompleteItemsCounter) 


    }else if(evt.keyCode === 13){
      evt.preventDefault();
      if(autoCompleteItemsCounter >= 0 && autoCompleteItemsCounter < displayedData.length){
        // Simulate on click event, Select current entry and display it in the input field
        setContent(displayedData[autoCompleteItemsCounter]); 
        // Close auto complete div
        setIsBeingWrittenTo(false);
      }

    }else {

      // For any other character, reopen auto complete div, and reset counter
      setAutoCompleteItemsCounter(-1)
      setIsBeingWrittenTo(true)


      // Make a shadow copy of content since the current char has not been affected the input field value or content
      // which mirrors it. We will have to manually build content using the char that's newly entered
      let _content = `${content}` // Shadow copy of content
      if(evt.keyCode >= 65 && evt.keyCode <= 91){
        // Manually add alphabet chars to shadow copy (a...z)
        _content = `${content}${String.fromCharCode(evt.keyCode)}`

      }else if(evt.keyCode === 8){
        // Manually perform 'backspace' operation
        _content = `${content.substr(0, content.length - 1)}`

      }else if(evt.keyCode === 46){
        // Manually perform 'delete' operation
        _content = `${content.substr(1)}`

      }
      

      // Using content's updated shadow copy, filter the data array to only display the relevant entries
      let _displayedData = countries.filter(item => item.substr(0, _content.length).toUpperCase() === _content.toUpperCase())
      if(JSON.stringify(_displayedData) !== JSON.stringify(displayedData)){
        // If relevant entries differ from what already on the UI, force a re-render
        setDisplayedData(displayedData => _displayedData)
      }
    }
  }








  // Component JSX/HTML code
  return ( 

    <div className="form-group" >
      <small id={`${fieldName}Help`} className="form-text text-muted">{fieldTexts.help}</small>
      <div className={`input-group-sm d-flex input-group-no-borders ${isBeingEdited?'input-group-no-borders--editable':''} autocomplete`}>



        <input  type={`${fieldType}`} 
                className="form-control" 
                name={`${fieldName}`} 
                disabled={!isBeingEdited}
                id={`${fieldOwner}-form__${fieldName}`}
                aria-describedby={`${fieldName}Help`} 
                title={fieldTexts.title}
                placeholder={fieldTexts.placeholder}  
                pattern={fieldPattern}  
                onChange={(evt)=>{setContent(evt.target.value);fieldHandleChange(evt.target.value)}} 
                value={content}
                autoComplete="off"
                onKeyDown={handleAutocompleteKeyDown}
                required={fieldRequired}/>



        <div id="form-control-autocomplete-list" className="autocomplete-items" style={{'display':`${isBeingWrittenTo?'block':'None'}`}}>
          {
            displayedData
            .map((item, index) => {
              return (
                <div  key={index}
                      _index={index}
                      className={`${index===autoCompleteItemsCounter?'autocomplete-active':''}`}
                      onClick={(evt)=>{ setContent(item); setIsBeingWrittenTo(false) }}> 
                  <strong>{item.substr(0, content.length)}</strong>{item.substr(content.length)}
                </div>
              )

            }) 
          }
        </div>



        <div className="input-group-append"
             onClick={(evt)=>{setIsBeingEdited(isBeingEdited => !isBeingEdited);evt.preventDefault();evt.stopPropagation()}}>
          <span className="input-group-text" id={`${fieldName}Help`} ><i className={`fas fa-${isBeingEdited?'check':'edit'}`}></i></span>
        </div>



      </div>
    </div>
  )


}
 
export default EditableFieldGeneralWithAutoComplete;


