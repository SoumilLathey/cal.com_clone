import { dbRun, initDb } from './src/lib/db2';
initDb().then(() => {
  return dbRun("UPDATE users SET name='Admin', username='admin', email='admin@schedulo.app' WHERE id=1");
}).then(() => console.log('DB Updated')).catch(console.error);
