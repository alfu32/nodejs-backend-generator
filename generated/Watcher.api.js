const dao=require('./Watcher.dao.js')
        module.exports={
register
        }
        function register(app){
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

  app.get('/Watcher/getSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'get details of Watcher by id',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getSingle({watcher_id:req.body.watcher_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Watcher/getAll',function(req,res){
    // #swagger.tags = ['Watchers']
    // #swagger.description = 'get all Watchers'
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
    // #swagger.tags = ['Watchers']
    // #swagger.description = 'count all Watchers'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Watcher/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'get list of Watcher by owner_group_id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id})));
      res.end();
    }catch(err){
      throw err;
    }
  }
);

  app.get('/Watcher/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'count Watchers by owner_group_id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id})));
      res.end();
    }catch(err){
      throw err;
    }
});
        }
        