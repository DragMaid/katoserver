function addFilesAndSubmit(event) {
	var files = event.target.files || event.dataTransfer.files;
	document.getElementById("filesfld").files = files;
	submitFilesForm(document.getElementById("filesfrm"));
}

function submitFilesForm(form) {
	var label = document.getElementById("fileslbl");
	var fd = new FormData();
	for(var i = 0; i < form.filesfld.files.length; i++) {
		var field = form.filesfld;
		fd.append(field.name, field.files[i], field.files[i].name);
	}
	var progress = document.getElementById("progress");
	var x = new XMLHttpRequest();
	if (x.upload) {
		x.upload.addEventListener("progress", function(event){
			var percentage = parseInt(event.loaded / event.total * 100);
			progress.innerText = progress.style.width = percentage + "%";
		});
	}
	x.onreadystatechange = function () {
		if (x.readyState == 4) {
			// remove the process bar
			progress.innerText = progress.style.width = "";
			form.filesfld.value = "";

			dragLeave(label); 
			if(x.status == 200) {
				//var images = JSON.parse(x.responseText);
				//for(var i = 0; i < images.length; i++) {
					//var img = document.createElement("img");
					//img.src = images[i];
					//document.body.appendChild(img);
				//}
			}
			else { // failed - TODO: Add code to handle server errors 
			}
		}
	};
	x.open("post", form.action, true);
	x.send(fd);
	return false;
}
