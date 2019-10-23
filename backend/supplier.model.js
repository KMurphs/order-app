

const config = require('./config');
const pool = config.getPool()


module.exports.suppliers_get_all = () => {
	return new Promise((resolve, reject) => {
	    pool.query('SELECT * from order_app.suppliers_get_all();', (err, result) => {
	        if (err) {
	        	console.log(`model.suppliers_get_all: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.suppliers_get_all: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

module.exports.suppliers_add_one = (storename, surname, firstnames, website, emails, phones, imgFolder, imgTempName, country, officeAddress, postalAddress) => {
	return new Promise((resolve, reject) => {
	    pool.query('select * from order_app.suppliers_add_one($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [storename, surname, firstnames, website, emails, phones, imgFolder, imgTempName, country, officeAddress, postalAddress], (err, result) => {
	        if (err) {
	        	console.log(`model.suppliers_add_one: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.suppliers_add_one: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

module.exports.suppliers_update_one_by_id = (supplierID, updatedFields, updatedValues) => {
	return new Promise((resolve, reject) => {
	    pool.query('select * from order_app.suppliers_update_one_by_id($1, $2, $3);', [parseInt(supplierID), updatedFields, updatedValues], (err, result) => {
	        if (err) {
	        	console.log(`model.suppliers_update_one_by_id: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.suppliers_update_one_by_id: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

