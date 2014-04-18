var formidable = require("formidable");
var querystring = require("querystring");
var fs = require("fs");
var util = require("util");
var url = require("url");
var analyser = require("./analyserHandler");
var templateCreator = require("./templateCreator.js");
var invoke = require('invoke');

var ruleAutomata = require("./RulesHelper.js");
var wantedPoster = require("./wantedPosterCreator.js");
var faceCreator = require("./faceCreator.js");

// helper functions
function write502(response)
{
    response.writeHead(502, {'content-type': 'text/plain'});
    response.write('Bad Request');
    response.end();
}

// exports functions

function result(request, response)
{
    templateCreator.result(request, response);
}

function upload(response, request) {
    
      if ( request.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();

        form.parse(request, function(err, fields, files) {
            
        requestID = analyser.generateWorklistItem();
        fs.writeFile(__dirname + '/text_analysis/Code/msg/message' + requestID , fields.Text1, function (err) {
          if (err) 
            {throw err;}
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
  analyser.sendWorklist(response, request);
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
    
      var queryData = url.parse(request.url, true).query;
    ruleAutomata.evaluateAnalyserOutput(body, queryData.messageID, callbackWantedPoster, callbackFaceCreator);

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

function callbackWantedPoster(id, mData){
  //TODO callback
  wantedPoster.createWantedPoster( id, mData, dummy);

}
function callbackFaceCreator(objFace){
  //TODO callback
  faceCreator.createFaceParts(objFace, dummy);
}
function dummy(){

}

exports.finished = finished;
exports.getWorklist = getWorklist;
exports.upload = upload;
exports.result = result;
