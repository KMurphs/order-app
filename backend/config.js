const fs = require('fs')
const { Pool } = require('pg');



let pool = null
let serverData = null




const getServerData = () => {

	const serverDataDefaults = {
		"imgCurrentAbsDir":"C:\\PersonalProjects\\order-app-react-pwa\\dbImgs\\20190921",
		"imgBaseDir":"C:\\PersonalProjects\\order-app-react-pwa\\dbImgs\\",
		"imgDirMaxFiles":"5000"
	}


	if(serverData === null){
			
		console.log('config: Reading Server Data File')
		serverData = serverDataDefaults

		try{
			serverData = JSON.parse(fs.readFileSync('serverData.json', "utf8"))
		}catch(exception){
			console.log('config: Error Reading/Parsing Server Data file', exception)
		}

	}
	
	return serverData
}

const saveServerData = (serverData) => {

	return new Promise((resolve, reject) => {

		fs.writeFile('serverData.json', JSON.stringify(serverData), (err) => {
			if (err) reject(err);
			resolve('serverData was successfully saved')
		});	

	})
}






const getDBPool = ()=>{


	if(pool === null){
		console.log('config: Initializing DB Pool')
		pool = new Pool({
			user: configData.dbUser,
			host: configData.dbHost,
			database: configData.dbName,
			password: configData.dbPassword,
			port: configData.dbPort,
		})
	}

	return pool 
}



let configData = {
	dbUser: process.env.PGUSER || 'order_app_user',
	dbHost: process.env.PGUHOST || 'localhost',
	dbName: process.env.PGDATABASE || 'order_app',
	dbPassword: process.env.PGPASS || 'Tester321!',
	dbPort: process.env.PGPORT || 5432,
	appPort: process.env.PORT || 5000,
	getPool: getDBPool,
	getServerData: getServerData,
	saveServerData: saveServerData,
}

module.exports = configData


