function nthIndex(str, pat, n) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    } return i;
}

const pageURL = String(document.URL);
const mainURL = pageURL.substring(0, nthIndex(pageURL, '/', 3));
const urlContainer = document.querySelector('[url-container]');
urlContainer.setAttribute('url', mainURL);
const url = mainURL;

function submit_form(form, type, g_callback, d_callback) {
    const destination = url + '/katoforum/' + type;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) g_callback(req);
            else if (req.status == 304) d_callback(req);
            else alert("Problem occured while uploading file!");
        }
    };
    
    req.open("post", destination, true);
    req.send(form);
    return false;
}

export { submit_form }
