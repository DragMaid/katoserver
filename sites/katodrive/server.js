const express = require('express');
const path = require('path');

const fileProcess = require('./file-process.js');
const upload = require("express-fileupload");
const storageDir = path.join(__dirname, 'storage');
const filesRegistry = path.join(__dirname, 'file-registry.json');
const publicDir = path.join(__dirname, 'src');

const app = new express();
app.use('/storage', express.static(storageDir));
app.use('/', express.static('src'));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(upload());

function respond(res, code) {
	res.writeHead(code, {
		"Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*" // Allow access from other domains
	}); res.end(); 
}

app.get("/", function(req, res) { res.redirect('src'); });
app.get("/storage", function(req, res) { res.sendFile(filesRegistry); });

app.post("/upload", function(req, res) {
	var files = new Array(); var filearray;
	var sent = false;

	if(req.files) {
		if(Array.isArray(req.files.filesfld)) {
			filearray = req.files.filesfld;
		}
		else {
			filearray = new Array(1);
			filearray[0] = req.files.filesfld;
		}
		for(var i = 0; i < filearray.length; i++) {
			var file = filearray[i];
			fileProcess.move_file_to_folder(file, 'tmp', () => {
				fileProcess.add_file_to_json(file, () => { respond(res, 304); sent=true; }, () => {
					fileProcess.move_file_to_folder(file, 'storage', ()=>{});
					fileProcess.move_file_to_folder(file, 'backup', ()=>{});
					fileProcess.remove_file_from_folder(file.name, 'tmp', ()=>{});
					if (!sent) {
						respond(res, 200);
						sent = true; return;
					}
				});
			});
		}
	}

	setTimeout(function(){ 
		if (!sent) respond(res, 500);
		sent = true;
	}, 60000);
})

app.post("/delete", function(req, res) {
	var sent = false;
	const filename = req.body.filename;
	console.log(filename);
	fileProcess.remove_file_from_json(filename, () => { respond(res, 304); sent=true; }, () => {
		fileProcess.remove_file_from_folder(filename, 'storage', () => { 
			if (!sent) {
				respond(res, 200);
				sent = true; return;
			}
		})
	});
	setTimeout(function(){ 
		if (!sent) respond(res, 500);
		sent = true;
	}, 3000);
})

module.exports = { app: app }
