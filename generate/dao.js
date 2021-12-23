const {model}=require('./model.json.js');

const meta=Object.keys(model)
.map(
  n => {
    const def=model[n];
    const table=n.toUpperCase();
    const columns=Object.keys(def);
    const pk=columns[0];
    const fks=columns.filter(k=>k.match(/_id$/gi))
    const daoMetadata={
      moduleName:`${n}Dao`,
      sql:{
        pk,
        fks,
        fk:fks.join(','),
        drop:`DROP TABLE IF NOT EXISTS ${table}`,
        create:`CREATE TABLE IF NOT EXIST ${table}`,
        insert:`INSERT INTO ${table}(
        ${columns.join(',')}
        ) VALUES ${columns.map(n=>`@${n}`).join(',')}`,
      }
    }
    return daoMetadata;
  }
)
console.log(meta);