const express = require('express')
const bodyParser = require('body-parser')



module.exports.getApp = function(){

	// Get express app instance
	const app = express()


	// * bodyParser.urlencoded(options)
	//  * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
	//  * and exposes the resulting object (containing the keys and values) on req.body
	 
	app.use(bodyParser.urlencoded({
	    limit: '50mb',
	    extended: true,
	    parameterLimit: 50000
	}));

	// /**bodyParser.json(options)
	//  * Parses the text as JSON and exposes the resulting object on req.body.
	//  */
	app.use(bodyParser.json({
		limit: '50mb'
	}));


	//Setup logs for every incoming request
	app.use((req, res, next) => {
		if(req.url !== '/api/ping'){
			console.log(`[${(Date().substr(4)).match(/.*\(/)[0].replace(' (','')}]: '${req.method}' request at url '${req.url}' with body '${JSON.stringify(req.body).substr(0, 200)}'`)
		}
		next()
	})

	// Expose static content directories
	app.use(express.static(__dirname + '/ui/build')) //Temporary
	app.use(express.static(__dirname + '/public'))


	// Return express app 
	return app
}