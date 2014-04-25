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
            
        var requestID = analyser.generateWorklistItem();
        fs.writeFile(__dirname + '/text_analysis/Code/msg/message' + requestID , fields.Text1, function (err) {
          if (err) 
            {throw err;}
    	  response.writeHead(200, {'content-type': 'text/plain'});
          response.write('upload successfull');
          response.end();
          analyser.startAnalyserIfNecessary();
            // TODO FIX THIS analyser needs a status update when writeFile is ready

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
    
    var queryData = url.parse(request.url, true).query;
    analyser.notifyStatusChange(queryData.messageID,"evaluated");
    analyser.extendWithAnalyserResult(queryData.messageID,body);

    body = eval("("+body+")");
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
  wantedPoster.createWantedPoster( id, mData, function() {
      analyser.extendWithMData(id,mData);
      analyser.notifyStatusChange(id,'createdWantedPoster');
  });

}
function callbackFaceCreator(objFace){
    var temp = util.inspect(objFace).toString();
    analyser.extendWithObjFace(objFace.id, temp);
    faceCreator.createFaceParts(objFace,function() {

      analyser.notifyStatusChange(objFace.id,'createdPictue')
  });
}

function debug(response, request)
{
    var queryData = url.parse(request.url, true).query;

    if ( typeof queryData.id == "undefined" || typeof  queryData.pkey == "undefined" || analyser.isPublicKeyValid(queryData.id,queryData.pkey) == false )
    {
        write502(response);
        return;
    }
    var worklistItem = analyser.getWorklistItemByID(queryData.id);

    response.writeHead(200, {'content-type': 'text/plain'});
    response.write('\n \n<---------- mData -----------> \n');
    response.write(util.inspect(worklistItem.mData));
    response.write('\n \n<---------- objFace --------->\n');
    response.write(util.inspect(worklistItem.objFace));
    response.write('\n \n <---------- analyserOutput -->\n');
    response.write(util.inspect(worklistItem.analyserResult));
    response.end();

}

exports.finished = finished;
exports.getWorklist = getWorklist;
exports.upload = upload;
exports.result = result;
exports.debug = debug;