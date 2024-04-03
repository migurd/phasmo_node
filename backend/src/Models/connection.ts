import mysql from 'mysql2';

// Singleton design pattern was implemented successfully!
let connection: any;

function createConnection() {
	connection = mysql.createConnection({
		host: "127.0.0.1",
		user: "root",
		password: "", // passwdn't
		database: "phasmo_db"
	});

	connection.connect((err: any) => {
		if (err) {
			console.log(`Surgió un error: ${err}`);
		} else {
			console.log("Se abrió la conexión con éxito.");
		}
	});

	return connection;
}

export function getConnection() {
	if (!connection) {
		return createConnection();
	}
	return connection;
}

