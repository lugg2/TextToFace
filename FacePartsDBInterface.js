/*
 Author :         Silke
 Description :   This module calculate which facePart fits best to the results of the RuleAutomata
 Reviewer :      Lukas
 */

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname+'/FaceParts.db');


/*
 queryArray consits of these
 var objKeyValue = {
 key : 0,
 value : 0
 }
 */


function queryDB(tablename, queryArray, callback){


  var bestMatchName;
  var bestMatch = 10000;

    function forEachRow (err, row) {

        if(err)
        {
            console.log(err);
        }

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

    function onComplete () {
        console.log("Picturename: " + bestMatchName);
        if (typeof callback == "function") {
            callback(bestMatchName);
        }
    }

        db.each("SELECT * FROM " + tablename, forEachRow, onComplete);

}


exports.queryDB = queryDB;
