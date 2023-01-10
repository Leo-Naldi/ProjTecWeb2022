db = connect('mongodb://localhost/TecWebDB');

db.products.deleteOne({ "name": "inshtallah" })
db.products.deleteOne({ "name": "inshtallah2" })