const mysql = require('mysql2');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const execSQL = async (sql) => {

  const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
  });

  await con.connect((err) => {
    if (err) {
      console.log('Erro ao conectar ao BD', err);
      return
    }
    console.log('Conexão ao BD estabelecida com sucesso!');
  })

  const response = await new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        reject(new Error());
      }
      else { resolve(result); }
    });
  });

  await con.end((err) => {
    if (err) {
      console.log('Erro ao finalizar a conexão com o BD', err);
      return
    }
    console.log('Conexão ao BD finalizada com sucesso!');
  })

  return response;
}

module.exports = {
  execSQL
}