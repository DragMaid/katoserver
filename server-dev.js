const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');

const publicDir = path.join(__dirname, 'sites');
const siteRegister = path.join(publicDir, 'site-register.json');
const siteData = require(siteRegister);
const defaultSite = "katoserver";

// This is for katoforum only
const forumDir = path.join(publicDir, 'katoforum');
const postDir = path.join(forumDir, 'postentry');
const postRegistry = path.join(forumDir, 'post-registry.json');
const postData = require(postRegistry);

//this is for katodrive only
const fileProcess = require('./file-process.js');
const upload = require("express-fileupload");
const storageDir = path.join(__dirname, 'storage');
const imageDir = path.join(storageDir, 'images');
const otherDir = path.join(storageDir, 'others');
const filesRegistry = path.join(__dirname, 'file-registry.json');

const app = new express();
app.set('port', process.env.PORT || 3000);
app.use('/', express.static('sites'));
app.use('/storage', express.static(storageDir));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(upload());

app.post("/upload", function(request, response) {
    var files = new Array(); var filearray;
    if(request.files) {
        if(Array.isArray(request.files.filesfld)) {
            filearray = request.files.filesfld;
        }
        else {
            filearray = new Array(1);
            filearray[0] = request.files.filesfld;
        }
		for(var i = 0; i < filearray.length; i++) {
			var file = filearray[i];
			fileProcess.move_file_to_folder(file, 'tmp', () => {
				fileProcess.add_file_to_json(file, () => {
					fileProcess.move_file_to_folder(file, 'storage', ()=>{});
					fileProcess.move_file_to_folder(file, 'backup', ()=>{});
					fileProcess.remove_file_from_folder(file, 'tmp', ()=>{});
				});
			});
		}
    }
    setTimeout(function(){response.json(files);}, 1000);
});

app.get('/', function(req, res) {
    res.redirect(path.join(defaultSite));
})

app.get('/sites', function(req, res) {
    res.sendFile(siteRegister);
})

app.get('/storage', function(req, res) {
    res.sendFile(filesRegistry);
})

app.get('/katoforum/posts', function(req, res) {
    res.sendFile(postRegistry);
})

for (let i = 0; i < siteData.length; i++) {
    app.get('/' + siteData[i].subdomain, function(req, res) {
        res.redirect(path.join(String(siteData[i].name)));
    })
}

for (let i = 0; i < postData.length; i++) {
    app.get('/' + 'katoforum/' + postData[i].subdomain, function(req, res) {
		res.redirect(path.join('postentry', 'posthtml', postData[i].subdomain, postData[i].subdomain + ".html"));
    })
}

var server = http.createServer(app)

reload(app).then(function(reloadReturned) {
    server.listen(app.get('port'), function() {
        console.log('Web server listening on port ' + app.get('port'))
    })
}).catch(function(err) {
    console.error('Reload could not start, could not start server/sample app', err)
})
