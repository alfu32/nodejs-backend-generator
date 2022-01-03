/**
* This is the main Node.js server script for your project
* Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
*/

const path = require("path");
const fs = require("fs");

// Require the fastify framework and instantiate it

const express = require('express');
const app = express();
const cors = require('cors')
 const corsOptions = {
    // origin: 'https://parallel-scarlet-juravenator.glitch.me',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE, OPTIONS"
 }
 app.use(cors(corsOptions));

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE
app.get('/env',(req,res,next)=>{
  
  /* 
  #swagger.tags = ['Process']
  #swagger.description = 'get environment variables'
  #swagger.responses[200] = {
          description: 'environment variables successfully obtained.',
          schema: { type:'object' }
  } */
  res.send({
    host: `${process.env.PROJECT_DOMAIN}.glitch.me`,
    port:process.env.PORT,
    // env:process.env
  })
});
app.get('/swagger.json',(req,res)=>{
  res.send(fs.readFileSync('swagger.json'))
})
require('./generated/Module.api').register(app);
require('./generated/Notifier.api').register(app);
require('./generated/Observable.api').register(app);
require('./generated/Owner_group.api').register(app);
require('./generated/Subscriber.api').register(app);
require('./generated/Watcher.api').register(app);

// Run the server and report out to the lo
app.listen(process.env.PORT, function(err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(process.env);
  console.log(`Your app is listening on https://${process.env.PROJECT_DOMAIN}.glitch.me ${process.env.PORT}`);
});
