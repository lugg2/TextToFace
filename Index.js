/*
 Authors:   taken from Nodejs for beginners
 Reviewers
 Description starts the application and adds the request handler functions to handle array
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// api functions
var handle = {};

handle["/upload"] 		= requestHandlers.upload;
handle["/getworklist"] 	= requestHandlers.getWorklist;
handle["/finished"] 	= requestHandlers.finished;
handle["/result"]       = requestHandlers.result;

server.start(router.route, handle);