
var serveStaticFile = require('./ServeHtmlFiles');

// function serveStatic(response, absPath) {
function route(handle, pathname, response, query, request)
{
	console.log(pathname + '<--');
	if(typeof handle[pathname]==='function')
	{

		handle[pathname](response, request);
	}
	else
	{

		if(pathname && pathname != '/' && pathname!='/Index.html' )
		{
			pathname = 'website' + pathname;
		}
		else 
		{
			pathname = 'website/index.html';
		}
		
		serveStaticFile.serveStatic(response, pathname);
	}
}
exports.route = route;