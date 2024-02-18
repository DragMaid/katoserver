import { submit_form } from './md-post.js';
import { createCookie, eraseCookie, readCookie } from './cookie.js'; 

const page = document.querySelector('[view-page]');
const editor = document.querySelector('[editor-panel]');
const postSection = document.getElementById('post-section');
const confirmOverlay = document.querySelector('[confirm-overlay]');

const url = document.URL;
const text_input = document.querySelector('[textinput]');
const filename = decodeURIComponent(url.split('/').at(-1));
var state = false;

const mainURL = document.querySelector('[url-container]').getAttribute('url');
const mdURL = mainURL + '/katoforum/md/' + filename.split('.')[0] + '.md';

function double_mode_toggle() {
    page.classList.toggle("double-mode", !state);
    editor.classList.toggle("hide", state);
    state = !state;
}

function fetch_md() {
   fetch(mdURL)
        .then(res => res.text())
        .then(data => { text_input.value = data; })
}


function write_edit_cookie() {
    //createCookie(filename, text_input.value, 1);
    sessionStorage.setItem(filename, text_input.value);
}

function read_edit_cookie() {
    //return readCookie(filename);
    return sessionStorage.getItem(filename);
}

function delete_edit_cookie() {
    //eraseCookie(filename);
    sessionStorage.removeItem(filename);
}

var overlayhid = true;
function confirm_toggle() {
    if (overlayhid) confirmOverlay.style.display = "flex";
    else confirmOverlay.style.display = "none";
    overlayhid = !overlayhid;
}

function save_button_callback() {
    var fd = new FormData();
    fd.append('title', filename.split('.')[0]);
    fd.append('content', text_input.value);
    submit_form(fd, 'save', (req)=>{
        postSection.innerHTML = req.response;
        write_edit_cookie();
    }, ()=>{ alert('Post already exist') });
}

function close_button_callback() {
    delete_edit_cookie();
    text_input.value = "";
}

function sync_button_callback() {
    fetch_md();
}

function edit_button_callback() {
    double_mode_toggle();
    var cookie = read_edit_cookie();
    if (text_input.value == '') {
        if (cookie != null && String(cookie).trim() != '') {
            text_input.value = cookie;
        } else fetch_md();
    }
}

function remove_button_callback() {
    confirm_toggle();
}

function yes_button_callback() {
    var fd = new FormData();
    fd.append('filename', filename.split('.')[0]);
    submit_form(fd, 'delete', () => {
        window.location.replace(mainURL + '/katoforum/');
    }, () => { alert('post not found!') });
    confirm_toggle();
}

window.edit_button_callback = () => edit_button_callback();
window.write_edit_cookie = () => write_edit_cookie();
window.save_button_callback = () => save_button_callback();
window.close_button_callback = () => close_button_callback();
window.sync_button_callback = () => sync_button_callback();
window.remove_button_callback = () => remove_button_callback();
window.confirm_toggle = () => confirm_toggle();
window.yes_button_callback = () => yes_button_callback();
