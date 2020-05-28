const mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  user: "health-user",
  password: "12345678",
  database: 'healthUser'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


module.exports = connection

