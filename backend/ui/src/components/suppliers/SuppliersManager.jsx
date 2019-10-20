import React from 'react';
import SupplierForm from './SupplierForm';

const SupplierManager = (props) => {
  return ( 
    <div className="container-fluid container-page">
      <React.Fragment>
        <SupplierForm/>
      </React.Fragment>
    </div>
  );
}
 
export default SupplierManager;