import { load_post_cards } from './post-show.js';
const url = document.getElementById('urlc').getAttribute('url');

function submit_post_form(title, description) {
	//const destination = url + '/katoforum/upload';
	//var req = new XMLHttpRequest();
	////var formdt = new FormData();
	////formdt.append("title", "fuckyou");
	////formdt.append("description", "fy2");
	//var form = new FormData();
    //form.append('filename', 'hi');

	//req.onreadystatechange = function () {
		//if (req.readyState == 4) {
			//if(req.status == 200) load_post_cards(true);
			//else if (req.status == 304) alert("File already exist!");
			//else alert("Problem occured while uploading file!");
		//}
	//};
	
	//req.open("post", destination, true);
	//req.send(form);
	//return false;
    const filename = "hello";
    var xhttp = new XMLHttpRequest();
    var form = new FormData();
    form.append('filename', filename);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) alert("Problem occured while deleting file");
            //load_files_cards(true);
            //reset_info();
        }
    };
    xhttp.open("post", url+"/katoforum/delete", true);
    xhttp.send(form);
    return;

}

export { submit_post_form }
