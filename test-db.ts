import { dbAll } from './src/lib/db2.ts';
dbAll('SELECT * FROM bookings').catch(e => console.error("Caught error:", e));
