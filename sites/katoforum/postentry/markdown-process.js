const fs = require('fs');
const mdit = require('markdown-it');
const md = new mdit()

function check_availability(name) {
}

function write_md_file(filename) {
}

function convert_md_html(filename) {
	const stream = fs.createReadStream('./postmd/' + filename);
	let data = '';

	stream.on('data', (chunk) => { data += chunk.toString(); });
	stream.on('end', () => { 
		const html = md.render(data);
	})
}

function write_html_file(data) {
}
