const dao=require('./Watcher.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Watcher/recreateTable',function(req,res){
    /*
    #swagger.tags = ['Watchers']
    #swagger.description = 'recreate table Watcher'
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

  app.post('/Watcher/insert',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'Add a Watcher',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
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

  app.post('/Watcher/updateSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'Update a Watcher',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
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

  app.delete('/Watcher/deleteSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'Delete Watcher',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
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

  app.get('/Watcher/getById/:watcher_id',function(req,res){
    /* 
    #swagger.tags = ['Watchers']
    #swagger.description = 'get details of Watcher by watcher_id'
    #swagger.responses[200] = {
            description: 'Watcher successfully obtained.',
            schema: { $ref: '#/definitions/Watcher' }
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

  app.get('/Watcher/getAll',function(req,res){
    /* 
    #swagger.tags = ['Watchers']
    #swagger.description = 'get all Watchers'
    #swagger.responses[200] = {
            description: 'Watcher list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Watcher'} }
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

  app.get('/Watcher/countAll',function(req,res){
    /* 
    #swagger.tags = ['Watchers']
    #swagger.description = 'count all Watchers'
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

  app.get('/Watcher/getBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Watchers']
    #swagger.description  = 'get all Watchers by owner_group_id'
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

  app.get('/Watcher/countBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Watchers']
    #swagger.description  = 'count all Watchers by owner_group_id'
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
        