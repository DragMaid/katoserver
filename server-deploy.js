const express = require('express');
const path = require('path');
const http = require('http');
const reload = require('reload');

const publicDir = path.join(__dirname, 'sites');
const siteRegister = path.join(__dirname, 'site-register.json');
const siteData = require(siteRegister);
const defaultSite = "katoserver";

const app = new express();
app.set('port', process.env.PORT || 3000);

app.use('/', express.static('sites'));

app.get('/', function(req, res) {
    res.redirect(path.join(defaultSite));
})

app.get('/sites', function(req, res) {
    res.sendFile(siteRegister);
})

for (let i = 0; i < siteData.length; i++) {
	const name = siteData[i].name;
	const subdomain = siteData[i].subdomain;
	const appused = siteData[i].app;

	if (!appused) app.use ('/'+subdomain, express.static('sites/'+subdomain));
	else {
		const subapp = path.join(publicDir, subdomain, 'server.js');
		app.use('/'+subdomain, require(subapp).app);
	}
}

var server = http.createServer(app)
server.on("error", err=>console.log(err));
server.listen(app.get('port'), function() {
    console.log('Web server listening on port ' + app.get('port'))
})
