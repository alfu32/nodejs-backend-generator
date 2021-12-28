const dao=require('./Module.dao.js')
        module.exports={
register
        }
        function register(app){
app.POST('Module/insert',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'Add a Module',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    return dao.insert(req.body);
  });

  app.POST('Module/updateSingle',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'Update a Module',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    return dao.updateSingle(req.body);
  });

  app.DELETE('Module/deleteSingle',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'Delete Module',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    return dao.deleteSingle({module_id:req.body.module_id});
  });

  app.GET('Module/getSingle',function(req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'get details of Module by id',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    return dao.getSingle({module_id:req.body.module_id});
  });

  app.GET('Module/getAll',function(req,res){
    // #swagger.tags = ['Modules']
    // #swagger.description = 'get all Modules'
    return dao.getAll()
  });

  app.GET('Module/countAll',function(req,res){
    // #swagger.tags = ['Modules']
    // #swagger.description = 'count all Modules'
    return dao.countAll()
  });

  app.GET('Module/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'get list of Module by owner_group_id',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    return dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id});
  }
);

  app.GET('Module/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Modules']
    /*
      #swagger..parameters['Module'] = {
        in: 'body',
        description: 'count Modules by owner_group_id',
        schema: { $ref: '#/definitions/Module' }
      }
    */
    return dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id});
});
        }
        