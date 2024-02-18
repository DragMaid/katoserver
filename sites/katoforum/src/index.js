import { submit_form } from './post-upload.js';
const post_overlay = document.querySelector('[post-creation-overlay]');
const create_button = document.querySelector('[create-button]');
const post_name_input = document.querySelector('[post-name-input]');
const post_des_input = document.querySelector('[post-des-input]');
const post_thumb_input = document.querySelector('[thumbnail-input]');
const post_button = document.querySelector('[post-button]');
var isEdit = false;
var oldEdit;

function clear_post_form() {
    post_name_input.value = '';
    post_des_input.value = '';
    post_thumb_input.value = '';
}

function open_post_form() { 
    post_overlay.style.display = 'flex'; 
    post_button.disabled=false;
}

function close_post_form() {
    isEdit=false;
    post_overlay.style.display = 'none'; 
    clear_post_form();
}

function cancel_button_func() { close_post_form() }

function create_button_func() { open_post_form() }

function form_validation(title, description) {
	let passed = 0;
	if (title.replace(/\s/g, '').length == 0) {
		post_name_input.style.border = "2px solid red";
	} else passed++;
	if (description.replace(/\s/g, '').length == 0) {
		post_name_input.style.border = "2px solid red";
	} else passed++;
	if (passed == 2) return true;
	else return false;
}

function post_button_func() {
    const title = String(post_name_input.value).replace(/[^a-zA-Z0-9]/g, '');
    const description = post_des_input.value;
    const thumbnail = post_thumb_input.value;
    const type = (isEdit) ? 'edit' : 'upload';
    const log = (isEdit) ? 'Entry point not found!' : 'Entry point already exist!';
    post_button.disabled = true;
	if (form_validation(title, description)) {
        var formdt = new FormData();
        formdt.append("title", title);
        formdt.append("description", description);
        formdt.append("thumbnail", thumbnail);
        formdt.append("oldtitle", oldEdit);
		submit_form(formdt, type, ()=>{
            cancel_button_func();
        }, () => { alert(log) });
	}
}

function edit_button_func(post) {
    const card = post.parentElement;
    const thumbnail = card.getAttribute('thumbnail');
    const title = card.getAttribute('title');
    const description = card.getAttribute('description');

    oldEdit = title;
    post_name_input.value = title;
    post_des_input.value = description;
    post_thumb_input.value = thumbnail;

    open_post_form();
    isEdit = true;
}

window.create_button_func = () => {create_button_func()};
window.post_button_func = () => {post_button_func()};
window.cancel_button_func = () => {cancel_button_func()};
window.edit_button_func = (post) => {edit_button_func(post)};
