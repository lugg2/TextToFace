var fs = require('fs');
var url = require('url');
var util = require('util');
// helper functions
function write404(response)
{
    response.writeHead(404, {'content-type': 'text/plain'});
    response.write('Result not found');
    response.end();
}

function generateTemplate(response, request)
{
    var queryData = url.parse(request.url, true).query;
    console.log(util.inspect(queryData));

    if ( typeof queryData.id == "undefined" || typeof  queryData.pkey == "undefined" )
    {
        write404(response);
        return
    }

    var idToken = queryData.id;


	fs.readFile(__dirname +'/website/result.html',"utf-8", function (err, data) {
	if (err) console.log("could not find result.html");
	
	data = data.replace("<BILD>","<img src=" + '"' + idToken +".png"+'"'+"width = 40% > ");
	
	fs.readFile('wantedPoster/wantedPoster'+id,"utf-8", function (err, wantedPoster) {
	if (err) console.log("could not find wanted Poster");
	
	data = data.replace("<WANTEDPOSTER>",wantedPoster);
        response.writeHead(200, {'content-type': 'text/plain'});
        response.write(data);
        response.end();
	});
	
	});

}

function generateErrorTemplate(response, errorid, text)
{
	fs.readFile(__dirname+'/website/error.html',"utf-8", function (err, errorsite) {
		if (err) console.log("error : "+err);
		else {
	
		errorsite= errorsite.replace("<NUMMER>",errorid);
		errorsite= errorsite.replace("<NUMMER>",errorid);
		errorsite= errorsite.replace("<TEXT>",text);
		
		response.writeHead(200, {'content-type': 'text/html'});
        response.write(errorsite);
        response.end();
		}
	});
	
	
	

}


exports.result = generateTemplate;
exports.generateErrorTemplate = generateErrorTemplate;