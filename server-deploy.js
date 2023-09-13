const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const port = 3000;

const app = new express();
app.set('port', process.env.PORT || port)
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(publicDir, 'test.html'))
})

app.get('/sgkspread', function(req, res) {
    res.sendFile(path.join(publicDir, 'index.html'))
})

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})
