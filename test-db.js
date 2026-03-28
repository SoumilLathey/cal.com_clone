const db = require('./src/lib/db2.ts');
db.dbAll('SELECT * FROM users').then(console.log).catch(console.error);
