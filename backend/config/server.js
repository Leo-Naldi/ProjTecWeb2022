const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const bodyParser = require("body-parser");
require("./auth");

const server = express();
const router = require("./router");

// TODO only allow animal house domains
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(helmet());
server.use(cors());
server.use(express.json());

server.options("*", cors());

server.use(router);

module.exports = server;