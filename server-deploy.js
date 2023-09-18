const express = require('express');
const http = require('http');
const path = require('path');

const publicDir = path.join(__dirname, 'sites');
const siteRegister = path.join(publicDir, 'site-register.json');
const siteData = require(siteRegister);
const defaultSite = "katoserver";

const app = new express();
app.set('port', process.env.PORT || 3000)
app.use(express.static('sites'))

app.get('/', function(req, res) {
    res.redirect(path.join(defaultSite));
})

app.get('/sites', function(req, res) {
    res.sendFile(siteRegister);
})

for (let i = 0; i < siteData.length; i++) {
    app.get('/' + siteData[i].subdomain, function(req, res) {
        res.redirect(path.join(String(siteData[i].name)));
    })
}

var server = http.createServer(app)
server.listen(app.get('port'), function() {
    console.log('Web server listening on port ' + app.get('port'))
})
