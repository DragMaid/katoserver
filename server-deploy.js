const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, 'sites');
const siteRegister = path.join(publicDir, 'site-register.json');
const siteData = require(siteRegister);
const defaultSite = "katoserver";

const app = new express();
app.set('port', process.env.PORT || 3000)
app.use(express.static('sites'))

app.get('/', function(req, res) {
    res.redirect('/' + defaultSite);
})

app.get('/sites', function(req, res) {
    res.redirect('/' + 'site-register.json');
})

for (let i = 0; i < siteData.length; i++) {
    app.get('/' + siteData[i].subdomain, function(req, res) {
        res.redirect(path.join(String(siteData[i].name)));
    })
}

const server = app.listen(app.get('port'), function() {
    console.log("Server is live now.");
});
