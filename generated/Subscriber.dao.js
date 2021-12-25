const sql=require('./Subscriber.sql.json')
        module.exports={
drop,
clear,
create,
insert,
updateSingle,
deleteSingle,
getSingle,
getAll,
countAll,
getBYsubscriber_id,
countBYsubscriber_id,
getBYowner_group_id,
countBYowner_group_id
        }function drop(db,sql){
  return () => {
    let result=[];
    try{
      result = db.exec(sql.drop)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function clear(db,sql){
  return () => {
    let result=[];
    try{
      result = db.exec(sql.clear)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function create(db,sql){
  return () => {
    let result=[];
    try{
      result = db.exec(sql.create)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function insert(db,sql){
  const prst = db.prepare(sql.insert);
  return (object) => {
    let result=[];
    try{
      result = prst.run(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function updateSingle(db,sql){
  const prst = db.prepare(sql.updateSingle);
  return (object) => {
    let result=[];
    try{
      result = prst.run(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function deleteSingle(db,sql){
  const prst = db.prepare(sql.deleteSingle);
  return (object) => {
    let result=[];
    try{
      result = prst.run(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function getSingle(db,sql){
  const prst = db.prepare(sql.getSingle);
  return (object) => {
    let result=[];
    try{
      result = prst.get(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function getAll(db,sql){
  const prst = db.prepare(sql.getAll);
  return (object) => {
    let result=[];
    try{
      result = prst.all(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function countAll(db,sql){
  const prst = db.prepare(sql.countAll);
  return (object) => {
    let result=[];
    try{
      result = prst.get(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function getBYsubscriber_id(db,sql){
  const prst = db.prepare(sql.getBYsubscriber_id);
  return (object) => {
    let result=[];
    try{
      result = prst.all(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function countBYsubscriber_id(db,sql){
  const prst = db.prepare(sql.countBYsubscriber_id);
  return (object) => {
    let result=[];
    try{
      result = prst.all(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function getBYowner_group_id(db,sql){
  const prst = db.prepare(sql.getBYowner_group_id);
  return (object) => {
    let result=[];
    try{
      result = prst.all(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}

function countBYowner_group_id(db,sql){
  const prst = db.prepare(sql.countBYowner_group_id);
  return (object) => {
    let result=[];
    try{
      result = prst.all(object)
    }catch(err){
      // better-sqlite3 documentation indicates that the error
      // should be trown in case this is invoked in a transaction
      //  so that the engine should properly handle the rollback 
      throw error;
    }
  }
}