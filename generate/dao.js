
const uuid0=`hex( randomblob(4)) || '-' || hex( randomblob(2))
             || '-' || '4' || substr( hex( randomblob(2)), 2) || '-'
             || substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
             substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)) )`;
const uuid=`hex( randomblob(16))`;
const fs=require('fs');
const path=require('path');

let definedTables={};
let undefinedTables={};
let definedTablesIndex={};

module.exports={generate:main};

function main(model){
  const memFs={};
  //console.log(process.argv);
  
  //const model1=require('./model.json.js');
  definedTables=Object.keys(model)
  undefinedTables={}
  definedTablesIndex=definedTables.map(n => n.toUpperCase())
    .reduce((ac,v,i,a)=>{
      ac[v]=v;
      return ac;
    },{});
  let meta= definedTables.map(modelMapperFactory(model,memFs));
  meta=[...meta,...Object.keys(undefinedTables).map(modelMapperFactory(undefinedTables,memFs))];
  // console.log(meta);
  console.log(process.argv);
  console.log(fs.readdirSync('./'));
  memFs['server.js']=`/**
* This is the main Node.js server script for your project
* Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
*/

const path = require("path");
const fs = require("fs");
const express = require('express');
const app = express();
const cors = require('cors')
 const corsOptions = {
    // origin: 'https://parallel-scarlet-juravenator.glitch.me',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE, OPTIONS"
 }
 app.use(cors(corsOptions));

// Parse JSON bodies for this app. Make sure you put
// \`app.use(express.json())\` **before** your route handlers!
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE
app.get('/env',(req,res,next)=>{
  
  /* 
  #swagger.tags = ['Process']
  #swagger.description = 'get environment variables'
  #swagger.responses[200] = {
          description: 'environment variables successfully obtained.',
          schema: { type:'object' }
  } */
  res.send({
    host: '${process.env.PROJECT_DOMAIN}.glitch.me',
    port:process.env.PORT,
    // env:process.env
  })
});
app.get('/swagger.json',(req,res)=>{
    /*
    #swagger.tags = ['Swagger']
    #swagger.description = 'generated swagger json'
    */
  res.send(fs.readFileSync('swagger.json'))
})
${
  Object.keys(model).concat(Object.keys(undefinedTables)).map(
    k=>`require('./api/${k}.api').register(app);`
  )
}

// Run the server and report out to the lo
app.listen(process.env.PORT, function(err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(process.env);
  console.log(\`Your app is listening on https://\${process.env.PROJECT_DOMAIN}.glitch.me \${process.env.PORT}\`);
});
`
  // fs.writeFileSync('generated/server.js',memFs['generated/server.js']);
  return memFs;
}

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

