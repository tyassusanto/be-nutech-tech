require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Zxcxz@123',
    database : 'nutech'
})

module.exports = connection