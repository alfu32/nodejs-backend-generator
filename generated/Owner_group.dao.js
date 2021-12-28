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

function clear(){
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

function create(){
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


const insertStatement = db.prepare(sql.insert);
function insert(object){
  let result=[];
  try{
    result = insertStatement.run(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



const updateSingleStatement = db.prepare(sql.updateSingle);
function updateSingle(object){
  let result=[];
  try{
    result = updateSingleStatement.run(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



const deleteSingleStatement = db.prepare(sql.deleteSingle);
function deleteSingle(object){
  let result=[];
  try{
    result = deleteSingleStatement.run(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



const getSingleStatement = db.prepare(sql.getSingle);
function getSingle(object){
  let result=[];
  try{
    result = getSingleStatement.get(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



const getAllStatement = db.prepare(sql.getAll);
function getAll(object){
  let result=[];
  try{
    result = getAllStatement.all(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}



const countAllStatement = db.prepare(sql.countAll);
function countAll(object){
  let result=[];
  try{
    result = countAllStatement.get(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}
