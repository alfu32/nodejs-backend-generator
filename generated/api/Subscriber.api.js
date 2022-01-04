const dao=require('../dao/Subscriber.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Subscriber/recreateTable',function(req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description = 'recreate table Subscriber'
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

  app.get('/Subscribers',function(req,res){
    /* 
    #swagger.tags = ['Subscribers']
    #swagger.description = 'get all Subscribers'
    #swagger.responses[200] = {
            description: 'Subscriber list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Subscriber'} }
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

  app.post('/Subscriber',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Add a Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
      #swagger.responses[200] = {
              description: 'Subscriber list successfully obtained.',
              schema: {$ref: '#/definitions/Subscriber'}
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Subscriber.insert',req.body);
      const insertResult = dao.insert(req.body);
      console.log('insertResult',insertResult)
      const lastInserted=dao.getByRowid(insertResult.lastInsertRowid)
      res.send(/*JSON.stringify*/(lastInserted));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.put('/Subscriber',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Update a Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Subscriber.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.delete('/Subscriber/:subscriber_id',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
    */
    let result=null;
    let error=null;
    try{
      console.log('Subscriber.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.deleteSingle({subscriber_id:req.params.subscriber_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Subscriber/:subscriber_id',function(req,res){
    /* 
    #swagger.tags = ['Subscribers']
    #swagger.description = 'get details of Subscriber by subscriber_id'
    #swagger.responses[200] = {
            description: 'Subscriber successfully obtained.',
            schema: { $ref: '#/definitions/Subscriber' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getSingle({subscriber_id:req.params.subscriber_id}));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Subscribers',function(req,res){
    /* 
    #swagger.tags = ['Subscribers']
    #swagger.description = 'get all Subscribers'
    #swagger.responses[200] = {
            description: 'Subscriber list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Subscriber'} }
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

  app.get('/Subscriber/rowid/:rowid',function(req,res){
    /* 
    #swagger.tags = ['Subscribers']
    #swagger.description = 'get details of Subscriber by rowid'
    #swagger.responses[200] = {
            description: 'Subscriber successfully obtained.',
            schema: { $ref: '#/definitions/Subscriber' }
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

  app.get('/Subscriber/countAll',function(req,res){
    /* 
    #swagger.tags = ['Subscribers']
    #swagger.description = 'count all Subscribers'
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

  app.get('/Subscriber/getBy_watcher_id/:watcher_id',function (req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description  = 'get all Subscribers by watcher_id'
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

  app.get('/Subscriber/countBy_watcher_id/:watcher_id',function (req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description  = 'count all Subscribers by watcher_id'
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

  app.get('/Subscriber/getBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description  = 'get all Subscribers by owner_group_id'
    */
    let result=null;
    let error=null;
    try{
      res.send(dao.getBYowner_group_id({owner_group_id:req.params.owner_group_id}));
      res.end();
    }catch(err){
      throw err;
    }
  }
);

  app.get('/Subscriber/countBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description  = 'count all Subscribers by owner_group_id'
    */
    let result=null;
    let error=null;
    try{
      res.send(dao.countBYowner_group_id({owner_group_id:req.params.owner_group_id}));
      res.end();
    }catch(err){
      throw err;
    }
});
        }
        