
const fs = require('fs')

const expressApp = require('./express.app')
const app = expressApp.getApp()
const clientRouter = require('./client.router')
const supplierRouter = require('./supplier.router')
const productRouter = require('./product.router')


let config = require('./config')
let serverData = config.getServerData()
const {imgUtilGetDBDir, imgUtilGetTempPathAndNameFromFormidable, imgUtilMoveImgToDBFromFormidable} = require('./imgUtils');




app.get("/", (req, res) => res.redirect('/index.html'))
app.get("/api/ping", (req, res) => res.status(200).send({'msg':'pong'}))
app.get("/imgs/*", (req, res) => {

	let imgFile = req.params[0].split('/').reverse()[0]
	let imgSrcPath = `${serverData.imgBaseDir}${req.params[0].replace('/','\\')}`
	let imgDestPath = `${__dirname}\\public\\dbImgsCache\\${imgFile}`


	fs.copyFile(imgSrcPath, imgDestPath, (err) => {
	  if (err) res.redirect("/dbImgsCache/NoImage.png");
	  res.redirect(`/dbImgsCache/${imgFile}`)
	});

})



clientRouter.exposeRoutes(app);
supplierRouter.exposeRoutes(app);
productRouter.exposeRoutes(app);



app.get('/*', (req, res) => res.status(200).json({'msg':'Hello from backend'}))



app.listen(config.appPort, () => {
	console.log(`Server is listening on port ${config.appPort}`)
})