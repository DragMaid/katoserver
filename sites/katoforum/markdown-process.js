const fs = require('fs');
const marked = require('marked');

function convert_md_html(path, callback) {
    const stream = fs.createReadStream(path);
    let data = '';

    stream.on('data', (chunk) => { data += chunk.toString(); });
    stream.on('end', () => { 
        const html = marked.parse(data);
        callback(html);
        return html;
    })
}

module.exports = {
	convert_md_html: convert_md_html
}
