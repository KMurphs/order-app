const express = require('express')
const bodyParser = require('body-parser')



module.exports.getApp = function(){

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


	app.use((req, res, next) => {
		if(req.url !== '/api/ping'){
			console.log(`Server received '${req.method}' request at url '${req.url}' with parameters '${JSON.stringify(req.params)}' and body '${JSON.stringify(req.body).substr(0, 200)}'`)
		}
		next()
	})
	app.use(express.static(__dirname + '/ui/build')) //Temporary
	app.use(express.static(__dirname + '/public'))

	return app
}