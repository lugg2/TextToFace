var exec = require("child_process").exec;

var isAnalyserOnline = false;

function startAnalyserIfNecessary()
{
	
	if(isAnalyserOnline == false)
	{
        console.log('try to start analyser');
        var command = ("java -jar " + __dirname + '\\text_analysis\\Code\\Source.jar' + ' ' + generateKey());
        console.log(command);

        exec(command,onCloseAnalyser)
		isAnalyserOnline =true;
		
	} // else do nothing
}

function onCloseAnalyser(error, stdout, stderr)
{
	console.log('Analyser Stopped');
	if(error !== null) {
		console.log('============== > exec error: ' + stderr + 'stdout ' + stdout);
	}
	console.log('Analyser start');
	isAnalyserOnline = false;
}

function generateKey()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.startAnalyserIfNecessary = startAnalyserIfNecessary;