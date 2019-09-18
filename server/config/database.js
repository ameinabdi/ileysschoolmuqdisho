require('dotenv').config();
import mysql from 'mysql';
import util from 'util';

const connection = mysql.createPool({
  client: 'mysql',
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ileys',
  port: '3306',

});


// Ping database to check for common exception errors.
connection.getConnection((err, connections) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connections) connections.release()

  return
})

connection.query = util.promisify(connection.query) // Magic happens here.


export default connection;