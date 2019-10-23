import { createStore } from 'redux';


const reducer = (state = {}, action) => {
    console.log(`Redux is performing ${action.type} action with payload ${(JSON.stringify(action.payload || {})).substr(0, 180)}`);

    switch (action.type) {
        case 'LOAD_ISONLINE':
            state.isOnline = action.payload.isOnline
            return state;
        case 'LOAD_CLIENTS':
            state.clients = {...action.payload.clients }
            return state;
        case 'LOAD_SUPPLIERS':
            state.suppliers = {...action.payload.suppliers }
            return state;
        default:
            return state;
    }
};

const store = createStore(reducer);

export { store }