import mysql from 'mysql2';
import dotenv from "dotenv";
import path from 'path';

// DOTENV
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Singleton design pattern was implemented successfully!
let connection: any;

function createConnection() {
	connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD, // passwdn't
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

