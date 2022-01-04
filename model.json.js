const model={
    Watcher:{
      watcher_id:"autogenerated as uuid(32) by sql engine",
      name:"",
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
      poll_config:`function returnNextRunDate(){
        return new Date().getTime() + 60000;
      }`,
    },
    Observable:{
      observable_id:"",
      watcher_id:"",
      key:"",
      prev_date:"YYYY-MM-DD hh:mm:ss.SSSZZ",
      prev_value:"{}",
      prev_value_hash:"",
      crt_date:"YYYY-MM-DD hh:mm:ss.SSSZZ",
      crt_value:"{}",
      crt_value_hash:"",
    },
    Subscriber:{
      watcher_id:"autogenerated as uuid(32) by sql engine",
      subscriber_id:"",
      owner_group_id:"",
      source:`module.exports≈{
        main({modules,data}){
          return [{val:444}]
        },
      }`,
    },
    Notifier:{
      notifier_id:"autogenerated as uuid(32) by sql engine",
      subscriber_id:"",
      owner_group_id:"",
      source:`module.exports≈{
        main({modules,data}){
          return [{val:444}]
        },
      }`,
    },
    Module:{
      module_id:"autogenerated as uuid(32) by sql engine",
      owner_group_id:"",
      injection_ref_name:"moment",
      npm_module:'moment',
      source:`module.exports≈{
        /* this function signature*/
        main:({modules,metadata})=>{
          return [{val:444}]
        },
      }`,
    },
    Owner_group:{
      owner_group_id:"autogenerated as uuid(32) by sql engine",
      name:'ADMIN'
    }
  }
module.exports=model
