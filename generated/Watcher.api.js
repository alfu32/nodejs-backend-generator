const dao=require('./Watcher.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('Watcher/insert',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'Add a Watcher',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.insert(req.body);
  });

  app.post('Watcher/updateSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'Update a Watcher',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.updateSingle(req.body);
  });

  app.delete('Watcher/deleteSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'Delete Watcher',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.deleteSingle({watcher_id:req.body.watcher_id});
  });

  app.get('Watcher/getSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger.parameters['Watcher'] = {
        in: 'body',
        description: 'get details of Watcher by id',
        type:'object',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.getSingle({watcher_id:req.body.watcher_id});
  });

  app.get('Watcher/getAll',function(req,res){
    // #swagger.tags = ['Watchers']
    // #swagger.description = 'get all Watchers'
    return dao.getAll()
  });

  app.get('Watcher/countAll',function(req,res){
    // #swagger.tags = ['Watchers']
    // #swagger.description = 'count all Watchers'
    return dao.countAll()
  });

  app.get('Watcher/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'get list of Watcher by owner_group_id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id});
  }
);

  app.get('Watcher/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'count Watchers by owner_group_id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id});
});
        }
        