const model={
    Watcher:{
      watcher_id:"",
      owner_group_id:"",
      source:`module.exports≈{
        main({modules,data}){
          // returns a list of watch results
          // the list is persisted as a watch
          // each watch must have a unique watch_id
          // and a payload json object
          return [{watch_id:444,payload:444}]
        },
      }`,
      poll_config:`{
        type:"DailyDistributionFourier",
        coefficients:[1,-3,5,-7,9,-11,13],
      }`,
    },
    Subscriber:{
      watcher_id:"",
      subscriber_id:"",
      owner_group_id:"",
      source:`module.exports≈{
        main({modules,data}){
          return [{val:444}]
        },
      }`,
    },
    Notifier:{
      notifier_id:"",
      subscriber_id:"",
      owner_group_id:"",
      source:`module.exports≈{
        main({modules,data}){
          return [{val:444}]
        },
      }`,
    },
    Modules:{
      module_id:"",
      owner_group_id:"",
      module_type:'npm',
      source:`module.exports≈{
        main({modules,data}){
          return [{val:444}]
        },
      }`,
    }
  }
module.exports={
  model
}