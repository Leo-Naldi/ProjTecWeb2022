# Backend

REST (o almeno quella era l'intenzione) API per interfacciarsi con il db e gestire l'autenticazione utenti.

## Setup

Occorre avere MongoDB installato ([docs](https://www.mongodb.com/docs/manual/installation/)) e aver setuppato ../.local.env con i relativi dati (host e port).

In locale bisogna far partire mongo con systemctl

```bash
sudo systemctl start mongod
```

Si puo' controllare che sia partito correttamente con

```bash
sudo systemctl status mongod
```

Utilizzando mongosh ([docs](https://www.mongodb.com/docs/mongodb-shell/)), occorre creare il db e le collezioni:

```
use TecWebDB
db.createCollection("users")
db.createCollection("products")
db.createCollection("posts")
db.createCollection("services")
```

Per inserire dei dati di default (quelli contenuti nella directory ./data) basta lanciare

```bash
npm run setup-db
```

Nella root-dir del backend. Lo script utilizzato e' ./db/setup.js, che contiene anche una funzione per svuotare il db.S



## Info sui Dati

Valori costanti utilizzati nel db:

```javascript

// Tipi usati nel frontend
const pet_types = [
    'cane', 
    'gatto', 
    'rettile', 
    'uccello', 
    'scoiattolo', 
    'pesce', 
    'ragno',
    'orrore lovecraftiano',
    'criceto',
];


// Taglie usate nel frontend
const pet_sizes = [
    'subatomico',
    'microscopico',
    'minuscolo',
    'piccolo',
    'medio',
    'grande',
    'immenso',
    'colossale',
    'gargantuesco',
    'apocalittico',
];

// Categorie prodotti
const categories = [
    'giocattoli',
    'igene',
    'accessori',
    'cibo',
    'armi di distruzione di massa',
];
```
La directory ./data contiene dei file .json con cui riempire il db.

# REST API

Available URIs:

| **URI**   | **Description**  |
|-----------|------------------|
| /users/ | User Collection |
| /products/ | Product Collection|
| /services/ | Services Collection|
| /posts/ | Community Posts Collection |