import React from 'react';
import ClientForm from '../clients/ClientForm';

const SupplierManager = (props) => {
  return ( 
    <div className="container-fluid container-page">
      <React.Fragment>
        <ClientForm/>
      </React.Fragment>
    </div>
  );
}
 
export default SupplierManager;