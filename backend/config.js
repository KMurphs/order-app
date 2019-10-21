const fs = require('fs')

const serverDataDefaults = {
	"imgCurrentAbsDir":"C:\\PersonalProjects\\order-app-react-pwa\\dbImgs\\20190921",
	"imgBaseDir":"C:\\PersonalProjects\\order-app-react-pwa\\dbImgs\\",
	"imgDirMaxFiles":"5000"
}

const getServerData = () => {

	return new Promise((resolve) => {

		fs.readFile('serverData.json', (err, data) => {
			if (err) {
				resolve(serverDataDefaults)
			};
			try{
				resolve(JSON.parse(data))
			}catch(exception){
				resolve(serverDataDefaults)
			}

		});			
	})
}

const saveServerData = (serverData) => {

	return new Promise((resolve, reject) => {

		fs.writeFile('serverData.json', JSON.stringify(serverData), (err) => {
			if (err) reject(err);
			resolve('serverData was successfully saved')
		});	

	})
}



module.exports = {
  dbUser: process.env.PGUSER || 'order_app_user',
  dbHost: process.env.PGUHOST || 'localhost',
  dbName: process.env.PGDATABASE || 'order_app',
  dbPassword: process.env.PGPASS || 'Tester321!',
  dbPort: process.env.PGPORT || 5432,
  appPort: process.env.PORT || 5000,
  getServerData: getServerData,
  saveServerData: saveServerData,
}


