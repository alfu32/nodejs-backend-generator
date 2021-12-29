const dao=require('./Owner_group.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('/Owner_group/insert',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger.parameters['Owner_group'] = {
        in: 'body',
        description: 'Add a Owner_group',
        type:'object',
        schema: { $ref: '#/definitions/Owner_group' }
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

  app.post('/Owner_group/updateSingle',function(req,res){
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
      res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.delete('/Owner_group/deleteSingle',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger.parameters['Owner_group'] = {
        in: 'body',
        description: 'Delete Owner_group',
        type:'object',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.deleteSingle({owner_group_id:req.body.owner_group_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Owner_group/getSingle',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger.parameters['Owner_group'] = {
        in: 'body',
        description: 'get details of Owner_group by id',
        type:'object',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getSingle({owner_group_id:req.body.owner_group_id})));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Owner_group/getAll',function(req,res){
    // #swagger.tags = ['Owner_groups']
    // #swagger.description = 'get all Owner_groups'
    let result=null;
    let error=null;
    try{
      res.send(/*JSON.stringify*/(dao.getAll()));
      res.end();
    }catch(err){
      throw err;
    }
  });

  app.get('/Owner_group/countAll',function(req,res){
    // #swagger.tags = ['Owner_groups']
    // #swagger.description = 'count all Owner_groups'
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
        