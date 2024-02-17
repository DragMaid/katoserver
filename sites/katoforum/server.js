const express = require('express');
const path = require('path');
const upload = require('express-fileupload');

const postDir = path.join(__dirname, 'postentry');
const postDisplay = path.join(postDir, 'posthtml');
const postRegistry = path.join(__dirname, 'post-registry.json');
const postData = require(postRegistry);

const app = new express();
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(upload());

function respond(res, code) {
	res.writeHead(code, {
		"Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*" 
	}); res.end(); 
}

app.get("/", function(req, res) {res.redirect('src')})
app.get("/posts", function(req, res) {res.sendFile(postRegistry)})
app.use('/posts/', express.static(postDisplay));

app.post("/upload", function(req, res) {
	var sent = false;
	
	console.log(req);
	//const title = req.entries().filename;
	//const description = req.body.description;
	//console.log(title);
	//setTimeout(function(){ 
		//if (!sent) respond(res, 500);
		//sent = true;
	//}, 3000);
})

//app.post("/delete", function(req, res) {
	//console.log(req.body);
	//var sent = false;
	//setTimeout(function(){ 
		//if (!sent) respond(res, 500);
		//sent = true;
	//}, 3000);
//})

app.post("/delete", function(req, res) {
	var sent = false;
	const filename = req.body.filename;
	console.log(filename);
})

module.exports = { app: app }
