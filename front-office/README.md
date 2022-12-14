# Front Office

Sito pubblico per Animal House.

# Requisiti

- Community Tab:
    - Leaderoard dei punteggi del Game.
- E-commerce:
    - catalog diviso per sezioni di prodotti acquistabili online: cibo, prodotti sanitari, accessoristica, [cuccioli].
- Servizi in presenza:
    - Veterinario, dog sitter, [tolettatura, pensione estiva, psicologo, visita a domicilio per animali soli etc.]. 
    - Per ogni servizio deve essere presente una parte di presentazione.
    - Deve essere possibile fare una ricerca filtrata (mainly finestra temporale e luogo) dei servizi disponibili.
    - Deve essere possibile fare una ricerca di quali sedi offrono un determinato servizio in una determinata finestra temporale.
    - Ogni servizio deve essere prenotabile (da un utente autenticato). La disponibilita' dipende anche dal tipo di animale.
- Dati sugli Utenti:
    - L'app ha memoria di utenti e dei loro animali.
- [Servizi Online]: 
    -videoconf con esperti, veterinari, con il proprio animale in ospedale o in pensione.

# Framewirks

L'app e' stata implementata utilizzando React, Material-UI e un paio di componenti di React-Bootstrap.

## Project Tree
```
src
├── assets              // Asset statici 
│   ├── images          // Immagini
│   └── stylesheets     // CSS
├── components          // Singoli Componenti  
├── context             // App-Wide Context (Theme, Account)
├── index.js            // Component-Tree root
├── pages               // Page root components
├── reportWebVitals.js  // I dont know and at this point i'm too afraid to ask
├── routes              // Router and router data (URIs)
├── reducers            // Component reducers (for context and large component states)
├── tests
│   └── mocha           // Unit tests, mosty for util files
├── setupTests.js       // I swear to god one day i'll use it
├── tests               // Same as above
└── utils               // Misk utility, mostly server comms
    ├── defaultData.js  // App defaults and server-data mocks
    ├── getCities.js    // Fetch CitiesList
    ├── getProducts.js  // Fetch e-commerce products
    ├── getReviews.js   // probably useless
    ├── getServices.js  // Service fetching and filtering
    ├── httpService.js  // HTTP requests wrappers TODO
    ├── signInUser.js
    └── signUpUser.js
```