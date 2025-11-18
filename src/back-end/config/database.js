const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123Mudar@',
  port: 5432,
});

module.exports = pool;


//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

//module.exports = db;

