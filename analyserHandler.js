var exec = require("child_process").exec;
var url = require("url");
var util = require("util");

var isAnalyserOnline = false;
var analyserKey = '';
var currentID = -1;

var worklistItems = [];

// used to check wheather staus is legit in notify Status change
var availableStatus = [];
availableStatus.push("waiting");
availableStatus.push("analysed");
availableStatus.push("evaluated");
availableStatus.push("drawn");
availableStatus.push("wantedposter");

function WorklistItem(publicKey, id, status)
{
    this.publicKey = publicKey;
    this.id = id;
    this.status = [];
    status.push(status);
}

function generateWorklistItem()
{
    currentID +=1;
    // Status has to be done
    var newItem = new WorklistItem(generateKey() + currentID.toString(),currentID,'waiting');
    worklistItems.push(newItem);
    return currentID;
}

function sendWorklist(response, request)
{
    console.log('get Worklist');
    var queryString = url.parse(request.url, true).query;

    console.log(util.inspect(queryString));
    console.log(queryString.workerid);
    console.log(typeof queryString.workerid);

    if (typeof queryString.workerid != 'undefined' && queryString.workerid === analyserKey)
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
    else
    {
        console.log('send kill');
        // kill old workers
        response.writeHead(200, {'content-type': 'text/plain'});
        response.write('kill');
        response.end();
    }
}

function startAnalyserIfNecessary()
{	
	if(isAnalyserOnline == false)
	{
        analyserKey = generateKey();
        // var command = ("java -jar " + __dirname + '\\text_analysis\\Code\\Source.jar' + ' ' + analyserKey + ' -'); // windows
        var command = ("java -jar " + __dirname + '/text_analysis/Code/Source.jar' + ' ' + analyserKey + ' -localhost'); // unix
        console.log("try to start analyser with command :" + command);

        exec(command,onCloseAnalyser);
	    isAnalyserOnline =true;
	} // else do nothing
}

function onCloseAnalyser(error, stdout, stderr)
{
	console.log('Analyser Stopped');
	if(error !== null) {
		console.log('============== > exec error: ' + stderr + 'stdout ' + stdout);
	}
    else
	console.log('Analyser stdout :' + stdout);
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

function notifyStatusChange(id,newStatus)
{
    var foundItem = false;
    var i = 0;
    if (!availableStatus.contains(newStatus));
    {

    }
    while ( i<worklistItems.length && !foundItem )
    {
        if(worklistItems[i].id == id)
        {
            worklistItems[i].status = newStatus;
            foundItem = true;
        }
    }
    if(!foundItem)
        console.log("wrong status change id does not match a worklist item")
}


exports.startAnalyserIfNecessary = startAnalyserIfNecessary;
exports.sendWorklist = sendWorklist;
exports.generateWorklistItem = generateWorklistItem;
exports.notifyStatusChange = notifyStatusChange;
