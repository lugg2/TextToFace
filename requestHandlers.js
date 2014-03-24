var exec = require("child_process").exec;
var formidable = require("formidable");
var querystring = require("querystring");
var fs = require("fs");
var util = require("util");

var invoke = require('invoke')

var worklist = new Array();
var requestID = -1;
  
function upload(response, request) {

    
      if ( request.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();

        form.parse(request, function(err, fields, files) {

        requestID++;
        fs.writeFile('message' + requestID, fields.Text1, function (err) {
          if (err) throw err;
        worklist.push('message' + requestID);
        });
      });
      }
      else
      {
          response.writeHead(502, {'content-type': 'text/plain'});
          response.write('Bad Request');
          response.end();
      }
  
}

function getWorklist(response, request)
{ 
  var temp;
  response.writeHead(200, {'content-type': 'text/plain'});

  for(var i = 0; i<worklist.length;i++)
  {
    response.write(i+': '+worklist[i]+'; ');
  }

  response.end();
    
  worklist.length = 0;       
    
}

exports.getWorklist = getWorklist;
exports.upload = upload;
