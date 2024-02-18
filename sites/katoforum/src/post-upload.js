import { load_post_cards } from './post-show.js';
const url = document.getElementById('urlc').getAttribute('url');

function submit_form(form, type, g_callback, d_callback) {
    const destination = url + '/katoforum/' + type;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if(req.status == 200) {
                load_post_cards();
                g_callback();
            }
            else if (req.status == 304) d_callback();
            else alert("Problem occured while uploading file!");
        }
    };
    
    req.open("post", destination, true);
    req.send(form);
    return false;
}

export { submit_form }
