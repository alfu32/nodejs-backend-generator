module.exports={
  reg:(fastify)=>{
    fastify.get('/watchers',(req,res)=>{
      // #swagger.tags = ['watchers']
      res.status(200).send({
        error:null,
        data:[],
      })
    })
  }
}