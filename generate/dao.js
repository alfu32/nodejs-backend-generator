const {model}=require('./model.json.js');
const uuid=`hex( randomblob(4)) || '-' || hex( randomblob(2))
             || '-' || '4' || substr( hex( randomblob(2)), 2) || '-'
             || substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
             substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)) )`
const meta=Object.keys(model)
.map(
  n => {
    const def=model[n];
    const table=n.toUpperCase();
    const columns=Object.keys(def);
    const pk=columns[0];
    const fks=columns.filter(k=>k.match(/_id$/gi) && k!==pk);
    const cols=columns.filter(k => fks.indexOf(k)==-1 && k!==pk)
    
    const daoMetadata={
      moduleName:`${n}Dao`,
      sql:{
        pk,
        fks,
        fk:fks.join(','),
        drop:`DROP TABLE IF NOT EXISTS ${table}`,
        create:`CREATE TABLE IF NOT EXIST ${table}(
          ${pk} VARCHAR PRIMARY KEY DEFAULT (${uuid}),
          ${fks.map(
            fk => `${fk} VARCHAR `
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
    }
    fks.forEach(
      fk => {
        daoMetadata.sql[`selectBY${fk}`]=`SELECT * FROM ${table} 
        WHERE ${fk}=@${fk}`;
        daoMetadata.sql[`countBY${fk}`]=`SELECT COUNT(*) as records FROM ${table} 
        WHERE ${fk}=@${fk}`
      }
    );
    
    return daoMetadata;
  }
)
console.log(meta);