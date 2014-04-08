var exec = require("child_process").exec;

var isAnalyserOnline = false;

function startAnalyserIfNecessary()
{
	console.log('try to start analyser');
	if(isAnalyserOnline == false)
	{
		console.log('analyser started')
		exec(__dirname + 'text_analyser/Code/Source.js',onCloseAnalyser)
		isAnalyserOnline =true;
		console.log('Analyser Started');
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

exports.startAnalyserIfNecessary = startAnalyserIfNecessary;