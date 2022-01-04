const dao=require('../dao/Owner_group.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Owner_group/recreateTable',function(req,res){
    /*
    #swagger.tags = ['Owner_groups']
    #swagger.description = 'recreate table Owner_group'
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

  app.get('/Owner_groups',function(req,res){
    /* 
    #swagger.tags = ['Owner_groups']
    #swagger.description = 'get all Owner_groups'
    #swagger.responses[200] = {
            description: 'Owner_group list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Owner_group'} }
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

  app.post('/Owner_group',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger.parameters['Owner_group'] = {
        in: 'body',
        description: 'Add a Owner_group',
        type:'object',
        schema: { $ref: '#/definitions/Owner_group' }
      }
      #swagger.responses[200] = {
              description: 'Owner_group list successfully obtained.',
              schema: {$ref: '#/definitions/Owner_group'}
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Owner_group.insert',req.body);
      const insertResult = dao.insert(req.body);
      console.log('insertResult',insertResult)
      const lastInserted=dao.getByRowid(insertResult.lastInsertRowid)
      res.send(/*JSON.stringify*/(lastInserted));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.put('/Owner_group',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger.parameters['Owner_group'] = {
        in: 'body',
        description: 'Update a Owner_group',
        type:'object',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    let result=null;
    let error=null;
    try{
      console.log('Owner_group.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.delete('/Owner_group/:owner_group_id',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
    */
    let result=null;
    let error=null;
    try{
      console.log('Owner_group.updateSingle',req.body);
      res.send(/*JSON.stringify*/(dao.deleteSingle({owner_group_id:req.params.owner_group_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Owner_group/:owner_group_id',function(req,res){
    /* 
    #swagger.tags = ['Owner_groups']
    #swagger.description = 'get details of Owner_group by owner_group_id'
    #swagger.responses[200] = {
            description: 'Owner_group successfully obtained.',
            schema: { $ref: '#/definitions/Owner_group' }
    } */
    let result=null;
    let error=null;
    try{
      res.send(dao.getSingle({owner_group_id:req.params.owner_group_id}));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Owner_groups',function(req,res){
    /* 
    #swagger.tags = ['Owner_groups']
    #swagger.description = 'get all Owner_groups'
    #swagger.responses[200] = {
            description: 'Owner_group list successfully obtained.',
            schema: { type:'array',item:{$ref: '#/definitions/Owner_group'} }
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

  app.get('/Owner_group/rowid/:rowid',function(req,res){
    /* 
    #swagger.tags = ['Owner_groups']
    #swagger.description = 'get details of Owner_group by rowid'
    #swagger.responses[200] = {
            description: 'Owner_group successfully obtained.',
            schema: { $ref: '#/definitions/Owner_group' }
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

  app.get('/Owner_group/countAll',function(req,res){
    /* 
    #swagger.tags = ['Owner_groups']
    #swagger.description = 'count all Owner_groups'
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
        }
        