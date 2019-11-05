import { store as reduxStore } from './reduxStore';
import {
    loadIsOnline as reduxLoadIsOnline,
    loadClients as reduxLoadClients,
    loadSuppliers as reduxLoadSuppliers,
    loadProducts as reduxLoadProducts
} from './reduxActions';


const reduxGetProducts = () => {

    if (!reduxStore.getState().products) {
        return new Promise((resolve, reject) => {
            (new window.XmlHttpRequest()).getData(`${process.env.REACT_APP_BASE_URL}/api/products`, {})
                .then((res) => {
                    let newRes = res.map(item => {
                        item.product_data.product_images.forEach(img => img = `${process.env.REACT_APP_BASE_URL}${img.replace(/\\\\/g,'/')}`)
                        return item.product_data
                    })
                    reduxStore.dispatch(reduxLoadProducts(newRes)); // store retrieved Product data
                    resolve(reduxStore.getState().products);
                })
                .catch((err) => {
                    console.log(err)
                    reduxStore.dispatch(reduxLoadProducts([])); // store retrieved Product data
                    resolve(reduxStore.getState().products)
                })
        })

    } else {
        return reduxStore.getState().products
    }

}

const reduxGetSuppliers = () => {

    if (!reduxStore.getState().suppliers) {

        return new Promise((resolve, reject) => {
            (new window.XmlHttpRequest()).getData(`${process.env.REACT_APP_BASE_URL}/api/suppliers`, {})
                .then((res) => {
                    res.forEach(item => {
                        item.img_path = `${process.env.REACT_APP_BASE_URL}${item.img_path.replace(/\\\\/g,'/')}`
                        item.address = item.office_address
                    })
                    reduxStore.dispatch(reduxLoadSuppliers(res)); // store retrieved Supplier data
                    resolve(reduxStore.getState().suppliers);
                })
                .catch((err) => {
                    console.log(err)
                    reduxStore.dispatch(reduxLoadSuppliers([])); // store retrieved Product data
                    resolve(reduxStore.getState().suppliers)
                })

        })

    } else {
        return reduxStore.getState().suppliers
    }

}

const reduxGetClients = () => {

    if (!reduxStore.getState().clients) {
        return new Promise((resolve, reject) => {
            (new window.XmlHttpRequest()).getData(`${process.env.REACT_APP_BASE_URL}/api/clients`, {})
                .then((res) => {
                    res.forEach(item => {
                        item.img_path = `${process.env.REACT_APP_BASE_URL}${item.img_path.replace(/\\\\/g,'/')}`
                        item.address = item.shipping_address
                    })
                    reduxStore.dispatch(reduxLoadClients(res)); // store retrieved client data
                    resolve(reduxStore.getState().clients);
                })
                .catch((err) => {
                    console.log(err)
                    reduxStore.dispatch(reduxLoadClients([])); // store retrieved Product data
                    resolve(reduxStore.getState().clients)
                })

        })
    } else {
        return reduxStore.getState().clients
    }

}

export { reduxStore, reduxLoadIsOnline, reduxGetClients, reduxGetSuppliers, reduxGetProducts }