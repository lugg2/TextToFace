var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// api functions
var handle = {}

handle["/upload"] 		= requestHandlers.upload;
handle["/getworklist"] 	= requestHandlers.getWorklist;
handle["/finished"] 	= requestHandlers.finished;

server.start(router.route, handle);
