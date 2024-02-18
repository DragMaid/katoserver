const express = require('express');
const path = require('path');
const upload = require('express-fileupload');
const postProcess = require('./post-process.js');
const mdConvert = require('./markdown-process.js');

const postDir = path.join(__dirname, 'postentry');
const postDisplay = path.join(postDir, 'posthtml');
const mdDir = path.join(postDir, 'postmd');
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
app.use('/md/', express.static(mdDir));

app.post("/upload", function(req, res) {
	var sent = false;
    const title = req.body.title;
    const description = req.body.description;
    const thumbnail = req.body.thumbnail;
    const post = {'title': title, 'description': description, 'thumbnail': thumbnail};

    postProcess.add_post_to_json(
        post,
        () => {
            respond(res, 304);
            sent = true; },
        () => {
            postProcess.write_md_file(post, "", ()=>{
                postProcess.write_html_file(post, "", ()=>{
                    respond(res, 200);
                    sent = true;
                });
            });
        }
    );

    
    setTimeout(function(){ 
        if (!sent) respond(res, 500);
        sent = true;
    }, 3000);
})

app.post("/edit", function(req, res) {
	var sent = false;
    const title = req.body.title;
    const description = req.body.description;
    const thumbnail = req.body.thumbnail;
    const oldtitle = req.body.oldtitle;
    const post = {'title': title, 'description': description, 'thumbnail': thumbnail, 'oldtitle': oldtitle};

    postProcess.edit_post_from_json(
        post,
        () => { respond(res, 304);
            sent = true; },
        () => { 
            postProcess.change_file_name(oldtitle, title, 'html', ()=>{});
            postProcess.change_file_name(oldtitle, title, 'md', ()=>{});
            respond(res, 200);
            sent = true;
        }
    );
    
    setTimeout(function(){ 
        if (!sent) respond(res, 500);
        sent = true;
    }, 3000);
})

app.post("/save", function(req, res) {
	var sent = false;
    const filename = req.body.title;
    const content = req.body.content;

    postProcess.write_md_file({'title': filename}, content, () => {
        mdConvert.convert_md_html(path.join(mdDir, filename+'.md'), (html) => {
            postProcess.write_html_file({'title': filename}, html, ()=>{});
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(html));
            sent = true;
        });
    });

    setTimeout(function(){ 
        if (!sent) respond(res, 500);
        sent = true;
    }, 3000);
})

app.post("/delete", function(req, res) {
    var sent = false;
    var filename = req.body.filename;

    postProcess.remove_post_from_json(filename,
        () => {
            respond(res, 304);
            sent = true; },
        () => {
            postProcess.remove_file_from_folder(filename+'.md', 'md', ()=>{});
            postProcess.remove_file_from_folder(filename+'.html', 'html', ()=>{});
            respond(res, 200);
            sent = true;
        }
    );

    setTimeout(function(){ 
        if (!sent) respond(res, 500);
        sent = true;
    }, 3000);
})

module.exports = { app: app }
