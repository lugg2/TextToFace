var http = require("http");
var url = require("url");
var fs = require('fs');


function start(route, handle) {
function onRequest(request, response) {
	console.log("encountered " + request.url);

	var pathname 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	console.log("Request for " + pathname + " received, with query: " + query + "request.url :" + request.url);
	route(handle, pathname, response, request);

}

http.createServer(onRequest).listen(8080);
console.log("Server has started.");

}

exports.start = start;
