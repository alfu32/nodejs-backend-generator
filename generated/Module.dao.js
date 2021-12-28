const sql=require('./Module.sql.json')
const Database = require('better-sqlite3');
const db = new Database('Module.db', { verbose: console.log }); 
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
  getBYowner_group_id,
  countBYowner_group_id
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



const getBYowner_group_idStatement = db.prepare(sql.getBYowner_group_id);
function getBYowner_group_id(object){
  let result=[];
  try{
    result = getBYowner_group_idStatement.all(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}


const countBYowner_group_idStatement = db.prepare(sql.countBYowner_group_id);
function countBYowner_group_id(object){
  let result=[];
  try{
    result = countBYowner_group_idStatement.all(object)
  }catch(err){
    // better-sqlite3 documentation indicates that the error
    // should be trown in case this is invoked in a transaction
    //  so that the engine should properly handle the rollback 
    throw error;
  }
}