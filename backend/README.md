# Backend

REST (o almeno quella era l'intenzione) API per interfacciarsi con il db e gestire l'autenticazione utenti (implementata tramite json web token).

## Setup

I node_modules possono essere installati con:

```bash
npm install
```

Occorre creare nella directory /backend/ un file .env coi seguenti campi:

```bash
MONGO_HOST="localhost" # Se si usa mongo in locale
MONGO_PORT=27017 # Di default mongo usa questo
MONGO_DBNAME="TecWebDB"

JWT_SECRET="Shhhhh very secret"

BACKEND_HOST="localhost"
BACKEND_PORT= # Qualsiasi high port
```

Per utilizzare mongo in locale occorre installare:

- MongoDB: ([docs](https://www.mongodb.com/docs/manual/installation/))
- Mongo Shell: ([docs](https://www.mongodb.com/docs/mongodb-shell/))

Su linux, per far partire mongo basta usare:

```bash
sudo systemctl start mongod
```

Si puo' controllare che sia partito correttamente con

```bash
sudo systemctl status mongod
```

E lo si puo' fermare con:

```bash
sudo systemctl status mongod
```

Utilizzando mongosh, occorre creare il db e le collezioni:

```
use TecWebDB # O qualsiasi nome si sia dato al db nel file.env
db.createCollection("users")
db.createCollection("products")
db.createCollection("posts")
db.createCollection("services")
```
Dopodiche il db puo' essere riempito usando 

```bash
npm run make-db
```

## Scripts

Gli script sono definiti in ./packag.json.

Per far partire il server in modalita' debug:

```bash
npm run start-dev
```

Per far andare i test:

```bash
npm test
```

Per svuotare e riinizializzare il db:

```bash
npm run remake-db
```

Per inizializzare il db vuoto:

```bash
npm run make-db
```

Per svuotare il db:

```bash
mongosh -f ./data/drop_all.js
```

Per tutti gli script e' necessario che mongo stia andando.

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
- **SpecificUser**, gli endpoint che permettono di visualizzare e manipolare le info di un cliente sono disponibili sono al cliente stesso.
- **Admin**, loggato come amministratore.

Ogni livello puo' ovviamente fare tutto cio che e' permesso ai livelli precedenti.

URI implementati:

| **URI**   | **Description**  | **Methods** | **Auth** |
|-----------|------------------|-----|-----|
| /users/ | User Collection | GET, | Admin (GET) |
| /users/register/user | Crea un account user | POST | None (POST) |
| /users/register/admin | crea un account admin | POST | Admin (POST) |
| /users/id/:id | Singolo utente | GET, POST, DELETE | SpecificUser (GET, POST, DELETE) |
| /users/email/:email | Singolo utente | GET, POST, DELETE | SpecificUser (GET, POST, DELETE) |
| /products/ | Product Collection| GET, POST | None (GET), Admin (POST) |
| /products/id/:id | Singolo prodotto | GET, POST, DELETE | None (GET), Admin (POST, DELETE) |
| /products/category/:category | Get products with given category | GET | None (GET) |
| /services/ | Services Collection| GET, POST | None (GET), Admin (POST)|
| /services/id/:id | Singolo servizio | GET, POST, DELETE | Admin (GET, POST, DELETE) |

\* Per quanto riguarda gli endpoint /users/id/:id e /users/email/:email, a ogni utente e' permesso accedere solo alle proprie informazioni, se si cerca di accedere alle informazioni altrui si ricevera 401.

Autenticazione:

| **URI**   | **Description**  | **Methods** | **Auth** |
|-----------|------------------|-----|-----|
| /login/user | Permette di loggare come utente (ritorna il token nel body) | POST | None (POST) |
| /login/admin | Permette di loggare come amministratore (ritorna il token nel body) | POST | None (POST) |

### Collezioni

Esistono 4 collezioni (implementate 3):

- /users/
- /products/
- /services/
- /posts/

Per ogni collezione esiste un endpoint /{collezione}/id/:id che permette di accedere alle singole risorse.

### Metodi

Chiamare **GET** ritornera' sempre un array di oggetti, nel caso delle collezioni si trattera' dell'intera collezione, nel caso delle singole risorse si trattera d un array di un solo elemento. In caso di errore ritorna 401 se la richiesta non contiene un token adeguato, 409 se i dati inviati sono errati (p.e. un id non valido). Gli oggetti ottenuti dal GET sulla collezione sono esattamente gli stessi ottenuti dai get su /id/:id.

Chiamare **POST** sulle collezioni crea un nuovo elemento, sui singoli modifica la risorsa. In entrambi i casi si usano i dati del body e si ritorna un oggetto contenente l'id della risorsa creata/modificata. In caso di errore ritorna 401 se la richiesta non contiene un token adeguato, 409 se i dati inviati sono errati (p.e. un id non valido).

Il metodo **DELETE** e' disponibile solo sulle singole risorse, e rimuove la risorsa dalla collezione, aka chiamare GET /id/:id dopo aver chiamato delete ritornera' 409 e chiamare GET /collection/ ritornera' un array che non contiene l'elemento cancellato.
In caso di errore ritorna 401 se la richiesta non contiene un token adeguato, 409 se i dati inviati sono errati.

## Autenticazione

L'api accetta e invia solo JSON. L'autenticazione e' eseguita tramite json web token.
Per ottenere un token occore fare POST su /login/user/ o /login/admin/, includendo nel corpo della richiesta email e password, ad esempio:

```json
{
    "email": "piero.angela@gmail.com",
    "password": "passwordsicurissima"
}
```

Se email e password sono validi si ricevera' una risposta con status code 200 e body che includera' un campo token come segue:

```json
{
    "token": "keyboardsmash.exe",
    "id": "keyboardsmash2.exe"
}
```
Il token potra essere usato nelle successive richieste con schema bearer, p.e:

```javascript
fetch(url, {
    headers: {
        'Authorization': 'Bearer ' + token,
        ...
    }
    body: ...
})
```

Alternativamente, quando si registra un nuovo utente (POST /users/user o /users/admin) si riceve un token nel body della risposta.

L'API risponeda' con 401 a qualsiasi richiesta non autenticata correttamente (p.e. senza token quando serve, con un toker user quando ne serve uno admin, etc.).

Per comodita' di debug sono stati creati due endpoint:

- /users/verifytoken/user
- /users/verifytoken/admin

Che rispondono a una GET con 200 se il token inviato e' corretto, 401 altrimenti.

## Status Code

L'API risponde con tre codici:

- 200, la richiesta e' andata a buon fine, il risultato e' nel body
- 401, autenticazione fallita (p.e. non si e' inviato il token, il token era sbagliato, etch)
- 409, i dati inviati non sono corretti o non corrispondono a nessuna risorsa presente nel db (p.e. si e' fatto GET /users/email/:email con una email che non appartiene a nessun utente)

## TODOS

- /users/register fa schifo come endpoint, sarebbe meglio mettere un post generico da qualche parte
- POST deve sempre ritornare la risorsa aggiunta o modificata
- i GET sulle collezioni devono gestire il campo query
- Gestire lo scheduling (i.e. creare prenotazoni, trovare i provider disponibili in un dato giorno, cancellare una prenotazione)
- Aggiungere il cart agli utenti (mehhhhh non e' cosi importante dai)