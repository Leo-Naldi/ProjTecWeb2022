/*
 * Svuota tutte le collezioni nel db, usage:
 *      mongosh -f drop_all.js 
 */

db = connect('mongodb://localhost/TecWebDB');

db.users.deleteMany({});
db.products.deleteMany({});
db.services.deleteMany({});