/*
 Authors: Lukas
 Reviewers: -
 Description: used as test for the FacePartsDBInterface
              not used in productive enviroments
 */

var FPI = require("./FacePartsDBInterface.js");

function KeyValueConstr(key,value)
{
    this.key = key;
    this.value = value;
}

function main()
{
    var queryArray = [];
    //function queryDB(tablename, queryArray, callback){
    queryArray.push(new KeyValueConstr('width',1));
    FPI.queryDB('nose',queryArray,function (name) {console.log('name:' + name)});
}

main();