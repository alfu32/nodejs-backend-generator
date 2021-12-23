const {model}=require('./model.json.js');

const meta=Object.keys(model)
.map(
  n => {
    const def=model[n];
    const table=n.toUpperCase();
    const columns=Object.keys(def);
    const pk=columns[0];
    const fks=columns.filter(k=>k.match(/_id$/gi));
    const cols=columns.filter(k => fks.indexOf(k)==-1 && k!==pk)
    const daoMetadata={
      moduleName:`${n}Dao`,
      sql:{
        pk,
        fks,
        fk:fks.join(','),
        drop:`DROP TABLE IF NOT EXISTS ${table}`,
        create:`CREATE TABLE IF NOT EXIST ${table}`,
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
      }
    }
    return daoMetadata;
  }
)
console.log(meta);