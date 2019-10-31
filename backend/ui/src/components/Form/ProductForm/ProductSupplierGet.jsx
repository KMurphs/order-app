import React from 'react';
import EditableFieldText from '../EditableFields/EditableFieldText';

const ProductSupplierGet = (props) => {


  const renderData = props.supplierData || {}
  const isActive = props.active || false
  const propsKey = props._key || -1


  const onFieldChange = props.onFieldChange || ((key, value)=>{console.log(`Element with key ${key} got new value ${value}`)})
  const onSelect = props.onSelect || ((elmtPropsKey)=>{console.log(`Supplier ${renderData.name} is selected as preferred supplier`)})
  const onDelete = props.onDelete || ((elmtPropsKey)=>{console.log(`Supplier ${renderData.name} is deleted`)})


  return ( 
    <li className={`suppliers__unit ${isActive?'suppliers__unit--active':''}`}>
      <div className="suppliers__preferred" style={{display:`${isActive?'block':'none'}`}}>Preferred Supplier</div>
      <div className="suppliers__name">
        <EditableFieldText  fieldOwner='product'
                                  fieldName='supplier-name'
                                  initialValue={renderData.name}
                                  fieldRequired={true}
                                  placeholder='Enter Supplier Name'
                                  label='Supplier Name'
                                  handleChange={(newValue)=>onFieldChange('name', newValue)}/>
      </div>
      <div className="suppliers__link">
        <EditableFieldText  fieldOwner='product'
                                    fieldName='supplier-link'
                                    initialValue={renderData.link}
                                    fieldRequired={true}
                                    placeholder='Enter Supplier Link'
                                    label='Supplier Link'
                                    handleChange={(newValue)=>onFieldChange('link', newValue)}/>
      </div>
      <hr/>
      <div className="suppliers__prices">
        <EditableFieldText  fieldOwner='product'
                                      fieldName='supplier-pa'
                                      initialValue={renderData.pa}
                                      fieldRequired={true}
                                      placeholder={`PA`}
                                      title={`Cost of Buying from Supplier`}
                                      label={`'Prix d'Achat'`}
                                      handleChange={(newValue)=>onFieldChange('pa', newValue)}/>
        <EditableFieldText  fieldOwner='product'
                                      fieldName='supplier-pv'
                                      initialValue={renderData.pv}
                                      fieldRequired={true}
                                      placeholder={`PV`}
                                      title={`Selling Cost of products bought from this Supplier`}
                                      label={`'Prix de Vente'`}
                                      handleChange={(newValue)=>onFieldChange('pv', newValue)}/>  
        <div title='Gain Margin' className="suppliers__prices--gain">
          <span>Gain: {parseFloat(renderData.pv || 0) - parseFloat(renderData.pa || 0)}</span>
        </div>
        
      </div>
      <hr/>
      <div className="suppliers__bareshipping">
        <EditableFieldText  fieldOwner='product'
                                      fieldName='supplier-shipping-duration'
                                      initialValue={renderData.shippingDuration}
                                      fieldRequired={true}
                                      placeholder={`Shipping Days`}
                                      label={`Shipping Duration`}
                                      handleChange={(newValue)=>onFieldChange('shippingDuration', newValue)}/>  
        <EditableFieldText  fieldOwner='product'
                                      fieldName='supplier-itembarecost'
                                      initialValue={renderData.itembarecost}
                                      fieldRequired={true}
                                      placeholder={`Unit Cost`}
                                      title={`Price of one item without Shipping`}
                                      label={`Item Bare Cost`}
                                      handleChange={(newValue)=>onFieldChange('itembarecost', newValue)}/>
        <EditableFieldText  fieldOwner='product'
                                      fieldName='supplier-shippingbarecost'
                                      initialValue={renderData.shippingbarecost}
                                      fieldRequired={true}
                                      placeholder={`Shipping Cost`}
                                      title={`Price of Shipping one item `}
                                      label={`Item Shipping Cost`}
                                      handleChange={(newValue)=>onFieldChange('shippingbarecost', newValue)}/>  

      </div>
      <hr/>
      <div className="suppliers__remove" onClick={()=>onDelete(propsKey)}>
        <i className="fas fa-trash-alt"></i>
      </div>
      <div className="suppliers__select" onClick={()=>onSelect(propsKey)}>
        <span>Click to Set as Prefered</span>
      </div>
    </li>
  );
}
 
export default ProductSupplierGet;