const {generate} = require('./generate/dao');
const {scan} = require('./generate/scanner');

const fs=require('fs');
const zl = require("zip-lib");
const model=eval(fs.readFileSync(process.argv[2]).toString());
console.log(model);
const mem = generate(model);
scan(mem,'./swagger.json',['./server.js','./generated/api/*.api.js'])

console.log(Object.keys(mem).sort());



zl.archiveFolder("generated", "generated.zip").then(function () {
    console.log("done");
}, function (err) {
    console.log(err);
});
