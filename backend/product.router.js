
const formidable = require('formidable')


const config = require('./config')
let serverData = config.getServerData()

const model = require('./product.model');
// const reactRedirects = require('./react.redirects')
const {imgUtilGetDBDir, imgUtilGetTempPathAndNameFromFormidable, imgUtilMoveImgToDBFromFormidable} = require('./imgUtils');







module.exports.exposeRoutes = function(app){



	app.get('/api/products', (req, res) => {
		model.products_get_all()
		.then((data)=>res.status(200).json(data))
		.catch((err)=>res.status(500).json(err))
	})




	// app.get('/products', (req, res) => {
	// 	return reactRedirects.redirect(res);
	// });





	app.post('/products', (req, res) => {

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



			model.products_add_one(fields.storename, fields.surname, fields.firstnames, fields.website, fields.email.split('::'), fields.phone.split('::'), `/imgs/${imgCurrentAbsDir.replace(serverData.imgBaseDir, '')}`, imgTempName, fields.country, fields.address, fields.address)
			.then((data)=>{ 
				
				console.log('Insterted Item: ', data)
				imgUtilMoveImgToDBFromFormidable(files, serverData.imgBaseDir, imgUploadTempPath, data[0].img_path)
				.then((result) => res.redirect(303, '/products'))
				.catch((err) => res.redirect(303, '/products'))
				
			})
			.catch((err) => res.redirect(303, '/products'))
		})
	})





	app.put('/products/:id', (req, res) => {

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



			const productId = fields.id
			delete fields.id

			fields['office_address'] = fields.address

			model.products_update_one_by_id(productId, Object.keys(fields), Object.values(fields))
			.then((data)=>{ 
				
				console.log('Updated Item: ', data)
				imgUtilMoveImgToDBFromFormidable(files, serverData.imgBaseDir, imgUploadTempPath, data[0].img_path)
				.then((result) => res.redirect(303, '/products'))
				.catch((err) => res.redirect(303, '/products'))
				
			})
			.catch((err) => res.redirect(303, '/products'))
		})
	})


}




