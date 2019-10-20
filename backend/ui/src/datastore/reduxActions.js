const loadIsOnline = (isOnline) => ({
    type: 'LOAD_ISONLINE',
    payload: { 'isOnline': isOnline },
});

const loadClients = (clients) => ({
    type: 'LOAD_CLIENTS',
    payload: { 'clients': clients },
});



export { loadClients, loadIsOnline }