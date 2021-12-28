const dao=require('./Watcher.dao.json')
        module.exports={
register
        }
        function register(app){
app.POST('Watcher/insert',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'Add a Watcher',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.insert(req.body)
  })

  app.POST('Watcher/updateSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'Update a Watcher',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.updateSingle(req.body)
  })

  app.DELETE('Watcher/deleteSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'Delete Watcher',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.deleteSingle({watcher_id:req.body.watcher_id})
  })

  app.GET('Watcher/getSingle',function(req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'get details of Watcher by id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.getSingle({watcher_id:req.body.watcher_id})
  })

  app.GET('Watcher/getAll',function(req,res){
    // #swagger.tags = ['Watchers']
    // #swagger.description = 'get all Watchers'
    return dao.getAll()()
  })

  app.GET('Watcher/countAll',function(req,res){
    // #swagger.tags = ['Watchers']
    // #swagger.description = 'count all Watchers'
    return dao.countAll()()
  })

  app.GET('Watcher/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'get list of Watcher by owner_group_id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id})
  }
})

  app.GET('Watcher/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Watchers']
    /*
      #swagger..parameters['Watcher'] = {
        in: 'body',
        description: 'count Watchers by owner_group_id',
        schema: { $ref: '#/definitions/Watcher' }
      }
    */
    return dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id})
})
        }
        