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
const storageURL = mainURL + '/storage';

let files = [];

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
			card.setAttribute('date', Date(file.date));

            resultContainer.append(card);
        })
    })

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    sites.forEach(site => {
        const isVisible = site.name.includes(value) || site.description.includes(value)
        site.element.classList.toggle("hide", !isVisible)
    })
})

