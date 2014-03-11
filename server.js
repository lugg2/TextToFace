var http = require("http");
var url = require("url");

function start(route, handle) {
function onRequest(request, response) {
	console.log("encountered " + request.url);

var pathname = url.parse(request.url).pathname;
var query = url.parse(request.url).query;

console.log("Request for " + pathname + " received.");

 if (request.url === '/favicon.ico') {
       // response.writeHead(200, {'Content-Type': 'image/x-icon'} );
       // response.end(/* icon content here */);
       console.log("favicon Request -.-");
 }

 else {
	route(handle, pathname, response, query);
}

}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");

}

exports.start = start;