const swaggerAutogen = require('swagger-autogen')();
const model=require('../model.json.js');
const doc = {
  definitions:model,
  info: {
    title: 'Polly',
    description: 'configurable poll distant resources',
  },
  host: `${process.env.PROJECT_DOMAIN}.glitch.me`,
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', '**/*.controller.js', './generated/*.api.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);