var sqlite3 = require('sqlite3').verbose();
var util = require('util');
var db = new sqlite3.Database(__dirname+'/FacePartsDB.db');

console.log (util.inspect(db));
/* queryArray consits of these
 var objKeyValue = {
 key : 0,
 value : 0
 }
 */


function queryDB(tablename, queryArray, callback){


  var bestMatchName;
  var bestMatch = 10000;


        db.each("SELECT * FROM " + tablename,
            // function is called for each row
            function (err, row) {
                console.log('row');
                var param = queryArray;
                var sum = 0;

                for (var i = 0; i < param.length; i++) {
                    var type = typeof param[i].value;
                    if (type === "number") {
                        // next statement equals
                        // sum += quadrat
                        sum += (row[param[i].key] - param[i].value) * (row[param[i].key] - param[i].value);
                    }
                    else if (type === "string") {
                        if (param[i].value != row[param[i].value]) {
                            sum += 4;
                        }
                    }
                }
                if (sum < bestMatch) {
                    bestMatch = sum;
                    bestMatchName = row.picname;
                }
            }
            ,
            // complete callback
            function () {
                console.log("Picturename: " + bestMatchName);
                if (typeof callback == "function") {
                    callback(bestMatchName);
                }
            });
    }


exports.queryDB = queryDB;
