const dao=require('./Notifier.dao.json')
        module.exports={
register
        }
        function register(app){
app.POST('Notifier/insert',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'Add a Notifier',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.insert(req.body)
  })

  app.POST('Notifier/updateSingle',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'Update a Notifier',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.updateSingle(req.body)
  })

  app.DELETE('Notifier/deleteSingle',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'Delete Notifier',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.deleteSingle({notifier_id:req.body.notifier_id})
  })

  app.GET('Notifier/getSingle',function(req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'get details of Notifier by id',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.getSingle({notifier_id:req.body.notifier_id})
  })

  app.GET('Notifier/getAll',function(req,res){
    // #swagger.tags = ['Notifiers']
    // #swagger.description = 'get all Notifiers'
    return dao.getAll()()
  })

  app.GET('Notifier/countAll',function(req,res){
    // #swagger.tags = ['Notifiers']
    // #swagger.description = 'count all Notifiers'
    return dao.countAll()()
  })

  app.GET('Notifier/getBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'get list of Notifier by subscriber_id',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.getBYsubscriber_id({subscriber_id:req.body.subscriber_id})
  }
})

  app.GET('Notifier/countBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'count Notifiers by subscriber_id',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.countBYsubscriber_id({subscriber_id:req.body.subscriber_id})
})

  app.GET('Notifier/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'get list of Notifier by owner_group_id',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id})
  }
})

  app.GET('Notifier/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Notifiers']
    /*
      #swagger..parameters['Notifier'] = {
        in: 'body',
        description: 'count Notifiers by owner_group_id',
        schema: { $ref: '#/definitions/Notifier' }
      }
    */
    return dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id})
})
        }
        