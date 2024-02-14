import { load_files_cards } from './fileshow.js';

function submitFilesForm(form) {
	var label = document.getElementById("fileslbl");
	var fd = new FormData();
	for(var i = 0; i < form.filesfld.files.length; i++) {
		var field = form.filesfld;
        if (field.files[i].size > 512000000) {
            alert("WARNING: file size exceeded threshold (" + field.files[i].name  + ")");
        }
        else fd.append(field.name, field.files[i], field.files[i].name);
	}
	var progress = document.getElementById("progress");
	var x = new XMLHttpRequest();
	if (x.upload) {
		x.upload.addEventListener("progress", function(event){
			var percentage = parseInt(event.loaded / event.total * 100);
            console.log(percentage);
			progress.innerText = progress.style.width = percentage + "%";
		});
	}
	x.onreadystatechange = function () {
		if (x.readyState == 4) {
			// remove the process bar
			progress.innerText = progress.style.width = "";
			form.filesfld.value = "";

			dragLeave(); 
			if(x.status == 200) load_files_cards(true);
            else if (x.status == 304) alert("File already exist!");
			else alert("Problem occured while uploading file!");
		}
	};
	x.open("post", form.action, true);
	x.send(fd);
	return false;
}

function addFilesAndSubmit(event) {
	var files = event.target.files || event.dataTransfer.files;
	document.getElementById("filesfld").files = files;
	submitFilesForm(document.getElementById("filesfrm"));
}

window.submitFilesForm = function(form) { submitFilesForm(form); }
window.addFilesAndSubmit = function(event) { addFilesAndSubmit(event); }
