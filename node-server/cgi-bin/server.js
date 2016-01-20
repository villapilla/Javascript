//Lets require/import the HTTP module
var http = require('http'),
    fs = require('fs'),
    dispatcher = require('httpdispatcher'),
    mime = require('mime-types');
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
    if(type === "image/png" || type === "image/gif" || type === "image/jpg") {
        fs.stat(file, function (err, stat) {
            var img = fs.readFileSync(file);
            res.contentType = 'image/png';
            res.contentLength = stat.size;
            res.end(img, 'binary');
        });
    } else {
        fs.readFile(file, function (err, data){
            res.writeHead(200, {"Content-Type": type, 'Content-Length':data.length});
            res.write(data);
            res.end();
        }); 
    }
}
//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('../html');

//A sample GET request    
dispatcher.onGet("/", function(req, res) {
    console.log("../html" + req.url);
    fs.readFile("../html/index.html", function (err, data){
            res.writeHead(200, {"Content-Type": "text/html", "Content-Length":data.length, "Set-Cookie" : "Register_user=true"});
            res.write(data);
            res.end();
        });
});
//A sample POST request
dispatcher.onGet(/.(css|js|jpg|png|gif)$/, function(req, res) { 
    
    readData(req, res, mime.lookup(req.url), "../html" + req.url);
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});