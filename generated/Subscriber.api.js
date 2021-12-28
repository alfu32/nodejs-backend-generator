const dao=require('./Subscriber.dao.json')
        module.exports={
register
        }
        function register(app){
app.POST('Subscriber/insert',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'Add a Subscriber',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.insert(req.body)
  })

  app.POST('Subscriber/updateSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'Update a Subscriber',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.updateSingle(req.body)
  })

  app.DELETE('Subscriber/deleteSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'Delete Subscriber',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.deleteSingle({watcher_id:req.body.watcher_id})
  })

  app.GET('Subscriber/getSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get details of Subscriber by id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.getSingle({watcher_id:req.body.watcher_id})
  })

  app.GET('Subscriber/getAll',function(req,res){
    // #swagger.tags = ['Subscribers']
    // #swagger.description = 'get all Subscribers'
    return dao.getAll()()
  })

  app.GET('Subscriber/countAll',function(req,res){
    // #swagger.tags = ['Subscribers']
    // #swagger.description = 'count all Subscribers'
    return dao.countAll()()
  })

  app.GET('Subscriber/getBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get list of Subscriber by subscriber_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.getBYsubscriber_id({subscriber_id:req.body.subscriber_id})
  }
})

  app.GET('Subscriber/countBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'count Subscribers by subscriber_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.countBYsubscriber_id({subscriber_id:req.body.subscriber_id})
})

  app.GET('Subscriber/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get list of Subscriber by owner_group_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id})
  }
})

  app.GET('Subscriber/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'count Subscribers by owner_group_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id})
})
        }
        