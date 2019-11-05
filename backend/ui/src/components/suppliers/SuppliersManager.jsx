import React, {useState} from 'react';

import {reduxGetSuppliers} from '../../datastore';
import SupplierList from './SupplierList';
import SupplierForm from '../Form/OrderAppForm';

const SupplierManager = (props) => {

  // Initialize variables
  const [isSupplierListRetrieved, setIsSupplierListRetrieved] = useState(false)
  const [supplierFormData, setSupplierFormData] = useState({})


  

  // Get Supplier List if not already present 
  if(!isSupplierListRetrieved){
    reduxGetSuppliers()
    .then((res) => setIsSupplierListRetrieved(true)) // Force a re-render with retrieved Supplier data
  }




  // Return react component's html
  return ( 
    <div className="container-fluid container-page d-flex flex-column flex-md-row justify-content-start justify-content-md-space-around align-items-stretch align-items-md-start">
      <React.Fragment>
        <SupplierList list={reduxGetSuppliers() || {}} onSelectionChange={newSelectedSupplier => setSupplierFormData(newSelectedSupplier)}/>
        <SupplierForm formData={supplierFormData} 
                    formType='supplier' 
                    formHidden={{}} 
                    formRequired={{'storename' : true, 'website' : true, 'country' : true}} 
                    formAction='suppliers' 
                    appIsOnline={props.isOnline} 
                    onSubmit={()=>{ setIsSupplierListRetrieved(false); window.location.reload();}}/>
      </React.Fragment>
    </div>
  );
}
 
export default SupplierManager;


