const sql=require('../sql/Observable.sql.json')
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
  countAll,
  getBYwatcher_id,
  countBYwatcher_id
}
        /* create automatically the table for OBSERVABLEs if not exists */
        try{
console.log('creating table OBSERVABLE : start');
const createResult = create();
console.log('creating table OBSERVABLE : created',createResult);
        }catch(err){
console.log('creating table OBSERVABLE : ERROR',err.message);
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



function countAll(object){
  let result=[];
  try{
    if(typeof(statements.countAllStatement) === "undefined"){
      statements.countAllStatement= db.prepare(sql.countAll);
    }
    console.log('sql.countAll',sql.countAll,object)
    result = statements.countAllStatement.get({})
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}



function getBYwatcher_id(object){
  let result=[];
  try{
    if(typeof(statements.getBYwatcher_idStatement) === "undefined"){
      statements.getBYwatcher_idStatement = db.prepare(sql.getBYwatcher_id);
    }
    console.log('sql.getBYwatcher_id',sql.getBYwatcher_id,object);
    result = statements.getBYwatcher_idStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}


function countBYwatcher_id(object){
  let result=[];
  try{
    if(typeof(statements.countBYwatcher_idStatement) === "undefined"){
      statements.countBYwatcher_idStatement = db.prepare(sql.countBYwatcher_id);
    }
    console.log('sql.countBYwatcher_id',sql.countBYwatcher_id,object);
    result = statements.countBYwatcher_idStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
  return result;
}