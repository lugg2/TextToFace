function route(handle, pathname, response, query) {
console.log("About to route a request for " + pathname);
console.log("query eq" +query);
if(pathname=="/show")
{
	handle["/show"](response,query);
}
else {
if (typeof handle[pathname] === 'function') {
handle[pathname](response);
} else {
console.log("No request handler found for " + pathname);
response.writeHead(404, {"Content-Type": "text/plain"});
response.write("404 Not found");
response.end();
}
}
}

exports.route = route;