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
function createDefaultTableDefinition(fk){
  const tableName = fk.replace(/_id$/gi,'')
    .toUpperCase();
  if(! definedTablesIndex[tableName] ){
    let lowName=tableName.toLowerCase();
    let capName=lowName[0].toUpperCase()+lowName.substr(1);
    let upName=lowName.toUpperCase();
    undefinedTables[capName]={}
    undefinedTables[capName][lowName+"_id"]=""
    undefinedTables[capName]["name"]=lowName+" name"
  }
}

let meta= definedTables.map(modelMapper(model));
meta=[...meta,...Object.keys(undefinedTables).map(modelMapper(undefinedTables))]
function modelMapper(model){
  return function modelMapper(n){
      const def=model[n];
      const table=n.toUpperCase();
      const columns=Object.keys(def);
      const pk=columns[0];
      const fks=columns.slice(1).filter(k=>k.match(/_id$/gi));
      const cols=columns.slice(1).filter(k => fks.indexOf(k)==-1)

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
            create:`CREATE TABLE IF NOT EXISTS ${table}(
              ${pk} VARCHAR PRIMARY KEY DEFAULT (${uuid}),
              ${
                fks.concat(cols).map(
                  k => `/*fk+cols*/ ${k} VARCHAR`
                ).join(',\n')
              }
              ${fks.length?','}
              ${fks.map(
                fk => {
                  const tableName = fk.replace(/_id$/gi,'')
                    .toUpperCase();
                  createDefaultTableDefinition(fk);
                  return `FOREIGN KEY(${fk}) REFERENCES ${tableName}(${fk}) `
                }
              ).join(',\n')}
            )`,
            insert:`INSERT INTO ${table}(
            ${fks.concat(cols).join(',')}
            ) VALUES (${fks.concat(cols).map(n=>`@${n}`).join(',')})`,
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
        statements:{
          insert:`const insertStatement = db.prepare(sql.insert);`,
          updateSingle:`const updateSingleStatement = db.prepare(sql.updateSingle);`,
          deleteSingle:`const deleteSingleStatement = db.prepare(sql.deleteSingle);`,
          getSingle:`const getSingleStatement = db.prepare(sql.getSingle);`,
          getAll:`const getAllStatement = db.prepare(sql.getAll);`,
          countAll:`const countAllStatement = db.prepare(sql.countAll);`,
        },
        methods:{
          drop:`function drop(){
            let result=[];
            try{
              result = db.exec(sql.drop)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
          }`,
          clear:`function clear(){
            let result=[];
            try{
              result = db.exec(sql.clear)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
          }`,
          create:`function create(){
            let result=[];
            try{
              result = db.exec(sql.create)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
          }`,
          insert:`
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
          `,
          updateSingle:`
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
          `,
          deleteSingle:`
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
          `,
          getSingle:`
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
          `,
          getAll:`
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
          `,
          countAll:`
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
          `,
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
              return dao.insert(req.body);
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
              return dao.updateSingle(req.body);
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
              return dao.deleteSingle({${pk}:req.body.${pk}});
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
              return dao.getSingle({${pk}:req.body.${pk}});
            }`,
          },
          getAll:{
            method:"GET",
            path:`${n}/getAll`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              // #swagger.description = 'get all ${n}s'
              return dao.getAll()
            }`,
          },
          countAll:{
            method:"GET",
            path:`${n}/countAll`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              // #swagger.description = 'count all ${n}s'
              return dao.countAll()
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
          daoMetadata.statements[`countBY${fk}`] = `const countBY${fk}Statement = db.prepare(sql.countBY${fk});`;
          daoMetadata.methods[`getBY${fk}`]=`
          function getBY${fk}(object){
            let result=[];
            try{
              if(typeof(statements.getBY${fk}) === "undefined"){
                statements.getBY${fk} = db.prepare(sql.getBY${fk});
              }
              result = statements.getBY${fk}Statement.all(object)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
          }`
          daoMetadata.methods[`countBY${fk}`]=`
          function countBY${fk}(object){
            let result=[];
            try{
              if(typeof(statements.countBY${fk}) === "undefined"){
                statements.countBY${fk} = db.prepare(sql.countBY${fk});
              }
              result = statements.countBY${fk}.all(object)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
          }`
          daoMetadata.api[`getBY${fk}`]={
            method:'GET',
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
              return dao.getBY${fk}({${fk}:req.body.${fk}});
            }
          `}
          daoMetadata.api[`countBY${fk}`]={
            method:'GET',
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
              return dao.countBY${fk}({${fk}:req.body.${fk}});
          }`}
        }
      );
      fs.writeFileSync(`generated/${n}.sql.json`,JSON.stringify(daoMetadata.sql.operations,null,' '));
      fs.writeFileSync(`generated/${n}.dao.js`,
        (`const sql=require('./${n}.sql.json')
          const Database = require('better-sqlite3');
          const db = new Database('generated.db', { verbose: console.log }); 
          module.exports={
            ${Object.keys(daoMetadata.methods).join(',\n            ')}
          }
        /* create automatically the table for ${table}s if not exists */
        try{
          console.log('creating table ${table} : start');
          const createResult = create();
          console.log('creating table ${table} : created',createResult);
        }catch(err){
          console.log('creating table ${table} : ERROR',err.message);
          throw err;
        }
        let statements={}
        ` + 
        (Object.values(daoMetadata.methods).join("\n\n"))
        ).replace(/\n( ){10,10}/gi,'\n')
      );
      fs.writeFileSync(`generated/${n}.api.js`,
        (`const dao=require('./${n}.dao.js')
        module.exports={
          register
        }
        function register(app){
          ${
            Object.keys(daoMetadata.api)
             .map( apiName => {
              const def = daoMetadata.api[apiName]
               return `app.${def.method.toLowerCase()}('${def.path}',${def.handler});`
             }).join("\n\n            ")
          }
        }
        `
        ).replace(/\n( ){10,10}/gi,'\n')
      );
      console.log(daoMetadata);
      return daoMetadata;
    }
}


console.log(meta);



