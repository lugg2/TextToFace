var formidable = require("formidable");
var querystring = require("querystring");
var fs = require("fs");
var util = require("util");
var url = require("url");
var analyser = require("./analyserHandler");

var invoke = require('invoke');

var worklist = new Array();
var requestID = -1;


// helper functions
function write502(response)
{
    response.writeHead(502, {'content-type': 'text/plain'});
    response.write('Bad Request');
    response.end();
}

function continueProcessing(postData)
{

}

// exports functions  
function upload(response, request) {
    
      if ( request.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();

        form.parse(request, function(err, fields, files) {

        requestID++;
        fs.writeFile(__dirname + '/text_analysis/message' + requestID , fields.Text1, function (err) {
          if (err) throw err;
        worklist.push('message' + requestID);
    	  response.writeHead(200, {'content-type': 'text/plain'});
          response.write('upload successfull');
          response.end();
          analyser.startAnalyserIfNecessary();
        });
      });
      }
      else
      {
          write502(response);
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

function finished(response, request) {
  if ( request.method.toLowerCase() == 'post') {
  console.log('POST');
  var body = '';
  request.on('data', function (data) {
  body += data;

  // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
  if (body.length > 1e6) { 
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
      console.log('more than 1MB post data');
      console.log(body);
  } 
  });
  request.on('end', function () {
    var query   = url.parse(request.url).query;
    console.log('recieved data :'+ body);
    console.log(util.inspect(query,{showHidden: true, depth: null}));

    response.writeHead(200, {'content-type': 'text/plain'});
    response.write('Acknowledge');
    response.end();
  });

  }
  else
  {
      write502(response);
  }
}


exports.finished = finished;
exports.getWorklist = getWorklist;
exports.upload = upload;
