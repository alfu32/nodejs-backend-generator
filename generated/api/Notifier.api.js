const dao=require('../dao/Notifier.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Notifier/recreateTable',function(req,res){
    /*
    #swagger.tags = ['Notifiers']
    #swagger.description = 'recreate table Notifier'
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

  app.get('/Notifiers',function(req,res){
    /* 
    #swagger.tags = ['Notifiers']
    #swagger.description = 'get all Notifiers'
    #swagger.responses[200] = {
            description: 'Notifier list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Notifier'} }
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

  app.post('/Notifier',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger.parameters['Notifier'] = {
        in: 'body',
        description: 'Add a Notifier',
        type:'object',
        schema: { $ref: '#/definitions/Notifier' }
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

  app.put('/Notifier',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger.parameters['Notifier'] = {
        in: 'body',
        description: 'Update a Notifier',
        type:'object',
        schema: { $ref: '#/definitions/Notifier' }
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

  app.delete('/Notifier',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger.parameters['Notifier'] = {
        in: 'body',
        description: 'Delete Notifier',
        type:'object',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.deleteSingle({notifier_id:req.body.notifier_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Notifier/:notifier_id',function(req,res){
    /* 
    #swagger.tags = ['Notifiers']
    #swagger.description = 'get details of Notifier by notifier_id'
    #swagger.responses[200] = {
            description: 'Notifier successfully obtained.',
            schema: { $ref: '#/definitions/Notifier' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getSingle({notifier_id:req.params.notifier_id}));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Notifier/countAll',function(req,res){
    /* 
    #swagger.tags = ['Notifiers']
    #swagger.description = 'count all Notifiers'
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

  app.get('/Notifier/getBy_subscriber_id/:subscriber_id',function (req,res){
    /*
    #swagger.tags = ['Notifiers']
    #swagger.description  = 'get all Notifiers by subscriber_id'
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

  app.get('/Notifier/countBy_subscriber_id/:subscriber_id',function (req,res){
    /*
    #swagger.tags = ['Notifiers']
    #swagger.description  = 'count all Notifiers by subscriber_id'
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

  app.get('/Notifier/getBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Notifiers']
    #swagger.description  = 'get all Notifiers by owner_group_id'
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

  app.get('/Notifier/countBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Notifiers']
    #swagger.description  = 'count all Notifiers by owner_group_id'
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
        