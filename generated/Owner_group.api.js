const dao=require('./Owner_group.dao.json')
        module.exports={
register
        }
        function register(app){
app.POST('Owner_group/insert',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger..parameters['Owner_group'] = {
        in: 'body',
        description: 'Add a Owner_group',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    return dao.insert(req.body)
  })

  app.POST('Owner_group/updateSingle',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger..parameters['Owner_group'] = {
        in: 'body',
        description: 'Update a Owner_group',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    return dao.updateSingle(req.body)
  })

  app.DELETE('Owner_group/deleteSingle',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger..parameters['Owner_group'] = {
        in: 'body',
        description: 'Delete Owner_group',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    return dao.deleteSingle({owner_group_id:req.body.owner_group_id})
  })

  app.GET('Owner_group/getSingle',function(req,res){
    // #swagger.tags = ['Owner_groups']
    /*
      #swagger..parameters['Owner_group'] = {
        in: 'body',
        description: 'get details of Owner_group by id',
        schema: { $ref: '#/definitions/Owner_group' }
      }
    */
    return dao.getSingle({owner_group_id:req.body.owner_group_id)
  })

  app.GET('Owner_group/getAll',function(req,res){
    // #swagger.tags = ['Owner_groups']
    // #swagger.description = 'get all Owner_groups'
    return dao.getAll()()
  })

  app.GET('Owner_group/countAll',function(req,res){
    // #swagger.tags = ['Owner_groups']
    // #swagger.description = 'count all Owner_groups'
    return dao.countAll()()
  })
        }
        