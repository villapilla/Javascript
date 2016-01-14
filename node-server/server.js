//Lets require/import the HTTP module
var http = require('http'),
    fs = require('fs'),
    dispatcher = require('httpdispatcher');
//Lets define a port we want to listen to
const PORT=8080;





//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

function readData(req, res, type, file) {
    fs.readFile(file, function (err, data){
        res.writeHead(200, {'Content-Type': type,'Content-Length':data.length, 'Set-Cookie': 'hola=1'});
        res.write(data);
        res.end();
    });
}
//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('html');

//A sample GET request    
dispatcher.onGet("/", function(req, res) {
    readData(req, res, "text/html",  "html/index.html" );
});
//A sample POST request
dispatcher.onGet(/.css$/, function(req, res) { 
    readData(req, res, "text/css", "html" + req.url);
});
dispatcher.onGet(/.js$/, function(req, res) { 
    readData(req, res, "text/javascript", "html" + req.url);
});
dispatcher.onGet(/.jpg$/, function(req, res) { 
    readData(req, res, "img/jpg", "html" + req.url);
});
dispatcher.onGet(/.png$/, function(req, res) { 
    readData(req, res, "img/png", "html" + req.url);
});
dispatcher.onGet(/.gif$/, function(req, res) { 
    readData(req, res, "img/gif", "html" + req.url);
});
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});