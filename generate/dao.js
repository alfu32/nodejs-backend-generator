const {model}=require('./model.json.js');

const meta=Object.keys(model)
.map(
  n => {
    const def=model[n];
    const table=n.toUppercase();
    const columns=Object.keys(def);
    const pk=columns[0];
    const fks=columns.filter(k=>k.match(/_id$/gi))
    const daoMetadata={
      moduleName:`${n}Dao`,
      sql:{
        pk,
        fks,
        drop:`DROP TABLE IF NOT EXISTS ${table}`,
        create:`CREATE TABLE I NOT EXIST ${table}`,
        insert:`INSERT INTO ${table}(
        ${columns.join(',')}
        ) VALUES ${columns.map(n=>`@${n}`).join(',')}`,
      }
    }
  }
)
console.log(meta)