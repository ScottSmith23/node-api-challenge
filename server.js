const express = require('express');

const actionRouter = require('./routerActions/actionRouter.js');
const projectRouter = require('./routerProjects/projectRouter.js');

const server = express();
const cors = require('cors');
const helmet = require('helmet');

//custom middleware
server.use(helmet());
server.use(express.json());
server.use(cors())


//endpoints
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);
server.get('/', (req, res) => {
  res.send(`<h2>SCOTT'S SPRINT API!</h2>`);
});

module.exports = server;


function logger(req,res,next) {
  console.log(`${req.method} Request to ${req.originalUrl}`)
}
