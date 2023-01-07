# Project Tec Web 2022-2023

Project for the Web Technologies course.

## Setup

Run the following in the root directory to install everything.

```bash
npm i && npm --prefix ./front-office i && npm --prefix ./back-office i && npm --prefix ./backend i
```

You'll need to create a .local.env file in the root dir as follows:

```bash
FRONTOFFICE_PORT= # Some high port nimber
BACKOFFICE_PORT= # Some other high port number
BACKEND_PORT= # Some other other high port number

FRONTOFFICE_HOST="localhost"
BACKOFFICE_HOST="localhost"
BACKEND_HOST="localhost"

MONGO_HOST="localhost" # Assuming you are using a local mongodb
MONGO_PORT=27017 # Default mongo port, if you set another one you have to change this too
MONGO_DBNAME="TecWebDB"

JWT_SECRET="some incredible secret" # Secret key to generate jw tokens in the backend
```

With the first three variables set to any three high port (currently frontoffice auto runs on port 3000 so don't use that one).

Each sub-project contains extra set

## Usage 

Currently the root-level package.json contains scripts to start each individual site, for example:

```bash
npm run start-frontoffice
```

Or you can start all of them:

```bash
npm run start-all
```

backoffice and backend can also be started with the dev script:

```bash
npm run dev-backoffice
```
Which runs nodemon instead of node.