var mime 	= require('mime');
var fs 		= require('fs');
var path 	= require('path');

var cache 	= new Array	();	// used to cache html, css and js files 


function send404(response)
{
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('Error 404: response not found');
	response.end();
}

function sendFile(response,filePath,fileContents)	
{
	response.writeHead(200, {"content-type":mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function serveStatic(response, absPath) {
	if (cache[absPath])
	{
		sendFile(response, absPath, cache[absPath]); // file is already in cache
	}
	else
	{
		fs.exists(absPath, function(exists)
		{
			loadAndServeFile(exists,absPath, response);
		}); 
	}
}

function loadAndServeFile(exists, absPath, response)
{
	console.log('came here with' + absPath);
	if(exists)
	{
		fs.readFile(absPath, function(err,data){
			if(err)
			{
				send404(response);
			}
			else
			{
				cache[absPath] = data;
				sendFile(response,absPath,data);
			}
		});
	}
	else
	{
		send404(response);
	}
}

exports.serveStatic = serveStatic;