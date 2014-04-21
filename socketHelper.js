/**
 * Created by lugg on 20.04.14.
 */
var socketio = require('socket.io');
var analyserHandler = require('./analyserHandler.js');
var fs = require('fs');
var util = require('util');
var io;

function listen(server){
    io = socketio.listen(server);
    io.sockets.on('connection', function(socket){
        handleUploadText(socket);
    });
}

function handleUploadText(socket){
    socket.on('newText', function(text, cb){
        var requestID  = analyserHandler.generateWorklistItem(socket.id);
        var worklistItem = analyserHandler.getWorklistItemByID(requestID);
        var pkeyAndID = {};
        pkeyAndID.id = worklistItem.id;
        pkeyAndID.pkey = worklistItem.publickey;
        cb(pkeyAndID);
        fs.writeFile(__dirname + '/text_analysis/Code/msg/message' + requestID , text, function (err) {
            if (err) {
                throw err;
            }
            analyserHandler.startAnalyserIfNecessary();
            // worklist item is now waiting to be analysed
            analyserHandler.notifyStatusChange(worklistItem.id,'waiting');
        });
    });
}

function emitProgress(progress, socketID){
    console.log(util.inspect(progress) + ' ' + socketID);
    io.sockets.socket(socketID).emit('progress', progress);

}

exports.listen = listen;
exports.emitProgress = emitProgress;