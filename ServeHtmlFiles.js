var mime 	= require('mime');
var fs 		= require('fs');
var path 	= require('path');
var templateCreator = require("./templateCreator.js")
var cache 	= [];	// used to cache html, css and js files
  
  

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
	if(exists)
	{
		fs.readFile(absPath, function(err,data){
			if(err)
			{
				templateCreator.generateErrorTemplate(response,404,"Page not found");
			}
			else
			{
                // don't cache pictures because they waste ram space
                if(absPath.indexOf('pictures')==-1 )
                {
                    cache[absPath] = data;
                    console.log(absPath + 'cached');
                }
				sendFile(response,absPath,data);
			}
		});
	}
	else
	{
		console.log('did not find :' + absPath);
		templateCreator.generateErrorTemplate(response,404,"Page not found");
	}
}

exports.serveStatic = serveStatic;
