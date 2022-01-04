const dao=require('../dao/Observable.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Observable/recreateTable',function(req,res){
    /*
    #swagger.tags = ['Observables']
    #swagger.description = 'recreate table Observable'
    */
    let result=null;
    let error=null;
    try{
      const drop = dao.drop();
      const create = dao.create();
      res.send({drop,create});
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Observables',function(req,res){
    /* 
    #swagger.tags = ['Observables']
    #swagger.description = 'get all Observables'
    #swagger.responses[200] = {
            description: 'Observable list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Observable'} }
    } */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.post('/Observable',function(req,res){
    // #swagger.tags = ['Observables']
    /*
      #swagger.parameters['Observable'] = {
        in: 'body',
        description: 'Add a Observable',
        type:'object',
        schema: { $ref: '#/definitions/Observable' }
      }
      #swagger.responses[200] = {
              description: 'Observable list successfully obtained.',
              schema: {$ref: '#/definitions/Observable'}
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Observable.insert',req.body);
      const insertResult = dao.insert(req.body);
      console.log('insertResult',insertResult)
      const lastInserted=dao.getByRowid(insertResult.lastInsertRowid)
      res.send(/*JSON.stringify*/(lastInserted));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.put('/Observable',function(req,res){
    // #swagger.tags = ['Observables']
    /*
      #swagger.parameters['Observable'] = {
        in: 'body',
        description: 'Update a Observable',
        type:'object',
        schema: { $ref: '#/definitions/Observable' }
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Observable.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.delete('/Observable/:observable_id',function(req,res){
    // #swagger.tags = ['Observables']
    /*
    */
    let result=null;
    let error=null;
    try{
      console.log('Observable.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.deleteSingle({observable_id:req.params.observable_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Observable/:observable_id',function(req,res){
    /* 
    #swagger.tags = ['Observables']
    #swagger.description = 'get details of Observable by observable_id'
    #swagger.responses[200] = {
            description: 'Observable successfully obtained.',
            schema: { $ref: '#/definitions/Observable' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getSingle({observable_id:req.params.observable_id}));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Observables',function(req,res){
    /* 
    #swagger.tags = ['Observables']
    #swagger.description = 'get all Observables'
    #swagger.responses[200] = {
            description: 'Observable list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Observable'} }
    } */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getLast()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Observable/rowid/:rowid',function(req,res){
    /* 
    #swagger.tags = ['Observables']
    #swagger.description = 'get details of Observable by rowid'
    #swagger.responses[200] = {
            description: 'Observable successfully obtained.',
            schema: { $ref: '#/definitions/Observable' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getByRowid(req.params.rowid));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Observable/countAll',function(req,res){
    /* 
    #swagger.tags = ['Observables']
    #swagger.description = 'count all Observables'
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Observable/getBy_watcher_id/:watcher_id',function (req,res){
    /*
    #swagger.tags = ['Observables']
    #swagger.description  = 'get all Observables by watcher_id'
    */
    let result=null;
    let error=null;
    try{
      res.send(dao.getBYwatcher_id({watcher_id:req.params.watcher_id}));
      res.end();
    }catch(err){
      throw err;
    }
  }
);

  app.get('/Observable/countBy_watcher_id/:watcher_id',function (req,res){
    /*
    #swagger.tags = ['Observables']
    #swagger.description  = 'count all Observables by watcher_id'
    */
    let result=null;
    let error=null;
    try{
      res.send(dao.countBYwatcher_id({watcher_id:req.params.watcher_id}));
      res.end();
    }catch(err){
      throw err;
    }
});
        }
        