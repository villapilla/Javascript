//Lets require/import the HTTP module
var http = require('http'),
    fs = require('fs'),
    dispatcher = require('httpdispatcher'),
    mime = require('mime-types');
//Lets define a port we want to listen to
const PORT=8080;

function randomString(numChar) {
    return Array(numChar).fill(0).reduce(function (x ,y) {
        return x + String.fromCharCode(97 + Math.floor(Math.random()*26));
    }, "").toString();
}

function createString(json) {
    return "{\n\tname : " + "\"" + json.name_and_last + "\"," +
            "\n\temail : " + "\"" + json.email + "\"," +
            "\n\tpassword : " + "\"" + json.password + "\"," +
            "\n\turl : " + "\"" + json.URL + "\"," +
            "\n\taddress : " + "\"" + json.address + "\"," +
            "\n\tcountry : " + "\"" + json.country + "\"," +
            "\n\tpost-code : " + "\"" + json.post + "\"," +
            "\n\tcomments : " + "\"" + json.comments + "\"" +
            "\n}";
}
function createData(content) {
    var date = new Date(),
        extension = ".json",
        fileName = date.getTime() + randomString(5) + extension,
        file;
    file = fs.open("../cgi-bin/folder/" + fileName, 'w+', function(err) {
        if(err) {
            return console.log(err);
        } else {
            //console.log("The file " + fileName + " was open!");
        }
    });
    fs.writeFile("../cgi-bin/folder/" + fileName, content, function(err) {
        if(err) {
            return console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}
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
    console.log(type);
    if(type === "text/css" || type === "image/gif" || type === "image/jpg" || type === "application/x-font-ttf") {
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
    var date = new Date();
    fs.readFile("../html/index.html", function (err, data){
        res.writeHead(200,
            {
                "Content-Type": "text/html",
                "Content-Length":data.length,
                "Set-Cookie" : "Shield = " + date.getTime() + randomString(5)
            });
        res.write(data);
        res.end();
    });
});
//A sample POST request
dispatcher.onGet(/.(css|js|jpg|png|gif|ttf)$/, function(req, res) {
    readData(req, res, mime.lookup(req.url), "../html" + req.url);
});

dispatcher.onPost("/", function(req, res) {
    var StringRequest = createString(req.params);
    createData(StringRequest);
    fs.readFile("../html/index.html", function (err, data){
        res.writeHead(200, {"Content-Type": "text/html", "Content-Length":data.length});
        res.write(data);
        res.end();
    });
});
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});