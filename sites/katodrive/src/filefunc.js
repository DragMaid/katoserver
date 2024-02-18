import { load_files_cards } from './fileshow.js';
const url = document.querySelector('[url-container]').getAttribute('pageurl');

String.prototype.format = function() {
  let formatted = this;
  for (let i = 0; i < arguments.length; i++) {
    let regexp = new RegExp('\\{'+i+'\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

async function copyToClipboard(textToCopy) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
	// Move the textarea outside the viewport to make it invisible
    textarea.style.position = 'absolute';
    textarea.style.left = '-99999999px';
	document.body.prepend(textarea);
	// highlight the content of the textarea element
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.log(err);
    } finally {
      textarea.remove();
    }
  }
}

var last_card;
function card_callback(card) {
	const filename = card.getAttribute('name');
	const filepath = url + '/katodrive/storage/' + filename;
	const filesize = card.getAttribute('size');
	const filedate = card.getAttribute('date');
    const fileurl = url + '/katodrive/storage/' + filename;
	document.querySelector('[preview-image]').src = filepath;
	document.querySelector('[size-info]').innerHTML = "Size: " + byte_convertion(filesize);
	document.querySelector('[date-info]').innerHTML = "Date: " + filedate;
	document.querySelector('[creator-info]').innerHTML = "Creator: Anoymous";
    document.querySelector('[link-info]').innerHTML = `
        <div style="white-space: nowrap;">
            Link: 
            <div class="base-button" href="{0}" onclick="copy_button_func(this)">copy</div> 
            <a href="{0}" download="">download</a>
        </div>
    `.format(fileurl);
    document.querySelector('[action-info]').innerHTML = `
        <div style="white-space: nowrap;">
            Actions: 
            <div class="delete-button base-button" href="{0}" onclick="delete_button_func(this)">delete</div> 
        </div>
    `.format(filename);
    card.style.backgroundColor = "#f2ece4";
    if (last_card != null) last_card.style.backgroundColor = "white";
    last_card = card;
}

function reset_info() {
	document.querySelector('[preview-image]').src = "assets/image.png";
	document.querySelector('[size-info]').innerHTML = "Size: ";
	document.querySelector('[date-info]').innerHTML = "Date: ";
	document.querySelector('[creator-info]').innerHTML = "Creator: Anoymous";
    document.querySelector('[link-info]').innerHTML = "Link: "
    document.querySelector('[action-info]').innerHTML = "Actions: "
}

function delete_button_func(btn) {
    const filename = btn.getAttribute('href');
    var xhttp = new XMLHttpRequest();
    var form = new FormData();
    form.append('filename', filename);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) alert("Problem occured while deleting file");
            load_files_cards(true);
            reset_info();
        }
    };
    xhttp.open("post", url+"/katodrive/delete", true);
    xhttp.send(form);
    return;
}

async function copy_button_func(btn) {
    const url = btn.getAttribute('href');
	try {
		await copyToClipboard(url);
	} catch (err) {
		console.log(err);
	}
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

window.copy_button_func = function(btn) { copy_button_func(btn); }
window.delete_button_func = function(btn) { delete_button_func(btn); }
window.card_callback = function(card) { card_callback(card); }
