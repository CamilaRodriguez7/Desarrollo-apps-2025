const mysql = require("mysql2");

const conn = mysql.createConnection({
	host: "127.0.0.1", // evita rarezas con 'localhost'
	port: 3307, // <-- coincide con -p 3307:3306
	user: "root",
	password: "secret",
	database: "musicdb",
});

conn.connect((err) => {
	if (err) {
		console.error("Error de conexión:", err);
		return;
	}
	console.log("Conectado:", conn.threadId);
	conn.query("SELECT 1 AS ok", (e, r) => {
		if (e) return console.error(e);
		console.log("Ping:", r);
		conn.query("SELECT * FROM albums", (e2, rows) => {
			if (e2) return console.error(e2);
			console.log(rows);
			conn.end();
		});
	});
});
