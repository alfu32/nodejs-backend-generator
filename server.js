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
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

fastify.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE


// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

fastify.get('/',(req,res,next)=>{
  res.send({
    host: `${process.env.PROJECT_DOMAIN}.glitch.me`,
    port:process.env.PORT
  })
});

// Run the server and report out to the lo
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address} ${process.env.PORT}`);
  fastify.log.info(`server listening on ${address}`);
});
