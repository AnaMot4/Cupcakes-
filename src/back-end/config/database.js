const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'yh0CxHRSPSTtloC8bX7oc8R5owgbUBzT@dpg-d4djfbfpm1nc73dcb3r0-a',
  database: 'cupcakes_7vxe',
  password: 'yh0CxHRSPSTtloC8bX7oc8R5owgbUBzT',
  port: 5432,
});

module.exports = pool;


//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

//module.exports = db;

