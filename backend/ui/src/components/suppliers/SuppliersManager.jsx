import React, {useState} from 'react';

import {reduxStore, reduxLoadSuppliers} from '../../datastore';
// import SupplierList from './SupplierList';
import SupplierForm from '../Form/OrderAppForm';

const SupplierManager = (props) => {

  // Initialize variables
  const [isSupplierListRetrieved, setIsSupplierListRetrieved] = useState(false)
  const [supplierFormData, setSupplierFormData] = useState({})


  // Get Supplier List if not already present 
  if(!isSupplierListRetrieved){
    
    (new window.XmlHttpRequest()).getData(`${process.env.REACT_APP_BASE_URL}/api/suppliers`, {})
    .then((res) => {
      res.forEach(item => item.img_path = `${process.env.REACT_APP_BASE_URL}${item.img_path.replace(/\\\\/g,'/')}`)
      console.log(res)
      reduxStore.dispatch(reduxLoadSuppliers(res)); // store retrieved Supplier data
      setIsSupplierListRetrieved(true); // Force a re-render with retrieved Supplier data
      // console.log(reduxStore.getState().suppliers)
    })
    .catch((err) => console.log(err))

  }


  // Return react component's html
  return ( 
    <div className="container-fluid container-page d-flex flex-column flex-md-row justify-content-start justify-content-md-space-around align-items-stretch align-items-md-start">
      <React.Fragment>
        {/* <SupplierList list={reduxStore.getState().suppliers || {}} onSelectionChange={newSelectedSupplier => setSupplierFormData(newSelectedSupplier)}/> */}
        <SupplierForm formData={supplierFormData} 
                    formType='supplier' 
                    formHidden={{'surname' : true, 'firstnames' : true}} 
                    formRequired={{'storename' : true, 'website' : true, 'country' : true}} 
                    formAction='suppliers' 
                    onSubmit={()=>{ setIsSupplierListRetrieved(false); window.location.reload();}}/>
      </React.Fragment>
    </div>
  );
}
 
export default SupplierManager;