
var serveStaticFile = require('./ServeHtmlFiles');


// function serveStatic(response, absPath) {
function route(handle, pathname, response, request, websitePath)
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
			pathname = websitePath + '/' + 'website' + pathname;
		}
		else 
		{
			pathname = websitePath + '/' + 'website/index.html';
		}	
		serveStaticFile.serveStatic(response, pathname);
	}
}
exports.route = route;