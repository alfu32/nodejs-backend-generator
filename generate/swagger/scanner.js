const swaggerAutogen = require('swagger-autogen')();

const doc = {
  definitions:{
    Watcher:{
      watcher_id:"",
      owner_group_id:"",
      source:`module.exports≈{
        main({modules,data){},
      }`,
      poll_config:"",
    },
  },
  info: {
    title: 'Polly',
    description: 'Description',
  },
  host: `${process.env.PROJECT_DOMAIN}.glitch.me`,
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './**/*.controller.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);