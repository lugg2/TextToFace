/*
 Authors    : taken from book Node.js for Beginners
 Reviewers
 Description: glues together the static file handler as well as the request handler
*/


var serveStaticFile = require('./ServeHtmlFiles');


// function serveStatic(response, absPath) {
function route(handle, pathname, response, request)
{
	if(typeof handle[pathname]==='function')
	{
		handle[pathname](response, request);
	}
	else
	{
		if(pathname && pathname != '/' && pathname!='/Index.html' )
		{
			pathname = __dirname + '/' + 'website' + pathname;
		}
		else 
		{
			pathname = __dirname + '/' + 'website/index.html';
		}	
		serveStaticFile.serveStatic(response, pathname);
	}
}
exports.route = route;