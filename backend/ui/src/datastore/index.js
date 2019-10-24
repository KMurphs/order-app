import { store as reduxStore } from './reduxStore';
import {
    loadIsOnline as reduxLoadIsOnline,
    loadClients as reduxLoadClients,
    loadSuppliers as reduxLoadSuppliers,
    loadProducts as reduxLoadProducts
} from './reduxActions';


export { reduxStore, reduxLoadIsOnline, reduxLoadClients, reduxLoadSuppliers, reduxLoadProducts }