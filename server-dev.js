const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');

const webProjects = ['sgkspread', 'envdam'];

const publicDir = path.join(__dirname, 'public');

const app = new express();
app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(publicDir, 'index.html'))
})

for (let i = 0; i < webProjects.length; i++) {
    app.get('/' + webProjects[i], function(req, res) {
        res.sendFile(path.join(publicDir, webProjects[i], 'index.html'))
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
