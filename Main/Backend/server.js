import mysql from 'mysql2'

mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'labor'
})