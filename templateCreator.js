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
    console.log(typeof request.url);
    var queryData = url.parse(request.url, true).query;
    console.log(util.inspect(queryData));

    if ( typeof queryData.id == "undefined" || typeof  queryData.pkey == "undefinded" )
    {
        write404(response);
        return
    }

    idToken = queryData.id;


	fs.readFile('website/result.html',"utf-8", function (err, data) {
	if (err) console.log("fehler");
	
	data = data.replace("<BILD>","<img src=" + '"' + idToken +".png"+'"'+"width = 40% > ");
	
	fs.readFile('wantedPoster/wantedPoster'+id,"utf-8", function (err, wantedPoster) {
	if (err) console.log("feheler");
	
	data = data.replace("<WANTEDPOSTER>",wantedPoster);
        response.writeHead(200, {'content-type': 'text/plain'});
        response.write(data);
        response.end();
	});
	
	});
	//console.log(data);

}

exports.result = generateTemplate;