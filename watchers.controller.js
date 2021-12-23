module.exports={
  reg:(fastify)=>{
    fastify.get('/watchers',(req,res)=>{
      // #swagger.tags = ['watchers']
      res.send({
        error:null,
        data:[],
      })
    })
  }
}