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

function post_button_func() {
    const name = post_name_input.value;
    const des = post_des_input.value;
    console.log(name);
    console.log(des);
}
