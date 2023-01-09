# Backend

REST (o almeno quella era l'intenzione) API per interfacciarsi con il db e gestire l'autenticazione utenti (implementata tramite json web token).

## Setup

Occorre avere MongoDB installato ([docs](https://www.mongodb.com/docs/manual/installation/)) e mongosh ([docs](https://www.mongodb.com/docs/mongodb-shell/)) per i test.

Occorre creare un file .env coi seguenti campi

```bash
MONGO_HOST="localhost"
MONGO_PORT=27017 # O qualsiasi sia il port di mongo
MONGO_DBNAME="TecWebDB"

JWT_SECRET="Shhhhh very secret"

BACKEND_HOST="localhost"
BACKEND_PORT=8001
```

In locale e' necessario che mongo stia andando, p.e. su linux:

```bash
sudo systemctl start mongod
```

Si puo' controllare che sia partito correttamente con

```bash
sudo systemctl status mongod
```

Utilizzando mongosh, occorre creare il db e le collezioni:

```
use TecWebDB
db.createCollection("users")
db.createCollection("products")
db.createCollection("posts")
db.createCollection("services")
```
Dopodiche il db puo' essere riempito usando 

```bash
npm run remake-db
```

Che carica gli script di ./data in mongosh. NB remake-db svuota il db prima di riepirlo.


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

// Tipi di utenti
const user_types = [
    "user",
    "admin",
]
```

## REST API

I livelli di autenticazione disponibili sono i seguenti:
- **None**, utente non loggato (nelle tabelle e' indicato con -)
- **User**, loggato come utente del front-office/game.
- **Admin**, loggato come amministratore.

Ogni livello puo' ovviamente fare tutto cio che e' permesso ai livelli precedenti.

URIs:

| **URI**   | **Description**  | **Methods** | **Auth** |
|-----------|------------------|-----|-----|
| /users/ | User Collection | GET, POST | Admin (GET), None (POST) |
| /products/ | Product Collection| GET, POST | None (GET), Admin (POST) |
| /products/id/:id | Get product with given id | GET | None (GET) |
| /products/category/:category | Get products with given category | GET | None (GET) |
| /services/ | Services Collection| GET, POST | None (GET), Admin (POST)|
| /posts/ | Community Posts Collection | GET, POST | None (GET), User (POST)|


Autenticazione:

| **URI**   | **Description**  | **Methods** | **Auth** |
|-----------|------------------|-----|-----|
| /login/user | Permette di loggare come utente (ritorna il token nel body) | POST | None (POST) |
| /login/admin | Permette di loggare come amministratore (ritorna il token nel body) | POST | None (POST) |
| /register/user | Permette di registrare un nuovo utente. Se la richiesta ha successo genera il token e lo spedisce nel body della risposta. | POST | None (POST) |
 /register/admin | Permette di registrare un nuovo amministratore. Se la richiesta ha successo genera il token e lo spedisce nel body della risposta. | POST | Admin (POST) |

## Project Structure

TODO