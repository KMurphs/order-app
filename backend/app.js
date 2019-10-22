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
const {imgUtilGetDBDir, imgUtilGetTempPathAndNameFromFormidable, imgUtilMoveImgToDBFromFormidable} = require('./imgUtils');

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

    return res.send(data.replace('<div id="root"></div>', `<div id="root" /*style='color: rgba(0,0,0,0)*/'>${app}</div>`))
  });
}






app.put('/clients/:id', (req, res) => {

	const form = new formidable.IncomingForm()
	form.parse(req, async(err, fields, files) => {
		if(err){
			console.log('Error parsing incoming form: ', err)
			return
		}



		const [imgUploadTempPath, imgTempName] = imgUtilGetTempPathAndNameFromFormidable(files)
		let imgCurrentAbsDir, folderAlreadyExisted
		await imgUtilGetDBDir(config.serverData.imgBaseDir, config.serverData.imgCurrentAbsDir, config.serverData.imgDirMaxFiles).then((res)=> [imgCurrentAbsDir, folderAlreadyExisted] = res)
		if(folderAlreadyExisted){
			config.serverData.imgCurrentAbsDir = imgCurrentAbsDir
			// config.saveServerData(config.serverData).catch((err)=>console.log('Error while saving serverData: ', err))			
		}



		const clientId = fields.id
		delete fields.id


		model.clients_update_one_by_id(clientId, Object.keys(fields), Object.values(fields))
		.then((data)=>{ 
			
			console.log('Updated Item: ', data)
			imgUtilMoveImgToDBFromFormidable(files, config.serverData.imgBaseDir, imgUploadTempPath, data[0].img_path)
			.then((result) => res.redirect(303, '/clients'))
			.catch((err) => res.redirect(303, '/clients'))
			
		})
		.catch((err) => res.redirect(303, '/clients'))
	})
})


app.post('/clients', (req, res) => {

	const form = new formidable.IncomingForm()
	form.parse(req, async(err, fields, files) => {
		if(err){
			console.log('Error parsing incoming form: ', err)
			return
		}



		const [imgUploadTempPath, imgTempName] = imgUtilGetTempPathAndNameFromFormidable(files)
		let imgCurrentAbsDir, folderAlreadyExisted
		await imgUtilGetDBDir(config.serverData.imgBaseDir, config.serverData.imgCurrentAbsDir, config.serverData.imgDirMaxFiles).then((res)=> [imgCurrentAbsDir, folderAlreadyExisted] = res)
		if(folderAlreadyExisted){
			config.serverData.imgCurrentAbsDir = imgCurrentAbsDir
			// config.saveServerData(config.serverData).catch((err)=>console.log('Error while saving serverData: ', err))			
		}



		model.clients_add_one(fields.surname, fields.firstnames, fields.email.split('::'), fields.phone.split('::'), `/imgs/${imgCurrentAbsDir.replace(config.serverData.imgBaseDir, '')}`, imgTempName, fields.country, fields.address, fields.address)
		.then((data)=>{ 
			
			console.log('Insterted Item: ', data)
			imgUtilMoveImgToDBFromFormidable(files, config.serverData.imgBaseDir, imgUploadTempPath, data[0].img_path)
			.then((result) => res.redirect(303, '/clients'))
			.catch((err) => res.redirect(303, '/clients'))
			
		})
		.catch((err) => res.redirect(303, '/clients'))
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