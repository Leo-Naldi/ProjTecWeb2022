db = connect('mongodb://localhost/TecWebDB');

db.products.deleteOne({ "name": "inshtallah" })