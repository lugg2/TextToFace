var exec = require("child_process").exec;

var isAnalyserOnline = false;
var analyserKey = '';
var currentID = -1;


function worklistItem(publicKey, id, status)
{
    this.publicKey = publicKey;
    this.id = id;
    this.status = status;
}

function waitlistItem(workerKey, worklistItem, id)
{
    this.workerKey = workerKey;
    worklistItem = worklistItem;
    timeStamp = Date.now();
}

var worklistItems = new Array();
var waitlistItems = new Array();

function generateWorklistItem()
{
    currentID +=1;
    // Status has to be done
    var newItem = new worklistItem(generateKey(),currentID,'null');
    worklistItems.push(newItem);
    return currentID;
}

function sendWorklist(response)
{
   // output looks like 
   // 0: message0; 1: message1; 2: message2; 
  response.writeHead(200, {'content-type': 'text/plain'});
  for(var i = 0; i<worklistItems.length;i++)
  {
    response.write(i+': '+'message'+worklistItems[i].id +'; ');
  }

  response.end();
  worklistItems.length = 0;  
}

function startAnalyserIfNecessary()
{
	
	if(isAnalyserOnline == false)
	{
        analyserKey = generateKey();
        // var command = ("java -jar " + __dirname + '\\text_analysis\\Code\\Source.jar' + ' ' + analyserKey); // windows
        var command = ("java -jar " + __dirname + '/text_analysis/Code/Source.jar' + ' ' + analyserKey); // unix
        console.log("try to start analyser with command :" + command);

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
exports.sendWorklist = sendWorklist;
exports.generateWorklistItem = generateWorklistItem;
