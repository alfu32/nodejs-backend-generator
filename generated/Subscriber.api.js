const dao=require('./Subscriber.dao.js')
        module.exports={
register
        }
        function register(app){
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

  app.get('/Subscriber/getSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'get details of Subscriber by id',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
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

  app.get('/Subscriber/getAll',function(req,res){
    // #swagger.tags = ['Subscribers']
    // #swagger.description = 'get all Subscribers'
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
    // #swagger.tags = ['Subscribers']
    // #swagger.description = 'count all Subscribers'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Subscriber/getBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get list of Subscriber by subscriber_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getBYsubscriber_id({subscriber_id:req.body.subscriber_id})));
      res.end();
    }catch(err){
      throw err;
    }
  }
);

  app.get('/Subscriber/countBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'count Subscribers by subscriber_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countBYsubscriber_id({subscriber_id:req.body.subscriber_id})));
      res.end();
    }catch(err){
      throw err;
    }
});

  app.get('/Subscriber/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get list of Subscriber by owner_group_id',
        schema: { $ref: '#/definitions/Subscriber' }
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

  app.get('/Subscriber/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'count Subscribers by owner_group_id',
        schema: { $ref: '#/definitions/Subscriber' }
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
        