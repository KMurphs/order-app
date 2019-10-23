const { Pool } = require('pg');

const config = require('./config');
// console.log(config)


const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
})


module.exports.clients_get_all = () => {
	return new Promise((resolve, reject) => {
	    pool.query('SELECT * from order_app.clients_get_all();', (err, result) => {
	        if (err) {
	        	console.log(`model.clients_get_all: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.clients_get_all: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

module.exports.clients_add_one = (surname, firstnames, emails, phones, imgFolder, imgTempName, country, shippingAddress, postalAddress) => {
	return new Promise((resolve, reject) => {
	    pool.query('select * from order_app.clients_add_one($1, $2, $3, $4, $5, $6, $7, $8, $9);', [surname, firstnames, emails, phones, imgFolder, imgTempName, country, shippingAddress, postalAddress], (err, result) => {
	        if (err) {
	        	console.log(`model.clients_add_one: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.clients_add_one: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

module.exports.clients_update_one_by_id = (clientID, updatedFields, updatedValues) => {
	return new Promise((resolve, reject) => {
	    pool.query('select * from order_app.clients_update_one_by_id($1, $2, $3);', [parseInt(clientID), updatedFields, updatedValues], (err, result) => {
	        if (err) {
	        	console.log(`model.clients_update_one_by_id: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.clients_update_one_by_id: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

