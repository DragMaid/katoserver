function card_callback(card) {
	const filename = card.getAttribute('name');
	const filepath = 'http://localhost:3000/storage/' + filename;
	const filesize = card.getAttribute('size');
	const filedate = card.getAttribute('date');
	//document.querySelector('[preview-image]').src = filepath;
	document.querySelector('[size-info]').innerHTML = "Size: " + byte_convertion(filesize);
	document.querySelector('[date-info]').innerHTML = "Date: " + filedate;
	document.querySelector('[creator-info]').innerHTML = "Creator: Anoymous";
} 

var units = ['B', 'KB', 'MB', 'GB', 'TB'];
function byte_convertion(size) {
	var tmp_size = size;
	var last_size = size;
	var unit_index = 0;
	while (tmp_size > 1) {
		last_size = tmp_size;
		tmp_size /= 1024;
		unit_index++; 
	}
	if (!is_interger(last_size)) last_size = last_size.toFixed(2);
	return (last_size + units[unit_index-1]);
}

function is_interger(value) {
	if (value % 1 === 0) return true;
	else return false;
}
