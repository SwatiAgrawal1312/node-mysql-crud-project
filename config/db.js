const mysql=require('mysql2/promise')
//create the connection pool
const db = mysql.createPool({
   host: 'localhost',
  user: 'root',
  password:'Swati1312@',
  database: 'students_db',
  
});
module.exports= db;

