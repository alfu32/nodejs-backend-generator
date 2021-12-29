const dao=require('./Subscriber.dao.js')
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

  app.post('/Subscriber/insert',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Add a Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.insert(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.post('/Subscriber/updateSingle',function(req,res){
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
      res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.delete('/Subscriber/deleteSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Delete Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.deleteSingle({watcher_id:req.body.watcher_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Subscriber/getById/:watcher_id',function(req,res){
    /* 
    #swagger.tags = ['Subscribers']
    #swagger.description = 'get details of Subscriber by watcher_id'
    #swagger.responses[200] = {
            description: 'Subscriber successfully obtained.',
            schema: { $ref: '#/definitions/Subscriber' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getSingle({watcher_id:req.params.watcher_id}));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Subscriber/getAll',function(req,res){
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

  app.get('/Subscriber/getBy_subscriber_id/:subscriber_id',function (req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description  = 'get all Subscribers by subscriber_id'
    */
    let result=null;
    let error=null;
    try{
      res.send(dao.getBYsubscriber_id({subscriber_id:req.params.subscriber_id}));
      res.end();
    }catch(err){
      throw err;
    }
  }
);

  app.get('/Subscriber/countBy_subscriber_id/:subscriber_id',function (req,res){
    /*
    #swagger.tags = ['Subscribers']
    #swagger.description  = 'count all Subscribers by subscriber_id'
    */
    let result=null;
    let error=null;
    try{
      res.send(dao.countBYsubscriber_id({subscriber_id:req.params.subscriber_id}));
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
        