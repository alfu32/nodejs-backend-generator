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
          drop:`function drop(db,sql){
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
          clear:`function clear(db,sql){
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
          create:`function create(db,sql){
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
          insert:`function insert(db,sql){
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
          updateSingle:`function updateSingle(db,sql){
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
          deleteSingle:`function deleteSingle(db,sql){
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
          getSingle:`function getSingle(db,sql){
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
          getAll:`function getAll(db,sql){
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
          countAll:`function countAll(db,sql){
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
        }
      }
      fks.forEach(
        fk => {
          daoMetadata.sql.operations[`selectBY${fk}`]=`SELECT * FROM ${table} 
          WHERE ${fk}=@${fk}`;
          daoMetadata.sql.operations[`countBY${fk}`]=`SELECT COUNT(*) as records FROM ${table} 
          WHERE ${fk}=@${fk}`;
          daoMetadata.methods[`getBY${fk}`]=`function getBY(db,sql){
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
          daoMetadata.methods[`countBY${fk}`]=`function getBY(db,sql){
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
        }
      );
      fs.writeFileSync(`${n}.sql.json`,JSON.stringify(daoMetadata.sql.operations,null,' '));
      fs.writeFileSync(`${n}.dao.js`,(daoMetadata.methods.join('/n/n')))
      console.log(daoMetadata);
      return daoMetadata;
    }
}


console.log(meta);



