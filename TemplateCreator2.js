var id=2;
var publickey=1234;
var fs = require('fs');
var number=405;
var text="Page not found!";





function generateTemplate(idToken, publickeyToken)
{
	fs.readFile('website/result.html',"utf-8", function (err, data) {
	if (err) console.log("feheler");
	
	data = data.replace("<BILD>","<img src=" + '"' + idToken +".png"+'"'+"width = 40% > ");
	
	fs.readFile('wantedPoster/wantedPoster'+id,"utf-8", function (err, wantedPoster) {
	if (err) console.log("feheler");
	
	data = data.replace("<WANTEDPOSTER>",wantedPoster);
	console.log(data);
	fs.writeFile(__dirname + '/website/result' + id+'.html', data, function(err) {
		//callback(err);
	}); 
		});
	
	
	
	});
	//console.log(data);

}

function generateErrorTemplate(nr,text)
{
	fs.readFile('website/error.html',"utf-8", function (err, errorsite) {
		if (err) console.log("feheler");
	
		errorsite= errorsite.replace("<NUMMER>",nr);
		errorsite= errorsite.replace("<NUMMER>",nr);
		errorsite= errorsite.replace("<TEXT>",text);
	
	fs.writeFile(__dirname + '/website/error' + nr+'.html', errorsite, function(err) {
		//callback(err);
	});
	});
	
	
	

}
generateErrorTemplate(number,text);

