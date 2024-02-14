const drop_note = document.querySelector('[drop-note]');

function stopDefault(event) {
    event.preventDefault();
    event.stopPropagation();
}

function dragOver() {
    drop_note.style.display = 'flex';
}

function dragLeave() {
    drop_note.style.display = 'none';
}

