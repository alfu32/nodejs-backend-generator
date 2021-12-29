const dao=require('./Notifier.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Notifier/insert',function(req,res){
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

  app.post('/Notifier/updateSingle',function(req,res){
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

  app.delete('/Notifier/deleteSingle',function(req,res){
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

  app.get('/Notifier/getSingle',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger.parameters['Notifier'] = {
        in: 'body',
        description: 'get details of Notifier by id',
        type:'object',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getSingle({notifier_id:req.body.notifier_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Notifier/getAll',function(req,res){
    // #swagger.tags = ['Notifiers']
    // #swagger.description = 'get all Notifiers'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Notifier/countAll',function(req,res){
    // #swagger.tags = ['Notifiers']
    // #swagger.description = 'count all Notifiers'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Notifier/getBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'get list of Notifier by subscriber_id',
        schema: { $ref: '#/definitions/Notifier' }
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

  app.get('/Notifier/countBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'count Notifiers by subscriber_id',
        schema: { $ref: '#/definitions/Notifier' }
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

  app.get('/Notifier/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'get list of Notifier by owner_group_id',
        schema: { $ref: '#/definitions/Notifier' }
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

  app.get('/Notifier/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'count Notifiers by owner_group_id',
        schema: { $ref: '#/definitions/Notifier' }
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
        