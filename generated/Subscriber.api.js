const dao=require('./Subscriber.dao.js')
        module.exports={
register
        }
        function register(app){
app.post('Subscriber/insert',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Add a Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.insert(req.body);
  });

  app.post('Subscriber/updateSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Update a Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.updateSingle(req.body);
  });

  app.delete('Subscriber/deleteSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'Delete Subscriber',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.deleteSingle({watcher_id:req.body.watcher_id});
  });

  app.get('Subscriber/getSingle',function(req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger.parameters['Subscriber'] = {
        in: 'body',
        description: 'get details of Subscriber by id',
        type:'object',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.getSingle({watcher_id:req.body.watcher_id});
  });

  app.get('Subscriber/getAll',function(req,res){
    // #swagger.tags = ['Subscribers']
    // #swagger.description = 'get all Subscribers'
    return dao.getAll()
  });

  app.get('Subscriber/countAll',function(req,res){
    // #swagger.tags = ['Subscribers']
    // #swagger.description = 'count all Subscribers'
    return dao.countAll()
  });

  app.get('Subscriber/getBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get list of Subscriber by subscriber_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.getBYsubscriber_id({subscriber_id:req.body.subscriber_id});
  }
);

  app.get('Subscriber/countBy_subscriber_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'count Subscribers by subscriber_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.countBYsubscriber_id({subscriber_id:req.body.subscriber_id});
});

  app.get('Subscriber/getBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'get list of Subscriber by owner_group_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.getBYowner_group_id({owner_group_id:req.body.owner_group_id});
  }
);

  app.get('Subscriber/countBy_owner_group_id',function (req,res){
    // #swagger.tags = ['Subscribers']
    /*
      #swagger..parameters['Subscriber'] = {
        in: 'body',
        description: 'count Subscribers by owner_group_id',
        schema: { $ref: '#/definitions/Subscriber' }
      }
    */
    return dao.countBYowner_group_id({owner_group_id:req.body.owner_group_id});
});
        }
        