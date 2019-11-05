import React, {useState} from 'react';

import {reduxGetClients} from '../../datastore';
import ClientList from './ClientList';
import ClientForm from '../Form/OrderAppForm';

const ClientsManager = (props) => {

  // Initialize variables
  const [isClientListRetrieved, setIsClientListRetrieved] = useState(false)
  const [clientFormData, setClientFormData] = useState({})




  // Get Client List if not already present 
  if(!isClientListRetrieved){
    reduxGetClients()
    .then((res) => setIsClientListRetrieved(true)) // Force a re-render with retrieved client data
  }




  // Return react component's html
  return ( 
    <div className="container-fluid container-page d-flex flex-column flex-md-row justify-content-start justify-content-md-space-around align-items-stretch align-items-md-start">
      <React.Fragment>
        <ClientList list={reduxGetClients() || {}} onSelectionChange={newSelectedClient => setClientFormData(newSelectedClient)}/>
        <ClientForm formData={clientFormData} 
                    formType='client' 
                    appIsOnline={props.isOnline} 
                    formHidden={{'storename' : true, 'website': true}} 
                    formRequired={{'surname' : true, 'phone' : true, 'country' : true}} 
                    formAction='clients' 
                    onSubmit={()=>{ setIsClientListRetrieved(false); window.location.reload();}}/>
      </React.Fragment>
    </div>
  );
}



export default ClientsManager;


















