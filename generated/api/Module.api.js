const dao=require('../dao/Module.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Module/recreateTable',function(req,res){
    /*
    #swagger.tags = ['Modules']
    #swagger.description = 'recreate table Module'
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

  app.get('/Modules',function(req,res){
    /* 
    #swagger.tags = ['Modules']
    #swagger.description = 'get all Modules'
    #swagger.responses[200] = {
            description: 'Module list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Module'} }
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

  app.post('/Module',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger.parameters['Module'] = {
        in: 'body',
        description: 'Add a Module',
        type:'object',
        schema: { $ref: '#/definitions/Module' }
      }
      #swagger.responses[200] = {
              description: 'Module list successfully obtained.',
              schema: {$ref: '#/definitions/Module'}
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Module.insert',req.body);
      const insertResult = dao.insert(req.body);
      console.log('insertResult',insertResult)
      const lastInserted=dao.getByRowid(insertResult.lastInsertRowid)
      res.send(/*JSON.stringify*/(lastInserted));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.put('/Module',function(req,res){
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
      console.log('Module.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.delete('/Module/:module_id',function(req,res){
    // #swagger.tags = ['Modules']
    /*
    */
    let result=null;
    let error=null;
    try{
      console.log('Module.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.deleteSingle({module_id:req.params.module_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Module/:module_id',function(req,res){
    /* 
    #swagger.tags = ['Modules']
    #swagger.description = 'get details of Module by module_id'
    #swagger.responses[200] = {
            description: 'Module successfully obtained.',
            schema: { $ref: '#/definitions/Module' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getSingle({module_id:req.params.module_id}));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Modules',function(req,res){
    /* 
    #swagger.tags = ['Modules']
    #swagger.description = 'get all Modules'
    #swagger.responses[200] = {
            description: 'Module list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Module'} }
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

  app.get('/Module/rowid/:rowid',function(req,res){
    /* 
    #swagger.tags = ['Modules']
    #swagger.description = 'get details of Module by rowid'
    #swagger.responses[200] = {
            description: 'Module successfully obtained.',
            schema: { $ref: '#/definitions/Module' }
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

  app.get('/Module/countAll',function(req,res){
    /* 
    #swagger.tags = ['Modules']
    #swagger.description = 'count all Modules'
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

  app.get('/Module/getBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Modules']
    #swagger.description  = 'get all Modules by owner_group_id'
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

  app.get('/Module/countBy_owner_group_id/:owner_group_id',function (req,res){
    /*
    #swagger.tags = ['Modules']
    #swagger.description  = 'count all Modules by owner_group_id'
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
        