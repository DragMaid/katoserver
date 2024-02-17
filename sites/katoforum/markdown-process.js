const fs = require('fs');
const mdit = require('markdown-it');
const md = new mdit()

function convert_md_html(path, callback) {
	const stream = fs.createReadStream(path);
	let data = '';

	stream.on('data', (chunk) => { data += chunk.toString(); });
	stream.on('end', () => { 
		const html = md.render(data);
		callback(html);
	})
}

module.exports = {
	convert_md_html: convert_md_html
}
