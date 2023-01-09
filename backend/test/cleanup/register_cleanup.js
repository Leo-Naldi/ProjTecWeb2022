db = connect('mongodb://localhost/TecWebDB');

db.users.deleteOne({ "email": "pieraldo.francescani@gmail.com" })
db.users.deleteOne({ "email": "ad_min@gmail.com" })