/**
 * Created by lugg on 20.04.14.
 */
var FPI = require("./FacePartsDBInterface.js");

function KeyValueConstr(key,value)
{
    this.key = key;
    this.value = value;
}

function main()
{
    var querryArray = [];
    //function queryDB(tablename, queryArray, callback){
    querryArray.push(new KeyValueConstr('width',1));
    FPI.queryDB('nose',querryArray,function (name) {console.log('name:' + name)});
}

main();