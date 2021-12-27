const {model}=require('./model.json.js');
const uuid0=`hex( randomblob(4)) || '-' || hex( randomblob(2))
             || '-' || '4' || substr( hex( randomblob(2)), 2) || '-'
             || substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
             substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)) )`;
const uuid=`hex( randomblob(16))`;
const fs=require('fs');

let definedTables=Object.keys(model)
let undefinedTables={}
let definedTablesIndex=definedTables.map(n => n.toUpperCase())
  .reduce((ac,v,i,a)=>{
    ac[v]=v;
    return ac;
  },{});
function createDefaultTableDefinition(tableName){
  let lowName=tableName.toLowerCase();
  let capName=lowName[0].toUpperCase()+lowName.substr(1);
  let upName=lowName.toUpperCase();
  const cfg = {}
  const def = {}
  def[lowName+"_id"]=""
  def["name"]=lowName+" name"
  cfg[capName]=def;
  return cfg;
}

let meta= definedTables.map(modelMapper(model));
meta=[...meta,...Object.keys(undefinedTables).map(modelMapper(undefinedTables))]
function modelMapper(model){
  return function modelMapper(n){
      const def=model[n];
      const table=n.toUpperCase();
      const columns=Object.keys(def);
      const pk=columns[0];
      const fks=columns.filter(k=>k.match(/_id$/gi) && k!==pk);
      const cols=columns.filter(k => fks.indexOf(k)==-1 && k!==pk)

      const daoMetadata={
        moduleName:`${n}Dao`,
        sql:{
          metadata:{
            pk,
            fks,
            fk:fks.join(','),
            cols:cols.join(','),
          },
          operations:{
            drop:`DROP TABLE IF NOT EXISTS ${table}`,
            drop:`TRUNCATE TABLE IF EXISTS ${table}`,
            create:`CREATE TABLE IF NOT EXIST ${table}(
              ${pk} VARCHAR PRIMARY KEY DEFAULT (${uuid}),
              ${
                fks.concat(cols).map(
                  k => `${k} VARCHAR`
                ).join(',\n')
              },
              ${fks.map(
                fk => {
                  const ftable = fk.replace(/_id$/gi,'')
                    .toUpperCase();
                  if(! definedTablesIndex[ftable] ){
                    undefinedTables={...undefinedTables,...createDefaultTableDefinition(ftable)}
                  }
                  return `FOREIGN KEY(${fk}) REFERENCES ${ftable}(${fk}) `
                }
              ).join(',\n')}
            )`,
            insert:`INSERT INTO ${table}(
            ${fks.concat(cols).join(',')}
            ) VALUES ${fks.concat(cols).map(n=>`@${n}`).join(',')}`,
            updateSingle:`UPDATE ${table} SET
            ${fks.concat(cols).map(k=>`${k}=@${k}`).join(',\n')}
            WHERE ${pk}=@${pk}`,
            deleteSingle:`DELETE FROM ${table} 
            WHERE ${pk}=@${pk}`,
            getSingle:`SELECT * FROM ${table} 
            WHERE ${pk}=@${pk}`,
            getAll:`SELECT * FROM ${table}`,
            countAll:`SELECT COUNT(*) as records FROM ${table}`,
          }
        },
        methods:{
          drop:`function drop(){
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
          }`,
          clear:`function clear(){
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
          }`,
          create:`function create(){
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
          }`,
          insert:`function insert(){
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
          }`,
          updateSingle:`function updateSingle(){
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
          }`,
          deleteSingle:`function deleteSingle(){
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
          }`,
          getSingle:`function getSingle(){
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
          }`,
          getAll:`function getAll(){
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
          }`,
          countAll:`function countAll(){
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
          }`,
        },
        api:{
          insert:{
            method:"POST",
            path:`${n}/insert`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger..parameters['${n}'] = {
                  in: 'body',
                  description: 'Add a ${n}',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              return dao.insert()(req.body)
            }`,
          },
          updateSingle:{
            method:"POST",
            path:`${n}/updateSingle`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger..parameters['${n}'] = {
                  in: 'body',
                  description: 'Update a ${n}',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              return dao.updateSingle()(req.body)
            }`,
          },
          deleteSingle:{
            method:"DELETE",
            path:`${n}/deleteSingle`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger..parameters['${n}'] = {
                  in: 'body',
                  description: 'Delete ${n}',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              return dao.deleteSingle()({${pk}:req.body.$})
            }`,
          },
          getSingle:{
            method:"GET",
            path:`${n}/getSingle`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger..parameters['${n}'] = {
                  in: 'body',
                  description: 'get details of ${n} by id',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              return dao.getSingle()({})
            }`,
          },
          getAll:{
            method:"GET",
            path:`${n}/getAll`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              // #swagger.description = 'get all ${n}s'
              return dao.getAll()({})
            }`,
          },
          countAll:{
            method:"GET",
            path:`${n}/countAll`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              // #swagger.description = 'count all ${n}s'
              return dao.countAll()({})
            }`,
          },
        }
      }
      fks.forEach(
        fk => {
          daoMetadata.sql.operations[`selectBY${fk}`]=`SELECT * FROM ${table} 
          WHERE ${fk}=@${fk}`;
          daoMetadata.sql.operations[`countBY${fk}`]=`SELECT COUNT(*) as records FROM ${table} 
          WHERE ${fk}=@${fk}`;
          daoMetadata.methods[`getBY${fk}`]=`function getBY${fk}(){
            const prst = db.prepare(sql.getBY${fk});
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
          }`
          daoMetadata.methods[`countBY${fk}`]=`function countBY${fk}(){
            const prst = db.prepare(sql.countBY${fk});
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
          }`
          daoMetadata.api[`getBY${fk}`]={
            method:'',
            path:`${n}/getBy_${fk}`,
            handler:`function (req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger..parameters['${n}'] = {
                  in: 'body',
                  description: 'get list of ${n} by ${fk}',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              return dao.getSingle()({})
            }
          }`}
          daoMetadata.api[`countBY${fk}`]={
            method:'',
            path:`${n}/countBy_${fk}`,
            handler:`function (req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger..parameters['${n}'] = {
                  in: 'body',
                  description: 'count ${n}s by ${fk}',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              return dao.getSingle()({})
          }`}
        }
      );
      fs.writeFileSync(`generated/${n}.sql.json`,JSON.stringify(daoMetadata.sql.operations,null,' '));
      fs.writeFileSync(`generated/${n}.dao.js`,
        (`const sql=require('./${n}.sql.json')
        const Database = require('better-sqlite3');
        const db = new Database('${n}.db', { verbose: console.log }); 
        module.exports={
          ${Object.keys(daoMetadata.methods).join(',\n    ')}
        }
        ` + 
        (Object.values(daoMetadata.methods).join("\n\n"))
        ).replace(/\n( ){10,10}/gi,'\n')
      )
      console.log(daoMetadata);
      return daoMetadata;
    }
}


console.log(meta);



