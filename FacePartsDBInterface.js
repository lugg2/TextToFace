var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname+'/FacePartsDB.db');
var util = require('util');
var squel = require("squel");
var objKeyValue = {
	key : 0,
	value : 0
}
var queryArray = new Array();
var bestMatchName;
var bestMatch = 10000;

db.serialize(function() {
  var queryElement1 = Object.create(objKeyValue);
  queryElement1.key = "width";
  queryElement1.value = 3;
  queryArray.push(queryElement1);

  var queryElement2 = Object.create(objKeyValue);
  queryElement2.key = "height";
  queryElement2.value = 3;
  queryArray.push(queryElement2);

  var queryElement3 = Object.create(objKeyValue);
  queryElement3.key = "form";
  queryElement3.value = "gerade";
  queryArray.push(queryElement3);

  queryDB("nose", queryArray, bestMatchCallback);
  
});

db.close();

var funcCallback;
function queryDB(tablename, queryArray, callback){
  funcCallback=callback;

  db.each(squel.select().from(tablename).toString(), dbEachCallback, complete);
} 

function dbEachCallback(err, row)
{
  var param = queryArray;
  var sum = 0;
  //console.log(util.inspect(this));

  for(var i = 0; i< param.length; i++)
  {
    type = typeof param[i].value;
    if (type === "number"){
      var quadrat = (row[param[i].key] - param[i].value) * (row[param[i].key] - param[i].value);    
      sum += quadrat;
    }
      else if (type === "string"){
        if (param[i].value != row[param[i].value]){
          sum += 4;
        }
      }
  }
    if (sum < bestMatch){
      bestMatch = sum;
      bestMatchName = row.picname;
    }
};

function complete()
{
  
  console.log("Picturename: "+ bestMatchName);
  if (typeof funcCallback == "function") {
    funcCallback(bestMatchName);
  };
}

function bestMatchCallback(name)
{
  console.log(name);

}
