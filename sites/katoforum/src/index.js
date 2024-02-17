import { submit_post_form } from './post-upload.js';
const post_overlay = document.querySelector('[post-creation-overlay]');
const create_button = document.querySelector('[create-button]');
const post_name_input = document.querySelector('[post-name-input]');
const post_des_input = document.querySelector('[post-des-input]');

function cancel_button_func() {
    post_overlay.style.display = 'none';
}

function create_button_func() {
    post_overlay.style.display = 'flex';
}

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
    const title = post_name_input.value;
    const description = post_des_input.value;
	if (form_validation(title, description)) {
		submit_post_form(title, description);
	}
}

window.create_button_func = () => {create_button_func()};
window.post_button_func = () => {post_button_func()};
window.cancel_button_func = () => {cancel_button_func()};
