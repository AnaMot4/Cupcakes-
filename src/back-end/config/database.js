const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'dpg-d4djfbfpm1nc73dcb3r0-a.oregon-postgres.render.com',
  database: 'cupcakes_7vxe',
  password: 'yh0CxHRSPSTtloC8bX7oc8R5owgbUBzT',
  port: 5432,
});

module.exports = pool;


//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('./src/back-end/config/database.sqlite');

//module.exports = db;

