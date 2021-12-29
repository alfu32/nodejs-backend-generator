const dao=require('./Module.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Module/insert',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger.parameters['Module'] = {
        in: 'body',
        description: 'Add a Module',
        type:'object',
        schema: { $ref: '#/definitions/Module' }
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

  app.post('/Module/updateSingle',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger.parameters['Module'] = {
        in: 'body',
        description: 'Update a Module',
        type:'object',
        schema: { $ref: '#/definitions/Module' }
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

  app.delete('/Module/deleteSingle',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger.parameters['Module'] = {
        in: 'body',
        description: 'Delete Module',
        type:'object',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.deleteSingle({module_id:req.body.module_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Module/getSingle',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger.parameters['Module'] = {
        in: 'body',
        description: 'get details of Module by id',
        type:'object',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getSingle({module_id:req.body.module_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Module/getAll',function(req,res){
    // #swagger.tags = ['Modules']
    // #swagger.description = 'get all Modules'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Module/countAll',function(req,res){
    // #swagger.tags = ['Modules']
    // #swagger.description = 'count all Modules'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.countAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Module/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'get list of Module by owner_group_id',
        schema: { $ref: '#/definitions/Module' }
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

  app.get('/Module/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'count Modules by owner_group_id',
        schema: { $ref: '#/definitions/Module' }
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
        