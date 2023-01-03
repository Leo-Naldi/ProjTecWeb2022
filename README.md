# Project Tec Web 2022-2023

Project for the Web Technologies course.

## Setup

Run the following 

```bash
npm i && npm --prefix ./front-office i && npm --prefix ./back-office i && npm --prefix ./backend i
```

In the root directory to install everything. You'll need to create a .local.env file in the root dir as follows:

```bash
FRONTOFFICE_PORT= # Some high port nimber
BACKOFFICE_PORT= # Some other high port number
BACKEND_PORT= # Some other other high port number

FRONTOFFICE_HOST="localhost"
BACKOFFICE_HOST="localhost"
BACKEND_HOST="localhost"
```

With the first three variables set to any three high port (currently frontoffice auto runs on port 3000 so don't use that one).

# Usage 

Currently the root-level package.json contains scripts to start each individual site, for example:

```bash
npm run start-frontoffice
```

Or you can start all of them:

```bash
npm run start-all
```

The backoffice can also be started with the dev script:

```bash
npm run dev-backoffice
```
Which runs nodemon instead of node (aka the server will be restarted every time a .js or .html file changes).