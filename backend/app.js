const express = require('express')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const { StaticRouter } = require("react-router-dom");
const ReactDOMServer = require('react-dom/server');

const model = require('./model');
let config = require('./config')
config.getServerData().then((serverData)=>{config = {...config, ...{serverData}};console.log(config)})


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
	if(req.url !== '/ping'){
		console.log(`Server received '${req.method}' request at url '${req.url}' with parameters '${JSON.stringify(req.params)}' and body '${JSON.stringify(req.body).substr(0, 200)}'`)
	}
	next()
})
app.use(express.static(__dirname + '/ui/build')) //Temporary
app.use(express.static(__dirname + '/public'))







app.get("/", (req, res) => {
	res.redirect('/index.html')
})
app.get("/imgs/*", (req, res) => {
	let imgFile = req.params[0].split('/').reverse()[0]
	let imgSrcPath = `${config.serverData.imgBaseDir}${req.params[0].replace('/','\\')}`
	let imgDestPath = `${__dirname}\\public\\dbImgsCache\\${imgFile}`

	// console.log(`Moving '${imgFile}' from '${imgSrcPath}' to '${imgDestPath}'`)

	fs.copyFile(imgSrcPath, imgDestPath, (err) => {
	  if (err) res.redirect("/dbImgsCache/NoImage.png");
	  res.redirect(`/dbImgsCache/${imgFile}`)
	});
})




app.get("/ping", (req, res) => {
	res.status(200).send({'msg':'pong'})
})

app.get('/api/clients', (req, res) => {
	model.clients_get_all()
	.then((data)=>res.status(200).json(data))
	.catch((err)=>res.status(500).json(err))
})







app.get('/clients', (req, res) => {
	return reactRedirects(res);
});
// https://www.freecodecamp.org/news/demystifying-reacts-server-side-render-de335d408fe4/
// https://alligator.io/react/server-side-rendering/
const reactRedirects = (res)=>{
  const app = ReactDOMServer.renderToString('<App />');

  const indexFile = path.resolve(__dirname + '/ui/build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root" style='color: rgba(0,0,0,0)'>${app}</div>`))
  });
}













app.post('/clients', (req, res) => {
	const form = new formidable.IncomingForm()
	form.parse(req, async(err, fields, files) => {
		if(err){
			console.log('Error parsing incoming form: ', err)
			return
		}


		// Getting folder where to save this image
	  	const padValueWithZeros = (value, stringWidth) => (value/Math.pow(10,stringWidth)).toFixed(stringWidth).split('.')[1]; // ("00" + 1234).slice(-3) gives 234
	  	const imgRelDir = `\\${new Date().getFullYear()}${padValueWithZeros(new Date().getMonth(), 2)}${padValueWithZeros(new Date().getDate(), 2)}`

	  	// Try Reading serverData file with last folder for uploaded images
		let imgAbsDir = (`${config.serverData.imgBaseDir}\\${imgRelDir}`).replace(/\\\\/g, '\\').replace(/\\\\/g, '\\') // DEfault value unless we find out that there is a valid folder for the newly uploaded image

		await new Promise((resolve, reject) => {

			fs.readdir(config.serverData.imgCurrentAbsDir, (err, files) => {
				if(err) {reject(err)}

				// If nuber of images in that folder is less than maximum allowed, use this to save the newly uploaded image
				console.log(`Current Img Folder ${config.serverData.imgCurrentAbsDir} has ${files.length} files (Max Allowed ${config.serverData.imgDirMaxFiles})`)
				if(files.length < config.serverData.imgDirMaxFiles){
					imgAbsDir = config.serverData.imgCurrentAbsDir
					resolve(imgAbsDir)
				}

			});		

		}).catch((err)=>console.log(`Error while reading files in ${config.serverData.imgCurrentAbsDir}: `, err))


	
		
		// If new folder, create it
		if (!fs.existsSync(imgAbsDir)){
			console.log(`Creating folder ${imgAbsDir}, and store in serverData`)
		    fs.mkdirSync(imgAbsDir);
		    config.serverData.imgCurrentAbsDir = imgAbsDir
		    config.saveServerData(config.serverData).catch((err)=>console.log('Error while saving serverData: ', err))
		}



		const imgUploadTempPath = files.img_path.path;
		const imgTempName = files.img_path.name === 'NoImage.png' ? files.img_path.name : `${Date.now()}${files.img_path.name.match(new RegExp(/(\.[a-z]{2,4}$)/))[0]}`
		console.log(`Uploaded image will be saved in ${imgAbsDir} as ${imgTempName}`)
		model.clients_add_one(fields.surname, fields.firstnames, fields.email.split('::'), fields.phone.split('::'), `/imgs/${imgAbsDir.replace(config.serverData.imgBaseDir, '')}`, imgTempName, fields.country, fields.address, fields.address)
		.then((data)=>{ 
			
			console.log(data)

			try{

	      		if(files.img_path.name !== 'NoImage.png'){
	      			console.log(`Moving Img from temporary folder to ${config.serverData.imgBaseDir}\\${data[0].img_path}`.replace('\\\\', '\\').replace(/\//g, '\\').replace('\\\\', '\\').replace('\\imgs\\', '\\'))
		      		fs.rename(imgUploadTempPath, (`${config.serverData.imgBaseDir}\\${data[0].img_path}`).replace('\\\\', '\\').replace(/\//g, '\\').replace('\\\\', '\\').replace('\\imgs\\', '\\'), (err) => {
		        		if (err) res.status(500).json(err)
		        		console.log('File uploaded and moved!');
		        		res.redirect('/clients')
		      		});	
	      		}else{
	      			res.redirect('/clients')
	      		}
	      	
	      	}catch(exception){
	      		res.redirect('/clients')
	      	}
			
		})
		.catch((err)=>res.redirect('/clients'))
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