const loadIsOnline = (isOnline) => ({
    type: 'LOAD_ISONLINE',
    payload: { 'isOnline': isOnline },
});

const loadClients = (clients) => ({
    type: 'LOAD_CLIENTS',
    payload: { 'clients': clients },
});

const loadSuppliers = (suppliers) => ({
    type: 'LOAD_SUPPLIERS',
    payload: { 'suppliers': suppliers },
});



export { loadIsOnline, loadClients, loadSuppliers }