const formidable = require('formidable')


const config = require('./config')
let serverData = config.getServerData()

const model = require('./client.model');
// const reactRedirects = require('./react.redirects')
const {imgUtilGetDBDir, imgUtilGetTempPathAndNameFromFormidable, imgUtilMoveImgToDBFromFormidable} = require('./imgUtils');




module.exports.exposeRoutes = function(app){



	app.get('/api/clients', (req, res) => {
		model.clients_get_all()
		.then((data)=>res.status(200).json(data))
		.catch((err)=>res.status(500).json(err))
	})




	// app.get('/clients', (req, res) => {
	// 	return reactRedirects.redirect(res);
	// });





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

			fields['shipping_address'] = fields.address



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


}




