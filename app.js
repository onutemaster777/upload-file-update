const express = require('express');
var app = express();
var upload = require('express-fileupload');
const http = require('http');
var useragent = require('express-useragent');
http.Server(app).listen(3005); // make server listen on port 3005
app.use(useragent.express());
app.use(upload()); // configure middleware

console.log("Server started at port 3005");

app.get('/',function(req,res){
  console.log(req.useragent);
  res.sendFile(__dirname+'/index.html');console.log("An client visited your site.");
})
app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = '../BonziWORLD/build/www/uploaded/' + name;console.log("Uploaded!");
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File uploading failed",name,err);
        res.send("Error uploading the file. File:" + [name] + "CODE: " + [err])
      }
      else {
        console.log("Uploaded file",name);
        res.send('successfully uploaded "' + [name] + '"')
      }
    });
  }
  else {
    res.send("No file selected");
    res.end();
  };
});
var errorHandler = require('express-error-handler'),
  handler = errorHandler({
    static: {
      '404': '404.html','403': '403.html','401': '401.html','431': '431.html','400': '400.html'
    }
  });

// After all your routes
// Pass a 404 into next(err)
app.use( errorHandler.httpError(404) );
app.use( errorHandler.httpError(403) );
app.use( errorHandler.httpError(401) );
app.use( errorHandler.httpError(400) );
app.use( errorHandler.httpError(431) );

// Handle all unhandled errors
app.use( handler );