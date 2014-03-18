var http = require("http");
var url = require("url");

function start(route, handle) {
function onRequest(request, response) {
	console.log("encountered " + request.url);

	var pathname 	= url.parse(request.url).pathname;
	var query 	= url.parse(request.url).query;
	
	console.log("Request for " + pathname + " received, with query: " + query + "request.url :" + request.url);
	route(handle, pathname, response, query, request);

}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");

}

exports.start = start;
