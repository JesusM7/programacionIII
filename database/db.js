const mysql = require ("mysql2");

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((error) => {
    if(error){
        console.log("ERROR " +error);
        return;
    }
console.log("conectado!!")
});

module.exports = connection;