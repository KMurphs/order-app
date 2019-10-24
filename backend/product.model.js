

const config = require('./config');
const pool = config.getPool()


module.exports.products_get_all = () => {
	return new Promise((resolve, reject) => {
	    pool.query('SELECT * from order_app.products_get_all();', (err, result) => {
	        if (err) {
	        	console.log(`model.products_get_all: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.products_get_all: Query returned ${result.rows.length} entries`)
		        result.rows.forEach((item, index) => {
		        	console.log(item.product_id)
		        	console.log(item.product_data)
		        })
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

module.exports.products_add_one = (storename, surname, firstnames, website, emails, phones, imgFolder, imgTempName, country, officeAddress, postalAddress) => {
	return new Promise((resolve, reject) => {
	    pool.query('select * from order_app.products_add_one($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [storename, surname, firstnames, website, emails, phones, imgFolder, imgTempName, country, officeAddress, postalAddress], (err, result) => {
	        if (err) {
	        	console.log(`model.products_add_one: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.products_add_one: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 

module.exports.products_update_one_by_id = (productID, updatedFields, updatedValues) => {
	return new Promise((resolve, reject) => {
	    pool.query('select * from order_app.products_update_one_by_id($1, $2, $3);', [parseInt(productID), updatedFields, updatedValues], (err, result) => {
	        if (err) {
	        	console.log(`model.products_update_one_by_id: Query failed`, err)
	            reject(err)
	        }
	        try{
		        console.log(`model.products_update_one_by_id: Query returned ${result.rows.length} entries`)
		        resolve(result.rows)
	        }catch(exception){
	        	reject(exception)
	        }
	    });
	})
} 













































































































// -- FUNCTION: order_app.products_get_all()

// DROP FUNCTION order_app.products_get_all();

// CREATE OR REPLACE FUNCTION order_app.products_get_all(
// 	)
//     RETURNS TABLE (product_id integer, product_data json)
//     LANGUAGE 'plpgsql'

//     COST 100
//     VOLATILE 
//     ROWS 1000
// AS $BODY$
// BEGIN
// 	RETURN QUERY
// 		select id as product_id, row_to_json(productData) as productData from
// 		(
// 					-- Get all cols from products_table
// 					select *, 
// 							  -- Build product supplier json array	
// 							  (   select array_to_json(array_agg(row_to_json(product_suppliers))) as product_suppliers
// 								  from (
// 									select *
// 									from order_app.joining_product_suppliers
// 									where order_app.joining_product_suppliers.product_id = order_app.products_table.id
// 									order by id asc
// 								  ) product_suppliers
// 							   )product_suppliers,

// 								-- Build prefered supplier json array	
// 							   (
// 								  select array_to_json(array_agg(row_to_json(prefered_supplier))) as prefered_supplier
// 								  from (
// 									select *
// 									from order_app.joining_product_suppliers
// 									where order_app.joining_product_suppliers.product_id=order_app.products_table.id 
// 									and order_app.joining_product_suppliers.supplier_id=order_app.products_table.pref_supplier_id 
// 									order by id asc
// 								  ) prefered_supplier
// 							   )prefered_supplier,

// 								-- Build product tags json array	
// 							   (
// 								  select array_to_json(array_agg(row_to_json(product_tags))) as product_tags
// 								  from (
// 									select *
// 									from order_app.product_tags_table
// 									where order_app.product_tags_table.product_id=1 
// 									order by id asc
// 								  ) product_tags
// 							   )product_tags



// 						from order_app.products_table order by id asc


// 		)productData;

// END$BODY$;

// ALTER FUNCTION order_app.products_get_all()
//     OWNER TO postgres;

// GRANT EXECUTE ON FUNCTION order_app.products_get_all() TO order_app_user;

// GRANT EXECUTE ON FUNCTION order_app.products_get_all() TO postgres;

// GRANT EXECUTE ON FUNCTION order_app.products_get_all() TO PUBLIC;