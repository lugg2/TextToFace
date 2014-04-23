var exec = require("child_process").exec;
var url = require("url");
var util = require("util");
var socketHelper = require('./socketHelper.js');


var isAnalyserOnline = false;
var analyserKey = '';
var currentID = -1;

var worklistItems = [];

// used to check wheather staus is legit in notify Status change

function WorklistItem(publicKey, id, socketID)
{
    this.publicKey = publicKey;
    this.id = id;
    this.socketID = socketID;

    this.waiting = false;
    this.analysing = false;
    this.evaluated = false;
    this.createdWantedPoster = false;
    this.createdPictue = false;
}

function generateWorklistItem(socketID)
{
    currentID +=1;
    // Status has to be done
    var newItem = new WorklistItem(generateKey() + currentID.toString(),currentID,socketID);
    worklistItems.push(newItem);
    socketHelper.emitProgress(generateProgressArray(newItem.id),socketID);
    return currentID;
}

function getWorklistItemByID(id)
{
    for(var i = 0; i< worklistItems.length; i++)
    {
        if(worklistItems[i].id == id)
        return worklistItems[i];
    }
    return 'undefined';
}

function sendWorklist(response, request)
{
    var queryString = url.parse(request.url, true).query;

    console.log('send Worklist to : '+util.inspect(queryString));

    if (typeof queryString.workerid != 'undefined' && queryString.workerid === analyserKey)
    {
        // output looks like
        // 0: message0; 1: message1; 2: message2;
        response.writeHead(200, {'content-type': 'text/plain'});
        for(var i = 0; i<worklistItems.length;i++)
        {
            if(worklistItems[i].analysing == false && worklistItems[i].waiting == true) {

                response.write(i + ': ' + 'message' + worklistItems[i].id + '; ');
                notifyStatusChange(i,'analysing');
            }
        }

        response.end();
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

    while ( i<worklistItems.length && !foundItem )
    {
        if(worklistItems[i].id == id)
        {
            worklistItems[i][newStatus] = true;
            foundItem = true;
            if(worklistItems[i].socketID != 'undefined')
            {
               socketHelper.emitProgress(generateProgressArray(i),worklistItems[i].socketID)
            }
        }
        i++;
    }
    if(!foundItem)
        console.log("wrong status change id does not match a worklist item")
}

function generateProgressArray(worklistItemID)
{
    return [
    worklistItems[worklistItemID].waiting,
    worklistItems[worklistItemID].analysing,
    worklistItems[worklistItemID].evaluated,
    worklistItems[worklistItemID].createdWantedPoster,
    worklistItems[worklistItemID].createdPictue];

}

function extendWorklistItemWithMData(id, mData)
{
    var worklistItem = getWorklistItemByID(id);
    worklistItem.mData = mData;
}

function extendWorklistItemWithObjFace(id, objFace)
{
    var worklistItem = getWorklistItemByID(id);
    worklistItem.objFace = objFace;
}

function extendWorklistItemWithAnalyserResult(id, analyserResult)
{
    var worklistItem = getWorklistItemByID(id);
    console.log('analyserResult :')
    worklistItem.analyserResult = analyserResult;
}

function isPublicKeyValid(id, publicKey)
{
    var here = getWorklistItemByID(id);
    if (here != 'undefined')
    {
        if(here.publicKey === publicKey)
        {
            return true;
        }
    }
    return false;
}

exports.startAnalyserIfNecessary = startAnalyserIfNecessary;
exports.sendWorklist = sendWorklist;
exports.generateWorklistItem = generateWorklistItem;
exports.notifyStatusChange = notifyStatusChange;
exports.getWorklistItemByID = getWorklistItemByID;
exports.isPublicKeyValid = isPublicKeyValid;
// debug functions
exports.extendWithMData = extendWorklistItemWithMData;
exports.extendWithObjFace = extendWorklistItemWithObjFace;
exports.extendWithAnalyserResult = extendWorklistItemWithAnalyserResult;