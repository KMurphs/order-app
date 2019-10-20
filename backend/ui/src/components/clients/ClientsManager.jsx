import React, {useState} from 'react';

import {reduxStore, reduxLoadClients} from '../../datastore';
import ClientList from '../clients/ClientList';
import ClientForm from '../clients/ClientForm';

const ClientsManager = (props) => {

  // Initialize variables
  const [isClientListRetrieved, setIsClientListRetrieved] = useState(false)
  const [clientFormData, setClientFormData] = useState({})


  // Get Client List if not already present 
  if(!isClientListRetrieved){

    (new window.XmlHttpRequest()).getData('http://localhost:5000/api/clients', {})
    .then((res) => {
      reduxStore.dispatch(reduxLoadClients(res)); // store retrieved client data
      setIsClientListRetrieved(true); // Force a re-render with retrieved client data
      // console.log(reduxStore.getState().clients)
    })
    .catch((err) => console.log(err))

  }


  // Return react component's html
  return ( 
    <div className="container-fluid container-page d-flex flex-column flex-md-row justify-content-start justify-content-md-space-around align-items-stretch align-items-md-start">
      <React.Fragment>
        <ClientList list={reduxStore.getState().clients || {}} onSelectionChange={newSelectedClient => setClientFormData(newSelectedClient)}/>
        <ClientForm clientData={clientFormData}/>
      </React.Fragment>
    </div>
  );
}



export default ClientsManager;


















