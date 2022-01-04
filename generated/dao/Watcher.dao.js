const sql=require('../sql/Watcher.sql.json')
const Database = require('better-sqlite3');
const db = new Database('generated.db', { verbose: console.log }); 
module.exports={
  drop,
  clear,
  create,
  insert,
  updateSingle,
  deleteSingle,
  getSingle,
  getAll,
  getLast,
  getByRowid,
  countAll,
  getBYowner_group_id,
  countBYowner_group_id
}
        /* create automatically the table for WATCHERs if not exists */
        try{
console.log('creating table WATCHER : start');
const createResult = create();
console.log('creating table WATCHER : created',createResult);
        }catch(err){
console.log('creating table WATCHER : ERROR',err.message);
throw err;
        }
        let statements={}
        function drop(){
  let result=[];
  try{
    result = db.exec(sql.drop)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}

function clear(){
  let result=[];
  try{
    result = db.exec(sql.clear)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}

function create(){
  let result=[];
  try{
    result = db.exec(sql.create)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}


function insert(object){
  let result=[];
  try{
    if(typeof(statements.insertStatement) === "undefined"){
      statements.insertStatement= db.prepare(sql.insert);
    }
    console.log('sql.insert',sql.insert,object)
    result = statements.insertStatement.run(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function updateSingle(object){
  let result=[];
  try{
    if(typeof(statements.updateSingleStatement) === "undefined"){
      statements.updateSingleStatement= db.prepare(sql.updateSingle);
    }
    console.log('sql.updateSingle',sql.updateSingle,object)
    result = statements.updateSingleStatement.run(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function deleteSingle(object){
  let result=[];
  try{
    if(typeof(statements.deleteSingleStatement) === "undefined"){
      statements.deleteSingleStatement= db.prepare(sql.deleteSingle);
    }
    console.log('sql.deleteSingle',sql.deleteSingle,object)
    result = statements.deleteSingleStatement.run(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function getSingle(object){
  let result=[];
  try{
    if(typeof(statements.getSingleStatement) === "undefined"){
      statements.getSingleStatement= db.prepare(sql.getSingle);
    }
    console.log('sql.getSingle',sql.getSingle,object)
    result = statements.getSingleStatement.get(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function getAll(object){
  let result=[];
  try{
    if(typeof(statements.getAllStatement) === "undefined"){
      statements.getAllStatement= db.prepare(sql.getAll);
    }
    console.log('sql.getAll',sql.getAll,object)
    result = statements.getAllStatement.all({})
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function getLast(object){
  let result=[];
  try{
    if(typeof(statements.getLastStatement) === "undefined"){
      statements.getLastStatement= db.prepare(sql.getLast);
    }
    console.log('sql.getLast',sql.getLast,object)
    result = statements.getLastStatement.all({})
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function getByRowid(rowid){
  let result=[];
  try{
    if(typeof(statements.getByRowidStatement) === "undefined"){
      statements.getByRowidStatement= db.prepare(sql.getByRowid);
    }
    console.log('sql.getByRowid',sql.getByRowid,rowid)
    result = statements.getByRowidStatement.get({rowid})
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function countAll(){
  let result=[];
  try{
    if(typeof(statements.countAllStatement) === "undefined"){
      statements.countAllStatement= db.prepare(sql.countAll);
    }
    console.log('sql.countAll',sql.countAll)
    result = statements.countAllStatement.get({})
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function getBYowner_group_id(object){
  let result=[];
  try{
    if(typeof(statements.getBYowner_group_idStatement) === "undefined"){
      statements.getBYowner_group_idStatement = db.prepare(sql.getBYowner_group_id);
    }
    console.log('sql.getBYowner_group_id',sql.getBYowner_group_id,object);
    result = statements.getBYowner_group_idStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}


function countBYowner_group_id(object){
  let result=[];
  try{
    if(typeof(statements.countBYowner_group_idStatement) === "undefined"){
      statements.countBYowner_group_idStatement = db.prepare(sql.countBYowner_group_id);
    }
    console.log('sql.countBYowner_group_id',sql.countBYowner_group_id,object);
    result = statements.countBYowner_group_idStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}