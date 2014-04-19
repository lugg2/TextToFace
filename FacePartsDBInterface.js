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
});

db.close();

var funcCallback;
var OFace;
var OFaceValue;

// valuechang is for example eyebrow
function queryDB(tablename, qArray, callback){
  funcCallback=callback;
  queryArray = qArray;

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
  }
}

exports.queryDB = queryDB;
