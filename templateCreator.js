var id=2;
var publickey=1234;
var fs = require('fs');



function main()
{
generateTemplate(id,publickey);
}

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

main();