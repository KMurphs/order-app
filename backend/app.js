const express = require('express')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const fs = require('fs')

const config = require('./config');
const model = require('./model');

const app = express()



// * bodyParser.urlencoded(options)
//  * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
//  * and exposes the resulting object (containing the keys and values) on req.body
 
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// /**bodyParser.json(options)
//  * Parses the text as JSON and exposes the resulting object on req.body.
//  */
// app.use(bodyParser.json());


app.use(express.static(__dirname + '/ui/build'))
app.use(express.static(__dirname + '/public'))
app.use((req, res, next) => {
	// console.log(req)
	console.log(`Server received '${req.method}' request at url '${req.url}' with parameters '${JSON.stringify(req.params)}' and body '${JSON.stringify(req.body)}'`)
	next()
})

app.get("/", (req, res) => {
	res.redirect('/index.html')
})
app.get("/ping", (req, res) => {
	res.status(200).send({'msg':'pong'})
})

app.get('/api/clients', (req, res) => {
	model.clients_get_all()
	.then((data)=>res.status(200).json(data))
	.catch((err)=>res.status(500).json(err))
})

app.post('/api/clients', (req, res) => {
	const form = new formidable.IncomingForm()
	form.parse(req, (err, fields, files) => {
		if(err){
			console.log(err)
			return
		}

		console.log(fields)
		console.log(files)

		

		// Getting folder where to save this image
	  	const padValueWithZeros = (value, stringWidth) => (value/Math.pow(10,stringWidth)).toFixed(stringWidth).split('.')[1]; // ("00" + 1234).slice(-3) gives 234
	  	const imgBaseDir = 'C:\\PersonalProjects\\order-app-react-pwa\\dbImgs\\'
	  	const imgRelDir = `${new Date().getFullYear()}${padValueWithZeros(new Date().getMonth(), 2)}${padValueWithZeros(new Date().getDate(), 2)}`
	  	const imgDirMaxFiles = 5000


	  	// Try Reading serverData file with last folder for uploaded images
	  	console.log(`Reading serverData file`)
		let imgAbsDir = (`${imgBaseDir}\\${imgRelDir}`).replace('\\\\', '\\') // DEfault value unless we find out that there is a valid folder for the newly uploaded image
		let serverData = {}
		fs.readFile('serverData.json', (err, data) => {
			if (err) {console.log(err)};

			try{

				serverData = JSON.parse(data)
				fs.readdir(serverData.imgCurrentAbsDir, (err, files) => {
					if(err) {console.log(err)}

					// If nuber of images in that folder is less than maximum allowed, use this to save the newly uploaded image
					console.log(`Current Img Folder ${serverData.imgCurrentAbsDir} has ${files.length} files (Max Allowed ${imgDirMaxFiles})`)
					if(files.length < imgDirMaxFiles){
						imgAbsDir = serverData.imgCurrentAbsDir
					}

				});

			}catch(exception){
				console.log(exception)
			}

		});


		
		
		console.log(`Creating folder ${imgAbsDir}, and store in serverData`)
		// If new folder, create it
		if (!fs.existsSync(imgAbsDir)){
		    fs.mkdirSync(imgAbsDir);
		}
		// Save this folder for future uploaded images
		serverData['imgCurrentAbsDir'] = imgAbsDir
		// fs.writeFile('serverData.json', JSON.stringify(serverData), (err) => {
		// 	if (err) throw err;
		// 	console.log('The file has been saved!');
		// });



		const imgUploadTempPath = files.img_path.path;
		const imgTempName = files.img_path.name === 'NoImage.png' ? files.img_path.name : `${Date.now()}${files.img_path.name.match(new RegExp(/(\.[a-z]{2,4}$)/))[0]}`
		console.log(`Uploaded image will be saved in ${imgAbsDir} as ${imgTempName}`)
		model.clients_add_one(fields.surname, fields.firstnames, fields.email.split('::'), fields.phone.split('::'), imgAbsDir, imgTempName, fields.country, fields.address, fields.address)
		.then((data)=>{ 
			
			console.log(data)

			try{

	      		if(files.img_path.name !== 'NoImage.png'){
		      		fs.rename(imgUploadTempPath, (`${data[0].img_path}`).replace('\\\\', '\\'), function (err) {
		        		if (err) res.status(500).json(err)
		        		res.write('File uploaded and moved!');
		        		res.status(200).json(data)
		      		});	
	      		}else{
	      			res.status(200).json(data)
	      		}
	      	
	      	}catch(exception){
	      		res.status(500).json(err)
	      	}
			
		})
		.catch((err)=>res.status(500).json(err))
	})
})

app.get('/*', (req, res) => {
	res.status(200).json({
		'msg':'Hello from backend'
	})
})

app.listen(config.appPort, () => {
	console.log(`Server is listening on port ${config.appPort}`)
})