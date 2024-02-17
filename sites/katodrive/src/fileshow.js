function nthIndex(str, pat, n) {
    var L = str.length,
        i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

const resultCardTemplate = document.querySelector("[result-card-template]");
const resultContainer = document.querySelector("[result-container]");
const searchInput = document.querySelector("[data-search]");

const pageURL = String(document.URL);
const mainURL = pageURL.substring(0, nthIndex(pageURL, '/', 3));
const storageURL = mainURL + '/katodrive/storage';
document.querySelector('[url-container]').setAttribute('pageurl', mainURL);

let files = [];

function clear_files_cards() {
    resultContainer.innerHTML = '';
}

function load_files_cards(reload) {
if (reload) clear_files_cards();
fetch(storageURL)
    .then(res => res.json())
    .then(data => {
        files = data.map(file => { 
            const card = resultCardTemplate.content.cloneNode(true).children[0];
            const fileIcon = card.querySelector("[file-icon]");
            const fileName = card.querySelector("[file-name]");

			if (file.mimetype == 'image') { fileIcon.innerHTML = 'image'; }
			else { fileIcon.innerHTML = 'draft'; }
			fileName.textContent = file.filename;

			card.setAttribute('name', file.filename);
			card.setAttribute('size', file.filesize);
			card.setAttribute('mimetype', file.mimetype);
			card.setAttribute('date', file.date);

            resultContainer.append(card);
            return { 
                filename: String(file.filename), 
                filesize: String(file.filesize),
                mimetype: String(file.mimetype),
                element: card
            };
        })
    })
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    files.forEach(file => {
        const isVisible = file.filename.includes(value);
        file.element.classList.toggle("hide", !isVisible); 
    })
})

load_files_cards(false);
export { load_files_cards }
