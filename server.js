/**
* This is the main Node.js server script for your project
* Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
*/

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});
const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE
app.get('/',(req,res,next)=>{
  res.send({
    host: `${process.env.PROJECT_DOMAIN}.glitch.me`,
    port:process.env.PORT
  })
});

require('./generated/Module.api').register(app);
require('./generated/Notifier.api').register(app);
require('./generated/Owner_group.api').register(app);
require('./generated/Subscriber.api').register(app);
require('./generated/Watcher.api').register(app);

// Run the server and report out to the lo
app.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address} ${process.env.PORT}`);
});
