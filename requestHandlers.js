var exec = require("child_process").exec;
var formidable = require("formidable");
var querystring = require("querystring");
var fs = require("fs");
var util = require("util");

function start(response) {
console.log("Request handler 'start' was called.");

exec("/home/lukas/Desktop/nodeServer2/TestIt2",
{ timeout: 10000, maxBuffer: 20000*1024 },
function (error, stdout, stderr) {
response.writeHead(200, {"Content-Type": "text/html"});
response.write("<DOCTYPE HTML>");
response.write("<html><body>");
response.write(stdout);
response.write("</body></html>")
response.end();
});
}

function upload(response, request) {
  if ( request.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(request, function(err, fields, files) {
      response.writeHead(200, {'content-type': 'text/plain'});
      response.write('received upload:\n\n');
      response.end(fields.Text1);

	fs.writeFile('message.txt', fields.Text1, function (err) {
  		if (err) throw err;
  	console.log('It\'s saved!');
	});

    });
  }
    return;
}

function show(response, query) {
	var Path = querystring.parse(query)["imgName"];
	console.log("Request handler 'show' was called");
	console.log("request eq " + query);
	
	if(Path== null)
	{
	
	}
	else
	{
		
		response.writeHead(200, {"Content-Type": "image/png"});
            
            	// This line opens the file as a readable stream
  		var readStream = fs.createReadStream("./"+Path);

  		// This will wait until we know the readable stream is actually valid before piping
  		readStream.on('open', function () {
    	// This just pipes the read stream to the response object (which goes to the client)
    		readStream.pipe(res);
    		console.log("true");
  		});

  		// This catches any errors that happen while creating the readable stream (usually invalid names)
  		readStream.on('error', function(err) {
    		res.end(err);
    		response.writeHead(200, {"Content-Type": "text/plain"})
    		response.write("Resource at "+Path+" not found");
    		response.end();

    	console.log("false");
  		});
		
	}
}

exports.start = start;
exports.upload = upload;
exports.show = show;
