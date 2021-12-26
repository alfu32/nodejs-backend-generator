const sql=require('./Owner_group.sql.json')
        const Database = require('better-sqlite3');
        const db = new Database('Owner_group.db', { verbose: console.log }); 
        module.exports={
drop,
    clear,
    create,
    insert,
    updateSingle,
    deleteSingle,
    getSingle,
    getAll,
    countAll
        }
        function drop(){
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

function clear(){
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

function create(){
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

function insert(){
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

function updateSingle(){
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

function deleteSingle(){
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

function getSingle(){
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

function getAll(){
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

function countAll(){
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