
const formidable = require('formidable')


const config = require('./config')
let serverData = config.getServerData()

const model = require('./supplier.model');
// const reactRedirects = require('./react.redirects')
const {imgUtilGetDBDir, imgUtilGetTempPathAndNameFromFormidable, imgUtilMoveImgToDBFromFormidable} = require('./imgUtils');







module.exports.exposeRoutes = function(app){



	app.get('/api/suppliers', (req, res) => {
		model.suppliers_get_all()
		.then((data)=>res.status(200).json(data))
		.catch((err)=>res.status(500).json(err))
	})




	// app.get('/suppliers', (req, res) => {
	// 	return reactRedirects.redirect(res);
	// });





	app.post('/suppliers', (req, res) => {

		const form = new formidable.IncomingForm()
		form.parse(req, async(err, fields, files) => {
			if(err){
				console.log('Error parsing incoming form: ', err)
				return
			}



			const [imgUploadTempPath, imgTempName] = imgUtilGetTempPathAndNameFromFormidable(files)
			let imgCurrentAbsDir, folderAlreadyExisted
			await imgUtilGetDBDir(serverData.imgBaseDir, serverData.imgCurrentAbsDir, serverData.imgDirMaxFiles).then((res)=> [imgCurrentAbsDir, folderAlreadyExisted] = res)
			if(folderAlreadyExisted){
				serverData.imgCurrentAbsDir = imgCurrentAbsDir
				// config.saveServerData().catch((err)=>console.log('Error while saving serverData: ', err))			
			}



			model.suppliers_add_one(fields.storename, fields.surname, fields.firstnames, fields.website, fields.email.split('::'), fields.phone.split('::'), `/imgs/${imgCurrentAbsDir.replace(serverData.imgBaseDir, '')}`, imgTempName, fields.country, fields.address, fields.address)
			.then((data)=>{ 
				
				console.log('Insterted Item: ', data)
				imgUtilMoveImgToDBFromFormidable(files, serverData.imgBaseDir, imgUploadTempPath, data[0].img_path)
				.then((result) => res.redirect(303, '/suppliers'))
				.catch((err) => res.redirect(303, '/suppliers'))
				
			})
			.catch((err) => res.redirect(303, '/suppliers'))
		})
	})





	app.put('/suppliers/:id', (req, res) => {

		const form = new formidable.IncomingForm()
		form.parse(req, async(err, fields, files) => {
			if(err){
				console.log('Error parsing incoming form: ', err)
				return
			}



			const [imgUploadTempPath, imgTempName] = imgUtilGetTempPathAndNameFromFormidable(files)
			let imgCurrentAbsDir, folderAlreadyExisted
			await imgUtilGetDBDir(serverData.imgBaseDir, serverData.imgCurrentAbsDir, serverData.imgDirMaxFiles).then((res)=> [imgCurrentAbsDir, folderAlreadyExisted] = res)
			if(folderAlreadyExisted){
				serverData.imgCurrentAbsDir = imgCurrentAbsDir
				// config.saveServerData().catch((err)=>console.log('Error while saving serverData: ', err))			
			}



			const supplierId = fields.id
			delete fields.id

			fields['office_address'] = fields.address

			model.suppliers_update_one_by_id(supplierId, Object.keys(fields), Object.values(fields))
			.then((data)=>{ 
				
				console.log('Updated Item: ', data)
				imgUtilMoveImgToDBFromFormidable(files, serverData.imgBaseDir, imgUploadTempPath, data[0].img_path)
				.then((result) => res.redirect(303, '/suppliers'))
				.catch((err) => res.redirect(303, '/suppliers'))
				
			})
			.catch((err) => res.redirect(303, '/suppliers'))
		})
	})


}




