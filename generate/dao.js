const {model}=require('./model.json.js');

const meta=Object.keys(model)
.map(
  n => {
    const def=model[n];
    const table=n.toUppercase();
    const columns=def.
    const daoMetadata={
      moduleName:`${n}Dao`,
      sql:{
        drop:`DROP TABLE IF NOT EXISTS ${table}`
      }
    }
  }
)
console.log(meta)