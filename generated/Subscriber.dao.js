const sql=require('./Subscriber.sql.json')
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
  getBYsubscriber_id,
  countBYsubscriber_id,
  getBYowner_group_id,
  countBYowner_group_id
}
        /* create automatically the table for SUBSCRIBERs if not exists */
        try{
console.log('creating table SUBSCRIBER : start');
const createResult = create();
console.log('creating table SUBSCRIBER : created',createResult);
        }catch(err){
console.log('creating table SUBSCRIBER : ERROR',err.message);
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
}


function insert(object){
  let result=[];
  try{
    if(typeof(statements.insertStatement) === "undefined"){
      statements.insertStatement= db.prepare(sql.insertStatement);
    }
    result = statements.insertStatement.run(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



function updateSingle(object){
  let result=[];
  try{
    if(typeof(statements.updateSingleStatement) === "undefined"){
      statements.updateSingleStatement= db.prepare(sql.updateSingleStatement);
    }
    result = statements.updateSingleStatement.run(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



function deleteSingle(object){
  let result=[];
  try{
    if(typeof(statements.deleteSingleStatement) === "undefined"){
      statements.deleteSingleStatement= db.prepare(sql.deleteSingleStatement);
    }
    result = statements.deleteSingleStatement.run(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



function getSingle(object){
  let result=[];
  try{
    if(typeof(statements.getSingleStatement) === "undefined"){
      statements.getSingleStatement= db.prepare(sql.getSingleStatement);
    }
    result = statements.getSingleStatement.get(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



function getAll(object){
  let result=[];
  try{
    result = getAllStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



function countAll(object){
  let result=[];
  try{
    if(typeof(statements.countAllStatement) === "undefined"){
      statements.countAllStatement= db.prepare(sql.countAllStatement);
    }
    result = statements.countAllStatement.get(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



function getBYsubscriber_id(object){
  let result=[];
  try{
    if(typeof(statements.getBYsubscriber_id) === "undefined"){
      statements.getBYsubscriber_id = db.prepare(sql.getBYsubscriber_id);
    }
    result = statements.getBYsubscriber_idStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}


function countBYsubscriber_id(object){
  let result=[];
  try{
    if(typeof(statements.countBYsubscriber_id) === "undefined"){
      statements.countBYsubscriber_id = db.prepare(sql.countBYsubscriber_id);
    }
    result = statements.countBYsubscriber_id.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}


function getBYowner_group_id(object){
  let result=[];
  try{
    if(typeof(statements.getBYowner_group_id) === "undefined"){
      statements.getBYowner_group_id = db.prepare(sql.getBYowner_group_id);
    }
    result = statements.getBYowner_group_idStatement.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}


function countBYowner_group_id(object){
  let result=[];
  try{
    if(typeof(statements.countBYowner_group_id) === "undefined"){
      statements.countBYowner_group_id = db.prepare(sql.countBYowner_group_id);
    }
    result = statements.countBYowner_group_id.all(object)
  }catch(error){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}