function modelMapperFactory(model,memFs){
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
            drop:`DROP TABLE IF EXISTS ${table}`,
            clear:`TRUNCATE TABLE IF EXISTS ${table}`,
            create:`CREATE TABLE IF NOT EXISTS ${table}(
              ${pk} VARCHAR PRIMARY KEY DEFAULT (${uuid}),
              ${
                fks.concat(cols).map(
                  k => `/*fk+cols*/ ${k} VARCHAR`
                ).join(',\n')
              }
              ${fks.length?',':''}
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
            getSingle:`SELECT T.rowid,T.* FROM ${table} T
            WHERE T.${pk}=@${pk}`,
            getAll:`SELECT T.rowid,T.* FROM ${table} T`,
            getLast:`SELECT T.rowid,T.* FROM ${table} T HAVING T.rowid=MAX(T.rowid)`,
            getByRowid:`SELECT T.rowid,T.* FROM ${table} T WHERE T.rowid=@rowid`,
            countAll:`SELECT MAX(rowid) as last_id,COUNT(*) as records FROM ${table}`,
          }
        },
        statements:{
          insert:`const insertStatement = db.prepare(sql.insert);`,
          updateSingle:`const updateSingleStatement = db.prepare(sql.updateSingle);`,
          deleteSingle:`const deleteSingleStatement = db.prepare(sql.deleteSingle);`,
          getSingle:`const getSingleStatement = db.prepare(sql.getSingle);`,
          getAll:`const getAllStatement = db.prepare(sql.getAll);`,
          getLast:`const getLastStatement = db.prepare(sql.getLast);`,
          getByRowid:`const getByRowidStatement = db.prepare(sql.getByRowid);`,
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
            return result;
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
            return result;
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
            return result;
          }`,
          insert:`
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
          `,
          updateSingle:`
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
          `,
          deleteSingle:`
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
          `,
          getSingle:`
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
          `,
          getAll:`
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
          `,
          getLast:`
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
          `,
          getByRowid:`
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
          `,
          countAll:`
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
          `,
        },
        api:{
          recreateTable:{
            method:"POST",
            path:`/${n}/recreateTable`,
            handler:`function(req,res){
              /*
              #swagger.tags = ['${n}s']
              #swagger.description = 'recreate table ${n}'
              */
              let result=null;
              let error=null;
              try{
                const drop = dao.drop();
                const create = dao.create();
                res.send({drop,create});
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          getAll:{
            method:"GET",
            path:`/${n}s`,
            handler:`function(req,res){
              /* 
              #swagger.tags = ['${n}s']
              #swagger.description = 'get all ${n}s'
              #swagger.responses[200] = {
                      description: '${n} list successfully obtained.',
                      schema: { type:'array',item:{$ref: '#/definitions/${n}'} }
              } */
              let result=null;
              let error=null;
              try{
                res.send(/*JSON.stringify*/(dao.getAll()));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          insert:{
            method:"POST",
            path:`/${n}`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger.parameters['${n}'] = {
                  in: 'body',
                  description: 'Add a ${n}',
                  type:'object',
                  schema: { $ref: '#/definitions/${n}' }
                }
                #swagger.responses[200] = {
                        description: '${n} list successfully obtained.',
                        schema: {$ref: '#/definitions/${n}'}
                }
              */
              let result=null;
              let error=null;
              try{
                console.log('${n}.insert',req.body);
                const insertResult = dao.insert(req.body);
                console.log('insertResult',insertResult)
                const lastInserted=dao.getByRowid(insertResult.lastInsertRowid)
                res.send(/*JSON.stringify*/(lastInserted));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          updateSingle:{
            method:"PUT",
            path:`/${n}`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
                #swagger.parameters['${n}'] = {
                  in: 'body',
                  description: 'Update a ${n}',
                  type:'object',
                  schema: { $ref: '#/definitions/${n}' }
                }
              */
              let result=null;
              let error=null;
              try{
                console.log('${n}.updateSingle',req.body);
                res.send(/*JSON.stringify*/(dao.updateSingle(req.body)));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          deleteSingle:{
            method:"DELETE",
            path:`/${n}/:${pk}`,
            handler:`function(req,res){
              // #swagger.tags = ['${n}s']
              /*
              */
              let result=null;
              let error=null;
              try{
                console.log('${n}.updateSingle',req.body);
                res.send(/*JSON.stringify*/(dao.deleteSingle({${pk}:req.params.${pk}})));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          getById:{
            method:"GET",
            path:`/${n}/:${pk}`,
            handler:`function(req,res){
              /* 
              #swagger.tags = ['${n}s']
              #swagger.description = 'get details of ${n} by ${pk}'
              #swagger.responses[200] = {
                      description: '${n} successfully obtained.',
                      schema: { $ref: '#/definitions/${n}' }
              } */
              let result=null;
              let error=null;
              try{
                res.send(dao.getSingle({${pk}:req.params.${pk}}));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          getLast:{
            method:"GET",
            path:`/${n}s`,
            handler:`function(req,res){
              /* 
              #swagger.tags = ['${n}s']
              #swagger.description = 'get all ${n}s'
              #swagger.responses[200] = {
                      description: '${n} list successfully obtained.',
                      schema: { type:'array',item:{$ref: '#/definitions/${n}'} }
              } */
              let result=null;
              let error=null;
              try{
                res.send(/*JSON.stringify*/(dao.getLast()));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          getByRowid:{
            method:"GET",
            path:`/${n}/rowid/:rowid`,
            handler:`function(req,res){
              /* 
              #swagger.tags = ['${n}s']
              #swagger.description = 'get details of ${n} by rowid'
              #swagger.responses[200] = {
                      description: '${n} successfully obtained.',
                      schema: { $ref: '#/definitions/${n}' }
              } */
              let result=null;
              let error=null;
              try{
                res.send(dao.getByRowid(req.params.rowid));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
          countAll:{
            method:"GET",
            path:`/${n}/countAll`,
            handler:`function(req,res){
              /* 
              #swagger.tags = ['${n}s']
              #swagger.description = 'count all ${n}s'
              */
              let result=null;
              let error=null;
              try{
                res.send(/*JSON.stringify*/(dao.countAll()));
                res.end();
              }catch(err){
                throw err;
              }
            }`,
          },
        }
      }
      fks.forEach(
        fk => {
          daoMetadata.sql.operations[`selectBY${fk}`]=`SELECT T.rowid,T* FROM ${table} T 
          WHERE ${fk}=@${fk}`;
          daoMetadata.sql.operations[`countBY${fk}`]=`SELECT MAX(rowid) as last_id,COUNT(*) as records FROM ${table} 
          WHERE ${fk}=@${fk}`;
          daoMetadata.statements[`selectBY${fk}`] = `const selectBY${fk}Statement = db.prepare(sql.selectBY${fk});`;
          daoMetadata.statements[`countBY${fk}`] = `const countBY${fk}Statement = db.prepare(sql.countBY${fk});`;
          daoMetadata.methods[`getBY${fk}`]=`
          function getBY${fk}(object){
            let result=[];
            try{
              if(typeof(statements.getBY${fk}Statement) === "undefined"){
                statements.getBY${fk}Statement = db.prepare(sql.getBY${fk});
              }
              console.log('sql.getBY${fk}',sql.getBY${fk},object);
              result = statements.getBY${fk}Statement.all(object)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
            return result;
          }`
          daoMetadata.methods[`countBY${fk}`]=`
          function countBY${fk}(object){
            let result=[];
            try{
              if(typeof(statements.countBY${fk}Statement) === "undefined"){
                statements.countBY${fk}Statement = db.prepare(sql.countBY${fk});
              }
              console.log('sql.countBY${fk}',sql.countBY${fk},object);
              result = statements.countBY${fk}Statement.all(object)
            }catch(error){
              // better-sqlite3 documentation indicates that the error
              // should be trown in case this is invoked in a transaction
              //  so that the engine should properly handle the rollback 
              throw error;
            }
            return result;
          }`
          daoMetadata.api[`getBY${fk}`]={
            method:'GET',
            path:`/${n}/getBy_${fk}/:${fk}`,
            handler:`function (req,res){
              /*
              #swagger.tags = ['${n}s']
              #swagger.description  = 'get all ${n}s by ${fk}'
              */
              let result=null;
              let error=null;
              try{
                res.send(dao.getBY${fk}({${fk}:req.params.${fk}}));
                res.end();
              }catch(err){
                throw err;
              }
            }
          `}
          daoMetadata.api[`countBY${fk}`]={
            method:'GET',
            path:`/${n}/countBy_${fk}/:${fk}`,
            handler:`function (req,res){
              /*
              #swagger.tags = ['${n}s']
              #swagger.description  = 'count all ${n}s by ${fk}'
              */
              let result=null;
              let error=null;
              try{
                res.send(dao.countBY${fk}({${fk}:req.params.${fk}}));
                res.end();
              }catch(err){
                throw err;
              }
          }`}
        }
      );
      if(!fs.existsSync('generated/hooks/')){
        fs.mkdirSync('generated/hooks/')
      }
      memFs['hooks/']=true
      memFs[`hooks/${n}.hook.jsx`]=`import useFetch from 'use-http';
import {useState,useEffect} from 'react';

/*api generated at 'https://${process.env.PROJECT_DOMAIN}.glitch.me'*/

export function use${n}s(host='https://${process.env.PROJECT_DOMAIN}.glitch.me') {
  const [${n.toLowerCase()}s, set${n}s] = useState([])
  const { get, post, put, del, response, loading, error } = useFetch(host)

  useEffect(() => { loadInitial${n}s() }, []) // componentDidMount
  
  async function loadInitial${n}s() {
    const initial${n}s = await get('/${n}s')
    if (response.ok) set${n}s(initial${n}s)
  }

  async function add${n}(${n.toLowerCase()}) {
    const rp = await post('/${n}', ${n.toLowerCase()})
    if (response.ok){
      console.log(rp);
      set${n}s([...${n.toLowerCase()}s, rp]);
    }
  }
  async function update${n}(${n.toLowerCase()}) {
    await put('/${n}', ${n.toLowerCase()})
    if (response.ok) {
      const new${n}s = ${n.toLowerCase()}s.filter(_${n.toLowerCase()} => {
        return _${n.toLowerCase()}.${pk} !== ${n.toLowerCase()}.${pk};
      });
      set${n}s([...new${n}s, ${n.toLowerCase()}]);
    }
  }
  async function delete${n}(${n.toLowerCase()}) {
    console.log('deleting',${n.toLowerCase()})
    await del('/${n}/'+${n.toLowerCase()}.${pk})
    
    if (response.ok) {
      console.log('deleted',${n.toLowerCase()},response);
      const new${n}s = ${n.toLowerCase()}s.filter(_${n.toLowerCase()} => {
        return _${n.toLowerCase()}.${pk} !== ${n.toLowerCase()}.${pk};
      });
      set${n}s(new${n}s);
    }
  }
  return [loading, error,${n.toLowerCase()}s,add${n},update${n},delete${n}]
}`
      fs.writeFileSync(`generated/hooks/${n}.hook.jsx`,memFs[`hooks/${n}.hook.jsx`]);
    
      memFs['sql/']=true
      if(!fs.existsSync('generated/sql/')){
        fs.mkdirSync('generated/sql/')
      }
      memFs[`sql/${n}.sql.json`]=JSON.stringify(daoMetadata.sql.operations,null,' ')
      fs.writeFileSync(`generated/sql/${n}.sql.json`,memFs[`sql/${n}.sql.json`]);
    
      memFs['dao/']=true;
      if(!fs.existsSync('generated/dao/')){
        fs.mkdirSync('generated/dao/')
      }
      memFs[`dao/${n}.dao.js`]= (`const sql=require('../sql/${n}.sql.json')
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
        ).replace(/\n( ){10,10}/gi,'\n');
      fs.writeFileSync(`generated/dao/${n}.dao.js`,memFs[`dao/${n}.dao.js`]);
      
      memFs['api/']=true;
      if(!fs.existsSync('generated/api/')){
        fs.mkdirSync('generated/api/')
      }
      memFs[`api/${n}.api.js`]=(`const dao=require('../dao/${n}.dao.js')
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
      
      fs.writeFileSync(`generated/api/${n}.api.js`,memFs[`api/${n}.api.js`]);
      console.log(daoMetadata.sql.operations);
      //console.log(daoMetadata.methods);
      //console.log(daoMetadata.api);
      return daoMetadata;
    }
}




