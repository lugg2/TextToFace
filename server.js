var http = require("http");
var url = require("url");
var fs = require('fs');


var websitePath = String(fs.readFileSync('/etc/usr/nodewebsitepath.conf'));
console.log ('path  :' + websitePath);
console.log(typeof(websitePath));
var felder = websitePath.split('\"',2);
var websitePath = felder[1];

function start(route, handle) {
function onRequest(request, response) {
	console.log("encountered " + request.url);

	var pathname 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	console.log("Request for " + pathname + " received, with query: " + query + "request.url :" + request.url);
	route(handle, pathname, response, request, websitePath);

}

http.createServer(onRequest).listen(8080);
console.log("Server has started.");

}

exports.start = start;
