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

const loadProducts = (products) => ({
    type: 'LOAD_PRODUCTS',
    payload: { 'products': products },
});



export { loadIsOnline, loadClients, loadSuppliers, loadProducts }