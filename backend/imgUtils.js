const fs = require('fs')



const padValueWithZeros = (value, stringWidth) => (value/Math.pow(10,stringWidth)).toFixed(stringWidth).split('.')[1]; // ("00" + 1234).slice(-3) gives 234
const getRelDir = () => `\\${new Date().getFullYear()}${padValueWithZeros(new Date().getMonth(), 2)}${padValueWithZeros(new Date().getDate(), 2)}`

const getOrCreateFolder = function(folderPath){

	let folderAlreadyExisted = true

	// If new folder, create it
	if (!fs.existsSync(folderPath)){
		folderAlreadyExisted = false
		console.log(`Creating folder ${folderPath}, and store in serverData`)
	    fs.mkdirSync(folderPath);
		// config.serverData.imgCurrentAbsDir = imgAbsDir
		// config.saveServerData(config.serverData).catch((err)=>console.log('Error while saving serverData: ', err))
	}	

	return [folderPath, folderAlreadyExisted]
}





module.exports.imgUtilGetDBDir = (imgBaseDir, imgRegisteredAbsDir, imgDirMaxFiles) => {

	let imgDBDirectory = (`${imgBaseDir}\\${getRelDir()}`).replace(/\\\\/g, '\\').replace(/\\\\/g, '\\') // DEfault value unless we find out that there is a valid folder for the newly uploaded image

	return new Promise((resolve, reject) => {

		fs.readdir(imgRegisteredAbsDir, (err, files) => {
			if(err) {
				console.log(`Error while reading files in ${imgRegisteredAbsDir}: `, err)
				resolve(getOrCreateFolder(imgDBDirectory))
			}

			// If nuber of images in that folder is less than maximum allowed, use this to save the newly uploaded image
			console.log(`Current Img Folder ${imgRegisteredAbsDir} has ${files.length} files (Max Allowed ${imgDirMaxFiles})`)
			if(files.length < imgDirMaxFiles){
				imgDBDirectory = imgRegisteredAbsDir
			}

			resolve(getOrCreateFolder(imgDBDirectory))

		});		

	})
}





module.exports.imgUtilGetTempPathAndNameFromFormidable = (files) => {
	
	let imgUploadTempPath = null
	let imgTempName = null

	if(files.img_path && files.img_path.name){

		imgUploadTempPath = files.img_path.path;
		imgTempName = files.img_path.name === 'NoImage.png' ? files.img_path.name : `${Date.now()}${files.img_path.name.match(new RegExp(/(\.[a-z]{2,4}$)/))[0]}`

		console.log(`Uploaded image is at '${imgUploadTempPath}' and was given temporary name '${imgTempName}'`)			
	}

	return [imgUploadTempPath, imgTempName]
}






module.exports.imgUtilMoveImgToDBFromFormidable = (files, imgBaseDir, imgUploadTempPath, imgDBPath) => {

	const onSuccessResponse = 'Img uploaded and successfully saved!'

	return new Promise((resolve, reject) => {

			try{

				if(files.img_path && files.img_path.name && (files.img_path.name !== 'NoImage.png')){

	      			console.log(`Moving Img from temporary folder to ${imgBaseDir}\\${imgDBPath}`.replace('\\\\', '\\').replace(/\//g, '\\').replace('\\\\', '\\').replace('\\imgs\\', '\\'))
		      		fs.rename(imgUploadTempPath, (`${imgBaseDir}\\${imgDBPath}`).replace('\\\\', '\\').replace(/\//g, '\\').replace('\\\\', '\\').replace('\\imgs\\', '\\'), (err) => {

		        		if (err) {
		        			console.log(`Error while moving file from ${imgUploadTempPath}: `, err)
		        			reject(err)
		        		}

		        		resolve(onSuccessResponse)
		      		});	


	      		}else{
	      			console.log(`Conditions imgpath: ${files.img_path} and imgname: ${files.img_path.name} and imgname !== 'NoImage.png' returned false`)
	      			resolve(onSuccessResponse)
	      		}

	      	
	      	}catch(exception){
	      		console.log(`Error while moving file from ${imgUploadTempPath}: `, exception)
	      		reject(exception)
	      	}	

	})
}