import { dbAll } from './src/lib/db2';
dbAll('SELECT * FROM bookings').catch(e => console.error("Caught error:", e));
